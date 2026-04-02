import { useNavigate } from "react-router-dom";
import { UserActionsProvider } from "../../contexts/UserActionsContext";
import { useState } from "react";
import { WarningIcon } from "@phosphor-icons/react";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (formData: Record<string, any>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5100/users`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError(false);
        navigate("/");
      } else {
        setError(true);
        try {
          const errorData = await response.json();
          setErrorMessage(errorData.error);
        } catch {
          setErrorMessage("Erro ao atualizar usuário");
        }
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Erro na conexão");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <UserActionsProvider
      value={{
        deleteUser: () => {},
        createOrUpdateUser: handleCreate,
        updateUserPage: () => {},
      }}
    >
      <section id="canva">
        <p id="form-title">Novo usuario</p>
        <Form isLoading={isLoading} />
        {isError && (
          <Modal
            title="Erro"
            description={errorMessage}
            icon={WarningIcon}
            onConfirm={handleCloseError}
          />
        )}
      </section>
    </UserActionsProvider>
  );
}

export default CreateUser;

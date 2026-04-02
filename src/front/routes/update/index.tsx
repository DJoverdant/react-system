import { useParams, useNavigate } from "react-router-dom";
import { UserActionsProvider } from "../../contexts/UserActionsContext";
import { useState, useEffect } from "react";
import { WarningIcon } from "@phosphor-icons/react";
import Form from "../../components/Form";
import Modal from "../../components/Modal";

function UpdateUser() {
  const { user_id } = useParams<{ user_id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isGetError, setGetError] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5100/users/${user_id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setUserData(data[0]);
          } else {
            setError(true);
            setErrorMessage("Usuário não encontrado");
            setGetError(true);
          }
        } else {
          setError(true);
          setErrorMessage("Erro ao carregar dados do usuário");
        }
      } catch (err) {
        setError(true);
        setErrorMessage("Erro na conexão");
        console.error(err);
      }
    };
    fetchUser();
  }, [user_id]);

  const handleUpdate = async (formData: Record<string, any>) => {
    if (!user_id) return;
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5100/users/${user_id}`, {
        method: "PATCH",
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
    if (isGetError) {
      navigate("/");
    }
  };

  return (
    <UserActionsProvider
      value={{
        deleteUser: () => {},
        createOrUpdateUser: handleUpdate,
        updateUserPage: () => {},
      }}
    >
      <section id="canva">
        <p id="form-title">Atualizar dados</p>
        <Form isLoading={isLoading} initialData={userData} />
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

export default UpdateUser;

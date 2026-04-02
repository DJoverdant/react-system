import { UserActionsContext } from "../../contexts/UserActionsContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type User } from "../../types/user";
import { WarningIcon } from "@phosphor-icons/react";
import Table from "../../components/Table";
import Modal from "../../components/Modal";

function Home() {
  const [user, setUserData] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/users", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const json = await response.json();
        setUserData(json);

        if (!response.ok) {
          setError(true);
          try {
            const errorData = await response.json();
            setErrorMessage(errorData.error);
          } catch {
            setErrorMessage("Erro ao tentar resgatar usuários");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = (id: string) => {
    setUserIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!userIdToDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5100/users/${userIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.ok) {
        setRefresh((prev) => prev + 1);
        setUserIdToDelete(null);
      } else {
        setError(true);
        try {
          const errorData = await response.json();
          setErrorMessage(errorData.error);
        } catch {
          setErrorMessage("Erro ao deletar usuário");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setUserIdToDelete(null);
  };

  const handleUpdatePage = (id: string) => {
    navigate(`/update/${id}`);
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <section id="canva">
      <UserActionsContext.Provider
        value={{
          deleteUser: handleDelete,
          createOrUpdateUser: async () => {},
          updateUserPage: handleUpdatePage,
        }}
      >
        <Table data={user} />
        {isError && (
          <Modal
            title="Erro"
            description={errorMessage}
            icon={WarningIcon}
            onConfirm={handleCloseError}
          />
        )}
        {userIdToDelete && (
          <Modal
            title="Tem certeza?"
            description="Caso queira desfazer a deleção, os dados podem ser recuperados no banco de dados."
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </UserActionsContext.Provider>
    </section>
  );
}

export default Home;

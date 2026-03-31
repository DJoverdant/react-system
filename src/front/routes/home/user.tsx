import { Table, type User } from "../../components/Table";
import { UserActionsContext } from "../../contexts/UserActionsContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUserData] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(0);
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
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5100/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setRefresh((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePage = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <section id="canva">
      <UserActionsContext.Provider
        value={{ deleteUser: handleDelete, updateUser: handleUpdatePage }}
      >
        <Table data={user} />
      </UserActionsContext.Provider>
    </section>
  );
}

export default Home;

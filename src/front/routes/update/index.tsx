import { useParams, useNavigate } from "react-router-dom";
import { UserActionsContext } from "../../contexts/UserActionsContext";
import { useState, useEffect } from "react";

function UpdateUser() {
  const { user_id } = useParams<{ user_id: string }>();

  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:5100/users/${user_id}`, {
          method: "PATCH",
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
    fetchUpdate();
  }, [refresh]);

  return (
    <section id="canva">
      <UserActionsContext.Provider
        value={{ updateUser: handleUpdate }}
      ></UserActionsContext.Provider>
    </section>
  );
}

export default UpdateUser;

import { Table, type User } from "../../components/Table";
import { useState, useEffect } from "react";

function Home() {
  const [user, setUserData] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(0);

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

  return (
    <section id="canva">
      <Table data={user} onDelete={handleDelete} />
    </section>
  );
}

export default Home;

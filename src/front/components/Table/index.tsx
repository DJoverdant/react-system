import { useEffect, useState } from "react";
import "./styles.css";

interface User {
  user_id: string;
  name: string;
  cpf: string;
  age: number;
  telephone?: string;
  email?: string;
  created_at: string;
}

function Table() {
  const [user, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/users", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="box">
      <div className="table">
        <div className="card header">
          <ul className="item">
            <li>ID</li>
          </ul>
          <ul className="item">
            <li>Name</li>
          </ul>
          <ul className="item">
            <li>CPF</li>
          </ul>
          <ul className="item">
            <li>Age</li>
          </ul>
          <ul className="item">
            <li>Telephone</li>
          </ul>
          <ul className="item">
            <li>Email</li>
          </ul>
          <ul className="item">
            <li>Created At</li>
          </ul>
        </div>

        {user.map((user) => (
          <div className="card">
            <ul className="item">
              <li>{user.user_id}</li>
            </ul>
            <ul className="item">
              <li>{user.name}</li>
            </ul>
            <ul className="item">
              <li>{user.cpf}</li>
            </ul>
            <ul className="item">
              <li>{user.age}</li>
            </ul>
            <ul className="item">
              <li>{user.telephone}</li>
            </ul>
            <ul className="item">
              <li>{user.email}</li>
            </ul>
            <ul className="item">
              <li>{user.created_at}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;

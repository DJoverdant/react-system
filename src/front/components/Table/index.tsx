import { useUserActions } from "../../contexts/UserActionsContext";
import Button from "../Button";
import "./styles.css";

export interface User {
  user_id: string;
  name: string;
  cpf: string;
  age: number;
  telephone?: string;
  email?: string;
  created_at: string;
}

interface TableProps {
  data: User[];
}

export function Table({ data }: TableProps) {
  const { deleteUser, updateUser } = useUserActions();

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

        {data.map((user) => (
          <div className="card" key={user.user_id}>
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

            <ul className="item">
              <li style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  text="Atualizar"
                  onClick={() => updateUser(user.user_id)}
                />
                <Button
                  text="Deletar"
                  onClick={() => deleteUser(user.user_id)}
                />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

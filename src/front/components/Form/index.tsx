import { useUserActions } from "../../contexts/UserActionsContext";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import Button from "../Button";
import "./styles.css";

interface FormProps {
  isLoading?: boolean;
}

function Form({ isLoading = false }: FormProps) {
  const { updateUser } = useUserActions();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    age: "",
    cpf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    const fieldName = placeholder.toLowerCase();
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await updateUser(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        className="input"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        placeholder="Email"
        className="input"
        type="text"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        placeholder="Telephone"
        className="input"
        type="text"
        value={formData.telephone}
        onChange={handleChange}
      />
      <input
        placeholder="Age"
        className="input"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        placeholder="CPF"
        className="input"
        type="text"
        value={formData.cpf}
        onChange={handleChange}
      />
      <br />
      <Button
        icon={PaperPlaneRightIcon}
        onClick={() =>
          handleSubmit({ preventDefault: () => {} } as React.SubmitEvent)
        }
        disabled={isLoading}
      />
    </form>
  );
}

export default Form;

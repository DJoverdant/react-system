import { type Icon } from "@phosphor-icons/react";
import "./styles.css";

interface ButtonProps {
  text?: string;
  icon?: Icon;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ text, icon: Icon, onClick, disabled }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      <span>
        {text}
        {Icon && <Icon size={20} />}
      </span>
    </button>
  );
}

export default Button;

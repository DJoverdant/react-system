import { type Icon } from "@phosphor-icons/react";
import "./styles.css";

interface ButtonProps {
  text?: string;
  icon?: Icon;
  onClick: () => void;
}

function Button({ text, icon: Icon, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      <span>
        {text}
        {Icon && <Icon size={20} />}
      </span>
    </button>
  );
}

export default Button;

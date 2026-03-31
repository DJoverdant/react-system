import "./styles.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default Button;

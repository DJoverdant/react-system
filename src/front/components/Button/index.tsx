import "./styles.css";

interface ButtonProps { text: string; };

function Button({ text }: ButtonProps) {
  return (
    <button className="button">
      <span>{text}</span>
    </button>
  );
}

export default Button;

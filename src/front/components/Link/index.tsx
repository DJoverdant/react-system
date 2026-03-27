import "./styles.css";

interface LinkProps {
  ref: string;
  icon?: string;
  text?: string;
}

function Link({ ref, icon, text }: LinkProps) {
  return (
    <a href={ref} target="_blank">
      <svg className="link" role="presentation" aria-hidden="true">
        <use href={icon}></use>
      </svg>
      {text}
    </a>
  );
}

export default Link;

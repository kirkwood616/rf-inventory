import "./Button.css";

interface Props {
  text: string;
  backgroundColor: string;
  onClick?: () => void;
}

function Button({ text, backgroundColor, onClick }: Props) {
  return (
    <button className="Button" style={{ backgroundColor: backgroundColor }} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

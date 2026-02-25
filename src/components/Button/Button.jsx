import styles from "./Button.module.css";

function Button({ text, onClick, type = "button" }) {
  return (
    <button className={styles.btn} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;

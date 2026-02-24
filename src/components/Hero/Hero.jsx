import styles from "./Hero.module.css";
import headphones from "../../assets/headphones.svg";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>

      <img src={headphones} alt="Headphones" />
    </div>
  );
}

export default Hero;

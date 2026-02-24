import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.search}
        placeholder="Search a album of your choice"
      />
      <button className={styles.icon}>🔍</button>
    </div>
  );
}

export default Search;

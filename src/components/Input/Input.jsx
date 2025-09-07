import styles from "./Input.module.css";

export function Input({ value, setValue, placeholder }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        autoComplete="off"
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
}

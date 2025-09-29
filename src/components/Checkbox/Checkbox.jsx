import styles from "./Checkbox.module.css";
import { useState, useEffect } from "react";

export default function Checkbox({
  onCheck = () => {},
  onUncheck = () => {},
  label = null,
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      onCheck();
    } else {
      onUncheck();
    }
  }, [checked]);

  return (
    <div className={styles.checkboxContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
        onClick={() => {
          setChecked(!checked);
        }}
      ></div>
    </div>
  );
}

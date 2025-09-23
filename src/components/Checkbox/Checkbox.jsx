import styles from "./Checkbox.module.css"
import { useState } from "react";

export default function Checkbox({onCheck = () => {}, onUncheck = () => {}, label = null}){

    const [checked, setChecked] = useState(false);

    return (

        <div className={styles.checkboxContainer}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={`${styles.checkbox} ${checked ? styles.checked : ""}`} onClick={() => {
                setChecked(!checked);

                if(checked){
                    onCheck();
                } else {
                    onUncheck();
                }
            }}>

            </div>
        </div>

    )

}
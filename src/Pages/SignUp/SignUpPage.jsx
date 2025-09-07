import { useNavigate } from "react-router-dom";
import SignUpContainer from "../../components/SignUpContainer/SignUpContainer";
import styles from "./SignUpPage.module.css"
export default function SignUpPage(){

    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.signUpContainerWrapper}>
                <div className={styles.loginContainer}>
                    <h2 className={styles.loginTitle}>Already have an account?</h2>
                    <button className={styles.loginRedirect} onClick={() => {navigate("/login")}}>Login!</button>
                </div>
                <SignUpContainer></SignUpContainer>
            </div>
        </div>
    )

}
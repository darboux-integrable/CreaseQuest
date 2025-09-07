import styles from "./LoginPage.module.css";
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContainerWrapper}>
        <div className={styles.signupContainer}>
          <h2 className={styles.signupTitle}>Don't have an Account?</h2>
          <button
            className={styles.signupRedirect}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up!
          </button>
        </div>
        <LoginContainer></LoginContainer>
      </div>
    </div>
  );
}

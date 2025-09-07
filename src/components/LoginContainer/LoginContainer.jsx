import styles from "./LoginContainer.module.css";
import GoogleIcon from "../../assets/images/Google.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../Input/Input";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../config/firebaseConfig";

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  const loginUser = async () => {
    let toastId;

    toastId = toast.loading("Loggin in User...", {
      closeButton: false,
      autoClose: false,
      hideProgressBar: true,
    });

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      console.log(user);
      toast.update(toastId, {
        type: "success",
        render: "User Successfully Logged in. Redirecting...",
        autoClose: 1000,
        hideProgressBar: false,
        isLoading: false,
        onClose: () => {
          naviagte("/home");
        },
      });
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        type: "error",
        render: "Couldn't Login User. Enter Correct Details",
        isLoading: false,
        closeButton: true,
        onOpen: () => {
          console.log(err);
        },
      });
    }
  };

  const loginUserWithGoogle = async () => {
    let toastId;
    toastId = toast.loading("Logging in User...", {
      closeButton: false,
      autoClose: false,
      hideProgressBar: true,
    });

    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const user = userCred.user;
      toast.update(toastId, {
        type: "success",
        render: "User Successfully Logged in. Redirecting...",
        autoClose: 1000,
        hideProgressBar: false,
        isLoading: false,
        onClose: () => {
          naviagte("/home");
        }
      });

      console.log(user);
    } catch (err) {
      toast.update(toastId, {
        type: "error",
        render: "Couldn't Login User. Enter Correct Details",
        isLoading: false,
        closeButton: true,
        onOpen: () => {
          console.log(err);
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.loginContent}>
        <div className={styles.inputs}>
          <Input value={email} setValue={setEmail} placeholder="Email"></Input>
          <Input
            value={password}
            setValue={setPassword}
            placeholder="Password"
          ></Input>
          <button className={styles.loginButton} onClick={loginUser}>
            Login
          </button>
        </div>
        <button className={styles.googleButton} onClick={loginUserWithGoogle}>
          <div className={styles.buttonIcon}>
            <img src={GoogleIcon} alt="" />
          </div>
          Login with google
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  auth,
  googleProvider,
  updateUserActivitySession,
} from "../../config/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Input } from "../Input/Input.jsx";
import styles from "./SignUpContainer.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/images/Google.svg";
export default function SignUpContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const naviagte = useNavigate();

  const createUser = async () => {
    let toastId;

    toastId = toast.loading("Creating User...", {
      closeButton: false,
      autoClose: false,
      hideProgressBar: true,
    });

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.update(toastId, {
        type: "success",
        render: "User Created! Redirecting...",
        autoClose: 1000,
        hideProgressBar: false,
        isLoading: false,
        onClose: () => {
          updateUserActivitySession();
          naviagte("/home");
        },
      });
    } catch (err) {
      toast.update(toastId, {
        type: "error",
        render: "400 Something Went Wrong!",
        isLoading: false,
        closeButton: true,
        onOpen: () => {
          console.log(err);
        },
      });
    }
  };

  const createGoogleUser = async () => {
    let toastId;

    toastId = toast.loading("Creating User...", {
      closeButton: false,
      autoClose: false,
      hideProgressBar: true,
    });

    try {
      await signInWithPopup(auth, googleProvider);

      toast.update(toastId, {
        type: "success",
        hideProgressBar: false,
        render: "User Created! Redirecting",
        autoClose: 1000,
        isLoading: false,
        onClose: () => {
          updateUserActivitySession();
          naviagte("/home");
        },
      });
    } catch (err) {
      toast.update(toastId, {
        type: "error",
        render: "400 Something Went Wrong!",
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
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.signInContent}>
        <div className={styles.inputs}>
          <div className={styles.names}>
            <Input
              value={firstName}
              setValue={setFirstName}
              placeholder="First Name"
            ></Input>
            <Input
              value={lastName}
              setValue={setLastName}
              placeholder="Last Name"
            ></Input>
          </div>
          <Input value={email} setValue={setEmail} placeholder="Email"></Input>
          <Input
            value={password}
            setValue={setPassword}
            placeholder="Password"
          ></Input>
          <button className={styles.signupButton} onClick={createUser}>
            Sign up
          </button>
        </div>
        <button className={styles.googleButton} onClick={createGoogleUser}>
          <div className={styles.buttonIcon}>
            <img src={GoogleIcon} alt="" />
          </div>
          Sign Up with google
        </button>
      </div>
    </div>
  );
}

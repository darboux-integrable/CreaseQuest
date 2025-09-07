// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGY04Pu_p9payfvgaJSXiPDsoR6ZNnF6k",
  authDomain: "origami-project-415f2.firebaseapp.com",
  projectId: "origami-project-415f2",
  storageBucket: "origami-project-415f2.firebasestorage.app",
  messagingSenderId: "686423573424",
  appId: "1:686423573424:web:3119cb65ced1e881b10c75",
  measurementId: "G-H0RQJJP969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence)
.then(() => {
  console.log("session set");

});

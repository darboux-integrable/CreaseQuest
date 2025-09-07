// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

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

// Session Expiration
const TIMEOUT_LIMIT = 60 * 1000;

const LOCAL_TIME_KEY = "creasequest.last.active";
const LOCAL_ACTIVE_KEY = "creasequest.is.active";

["click", "mousedown", "keypress", "scroll"].forEach(event => {
  window.addEventListener(event, () => {
    updateActivity();
  })
})

export function updateUserActivitySession() {
  localStorage.setItem(LOCAL_ACTIVE_KEY, JSON.stringify(true));
  localStorage.setItem(LOCAL_TIME_KEY, JSON.stringify(Date.now()));
}

function updateActivity(){
  let wasActive = JSON.parse(localStorage.getItem(LOCAL_ACTIVE_KEY));

  if(!wasActive){
    return;
  }

  const lastTime = JSON.parse(localStorage.getItem(LOCAL_TIME_KEY));
  const currentTime = Date.now();
  const delta = currentTime - lastTime;

  if(delta >= TIMEOUT_LIMIT){
    localStorage.setItem(LOCAL_ACTIVE_KEY, JSON.stringify(false));
  } else {
    localStorage.setItem(LOCAL_ACTIVE_KEY, JSON.stringify(true));
    localStorage.setItem(LOCAL_TIME_KEY, JSON.stringify(currentTime));
  }

}
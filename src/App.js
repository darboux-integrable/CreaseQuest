import SignUpPage from "./Pages/SignUp/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import LoginPage from "./Pages/Login/LoginPage";
import CreateCoursePage from "./Pages/CreateCourse/CreateCoursePage";

function App() {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      setTheme(e.matches ? "dark" : "light");
    });

  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === "dark") {
      rootElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      rootElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/CreateCourse" element={<CreateCoursePage />} />
        </Routes>
      </Router>
      <ToastContainer theme={theme}></ToastContainer>
    </>
  );
}

export default App;

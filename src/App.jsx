import { useState } from "react";
import { Home } from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { HealthCare } from "./components/HealthCare";
import { Automobiles } from "./components/Automobiles";
import { StudentDetails } from "./components/StudentDetails";
import { LoginPage } from "./components/LoginPage";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/FirebaseInit";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/signin";
    });
  };

  return (
    <>
      <Router>
        <NavBar isAuth={isAuth} signUserOut={signUserOut} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/healthcare" Component={HealthCare} />
          <Route path="/automobiles" Component={Automobiles} />
          <Route path="/studentdetails" element={<StudentDetails />} />
          <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

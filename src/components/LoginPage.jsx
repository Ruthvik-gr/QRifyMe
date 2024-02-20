import React, { useEffect } from "react";
import { auth, provider } from "../firebase/FirebaseInit";
import { signInWithPopup, onAuthStateChanged,GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ setIsAuth }) => {
  const navigate = useNavigate();

  // Check if the user is already authenticated when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          // User is signed in
          setIsAuth(true);
          navigate("/");
        } else {
          // No user is signed in
          setIsAuth(false);
        }
      } catch {
        console.log(error.message);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [setIsAuth, navigate]);

  const signInWithGoogle = async () => {
    // const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider); // Use 'provider' directly here
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signin-page">
      <h1 className="heading">Sign in with Google</h1>
      <button className="btn btn-primary" id="btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

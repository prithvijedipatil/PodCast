import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./loader/Loader";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log("chekcing state of authentication");
  console.log("private routs");

  if (loading) {
    
    return (
      <>
        <Loader/>
       </>
     
    );
  } else if (!user || error) {
    return (
      <>
        {console.log("navigate to home")}
        <Navigate to="/" replace />
      </>
    );
  }
  {
    console.log("outlet");
  }
  return <Outlet />;
};

export default PrivateRoutes;

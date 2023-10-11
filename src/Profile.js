import React, { useEffect } from "react";
import Header from "./components/common/header/Header";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "./components/common/Button";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "./components/loader/Loader";

const Profile = () => {

    const user = useSelector((state)=> state.user.user)
  console.log("user in profile",user)

    // if(!user){
    //     return (
    //         <>
    //         <p>Loading....</p>
    //         </>
    //     )
    // }
  function handleLogout(){

    signOut(auth)
    .then(() => {
      toast.success("User Logged Out!");
    })
    .catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
  }

  if(!user){

    return(
        <>
        <Loader/>
        </>
    )
  }

  return (
    <>
      <Header />

      <h1>
        {user?.name} and {user?.email}

      </h1>

      <Button text={"Logout"} onClick={handleLogout} />
    </>
  );
};

export default Profile;

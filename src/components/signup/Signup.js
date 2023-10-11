import React from 'react'
import InputComponent from '../common/Input';
import { useState } from 'react';
import Button from '../common/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../../slices/userSlice';
import { db, auth } from '../../firebase'
import { toast } from "react-toastify";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async ()=>{

      setLoading(true);
        console.log("handling singup");

        if (
          password === confirmPassword &&
          password.length >= 6 &&
          fullName &&
          email
        ) {
 try{

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db,"users",user.uid),{
    name: fullName,
    email: user.email,
    uid : user.uid

  });

  dispatch(setUser({


    name: fullName,
    email: user.email,
    uid : user.uid

  }

  ));
  toast.success("User has been created!");
  setLoading(false);
  navigate("/profile");

 }
 catch(e){
  alert("error",e);
  toast.error(e.message);
        setLoading(false);
 }
}
 else {
  if(!email){
    toast.error(
      "Please Enter Your Email Id"
    );
  }
  if(!fullName){
    toast.error(
      "Please Enter Your Full Name"
    );
  }
  if (password !== confirmPassword) {
    toast.error(
      "Please Make Sure your password and Confirm Password matches!"
    );
  } else if (password.length < 6) {
    toast.error(
      "Please Make Sure your password is more than 6 digits long!"
    );
  }
  setLoading(false);
}
        

        

         

        
    }

  return (
   <>
   <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />

<Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
   
   
   </>
  )
}

export default Signup
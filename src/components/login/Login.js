import React from 'react'
import { useState } from 'react';
import InputComponent from '../common/Input';
import Button from '../common/Button';
import { signInWithEmailAndPassword } from "firebase/auth";
import {db, auth} from '../../firebase'
import { getDoc , doc } from 'firebase/firestore';
import { setUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const Login = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const handleLogin =  async()=>{
    setLoading(true);
    if(email && password){
      try{

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user  = userCredential.user;

        const userDoc = await getDoc(doc(db,"users",user.uid));
        const userData = userDoc.data();

        dispatch(setUser({
          name : userData.name,
          email : user.email,
          uid : user.uid,
        }));
        toast.success("Login Successful!");
        setLoading(false);
        navigate("/profile");


      }
      catch(e){
        alert("error",e);
        setLoading(false);
        toast.error(e.message);
      }
    }
    else {
      toast.error("Make sure email and password are not empty");
      setLoading(false);
    }

  }
  return (
 <>
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
 
 <Button
        text={"Login"}
        onClick={handleLogin}
        disabled={loading}
       
      />
       
 </>
  )
}

export default Login
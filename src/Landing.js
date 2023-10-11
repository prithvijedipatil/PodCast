import React from 'react'
import { useState } from 'react';
import Header from './components/common/header/Header';
import Signupform from './components/signup/Signup';
import Login from './components/login/Login';

const Landing = () => {

    const [flag, setFlag] = useState(false);
    
  return (
    <>
 <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <Signupform/>: <Login />}
        {!flag ? (
          <p    style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to  <span className='underline'>Login</span> 
          </p>
        ) : (
          <p   style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Don't have an account? Click here to <span className='underline'>signup.</span> 
          </p>
        )}
      </div>
    
    </>
  )
}

export default Landing
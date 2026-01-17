import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./ToAccount/Css.css";
import "./App.css";
import SignIn from './ToAccount/signin';
import Login from './ToAccount/login';
import AApp from './ToAccount/mainFile';

export default function App(){
const [curUU,setCurUU] = useState(null)
const [haveAccount,setHaveaccount] =useState(false)
localStorage.setItem('uu',curUU)
    const loginClicked =()=>{
        
        
    }
    const signinClicked =()=>{
       
    }

    return(
        <Routes>
            <Route path='/' element={
                <>
                    <div id='home'>
                        <h1>ChAt ApP</h1>
                        <h4 id='wel'>Welcome to ChAt ApP</h4>

                        <h6 id='cAcc'>Click 
                            <span
                            onClick={loginClicked}>
                            <Link to="/signin">Here</Link>
                            </span> to Create Account
                        </h6>

                        <h6 id='cloG'>If You Have Account, 
                            Click <span onClick={signinClicked}>
                            <Link to="/login">Here</Link>
                            </span> to Login To Account
                        </h6></div></>}/>
            <Route path='/login' element={<Login onlogin={setCurUU}/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/main' element={<AApp user={curUU}/>}/>
        </Routes>
    )
}



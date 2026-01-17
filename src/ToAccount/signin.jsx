import React, { useEffect, useState } from 'react'
import "./Css.css"
import ws from './socket'
import { BrowserRouter, Routes, Link, Route, useNavigate} from 'react-router-dom'
//import { error } from 'three'

export default function SignIn(){
let [uName,setuName] =useState('')
let [pass,setPass] =useState('')
let navigate = useNavigate()


useEffect(()=>{
    ws.on('signedIn',(data)=>{
        alert("Success : You have Created an Account!")
       navigate("/login")

    })

    return()=>{
        ws.off('signedIn')
    }
},[navigate])

let submitData = (e)=>{
    e.preventDefault()
   // console.log("signin")
      

ws.emit('signin',{uName,pass},(error)=>{
    
})

}

    return(
                <>
                    <div className='bodyy'>
        <h1>ChAt ApP</h1>
        <h4>Create Account</h4>
        <form>
            <label htmlFor="username">
                User Name :</label>
                <input type="text" id='username'
                onChange={(e)=>{
                    setuName(e.target.value)
                }}
                 placeholder="Enter Username"/>
            <label htmlFor="pass">Password :</label>
               
            <input type="password"  onChange={(e)=>{
                    setPass(e.target.value)
                }}
            id='password'placeholder='Enter Password'/>
            <label htmlFor="pass">
                Password Confirmation:</label><input 
                type="password" id='passwordConf'placeholder='Confirm Password'/>
            <button onClick={submitData}>Create Account</button>
        </form>
        <p>Have Account?? <span>
            <Link to="/login">Login</Link>
            </span></p>
        </div>
                    </>
                
    
    )
}



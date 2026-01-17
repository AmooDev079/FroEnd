import React, { useEffect, useState } from 'react'
import "./Css.css"
import { Link,useNavigate } from 'react-router-dom'
import ws from './socket'

export default function Login({onlogin}){
let [userN,setuserN] = useState('')
let [pass,setPass] = useState('')
let navi = useNavigate()

useEffect(()=>{
ws.on('loginSuccess',(data,error)=>{
  if(error){
    console.log('errrrrrr')
  }else{
    console.log(data)
  }

})

    return ()=>{
        ws.off('loginSuccess')
    }
},[navi])

const logInNow =async(e)=>{

    e.preventDefault();
    if(userN !==''||pass !==''){
                    
         console.log('Seeeend')
   
    const res = await fetch(
        "https://bacend-haua.onrender.com/loginin",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                u:userN,
                p:pass
            })
        })
      const dt = await res.json();
      if(res.status==200){
    console.log(res)
  localStorage.setItem('username',JSON.stringify(dt.name))
    navi('/main')
    console.log(res.status)
    console.log(JSON.stringify(dt.name))

}else{
    alert('Check Your Credentials!!!!')
}
                }
   
}

    return(
        <div className='bodyy'>
        <h1>ChAt ApP</h1>
        <h4>Login To Account</h4>
        <form>
            <label htmlFor="username">User Name :</label>
            <input type="text" id='username' onChange={(e)=>{
                    setuserN(e.target.value)
                }}
                value={userN}
            placeholder="Enter Username"/>
            <label htmlFor="pass">Password :
                </label><input type="password" onChange={(e)=>{
                    setPass(e.target.value)
                }}
                value={pass}
                 placeholder="Enter Password"
                id='password'/>
            <button type='submit' onClick={logInNow}>Login</button>
        </form>
        <p>Have No Account?? <span><Link to="/signin">Create Account</Link></span></p>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import '../App.css'
import ws from './socket';

//scr0ll to bottom
function scrollBottom(){
  let ddw = document.getElementById('cont')
  ddw.scrollTo(0,-100);
  console.log("sss",ddw.style.height)
}

//time function
function tttM(){
 let time = new Date();
  let day = time.toDateString().slice(0,4)
  let timeH = time.getHours()
  timeH = timeH<10?"0"+timeH:timeH
  let timeM = time.getMinutes()
  timeM = timeM<10?"0"+timeM:timeM
let dt = day+timeH+":"+timeM+(timeH<12?"am":'pm')
return dt;
}
//main ap
function AApp({user}){
let [currMsg,setcurrMsg]=useState('')
let [sentMsgs,setSentMsgs]=useState([])
let [chatters,setChatters]=useState([]);
let [imgs,setImgs]=useState([]);

let [chatWho,setchatWho] =useState('');
let [currUser,setCurrUser]= useState(null);
let storedUser;

//useeffect runs every render
useEffect(()=>{
  scrollBottom()
  //store user
 storedUser =  localStorage.getItem('username')
  if(storedUser){
   // console.log(storedUser)
    setCurrUser(JSON.parse(storedUser))
  }
  //greeetings
  ws.emit("hello","User "+JSON.parse(storedUser))
//msg from backend
  ws.on("msgReceived",(mssg)=>{
    
    setSentMsgs((prev)=>[...prev,mssg])
   // console.log("Received ::",mssg+storedUser)
  })

  //img from backend
  ws.on('imgHere',(data)=>{
    setImgs((prev)=>[...prev,data])
    //console.log('dddd',data)
   
  })


   ws.on('chhaters',(data)=>{
    for (let i = 0; i < data.length; i++) {
     setChatters((prev)=>[...prev, data[i]])
      
    }
  })

 // console.log("ddddd",chatters)
  return ()=>{
    ws.off("hello")
    ws.off("chhaters")
    ws.off("currUser")
    ws.off("msgReceived")
    ws.off('imgHere')

  }},[])

//sendMsg
let senMSSG = (e)=>{
  
  if(!currMsg){return} 
  //setcurrMsg(e.target.value)
  const messageObj = {
    id:Date.now(),
    text:currMsg,
    to:chatWho,
    from:currUser,
    time:tttM(),st:false
  };
      setSentMsgs((prev)=>[...prev,messageObj]);
      setcurrMsg('')
      ws.emit("msgSent",messageObj)

}
//handle sending img
let handleFileChange =(e)=>{
  let fl = e.target.files[0];
  if(!fl) return;
  
  let reader = new FileReader();
  reader.onload = ()=>{
//console.log(reader.result)
    const fileData = {
      name:fl.name,
      type:fl.type,
      data:reader.result,
      tr:true
    }

    setImgs((prev)=>[...prev,fileData])
   // console.log(fileData)
      ws.emit('sendingImg',fileData)
  }

  reader.readAsDataURL(fl)
}

//fetch chatters and their messages
let fetchChatter =(e)=>{
  setchatWho(e.target.value)
  //console.log('changed')

}

//display msg
for (let i = 0; i < sentMsgs.length; i++) {
  const element = sentMsgs[i];
  const element2 = sentMsgs[i+1];

  if(element==element2){
   // console.log(element,"Alike")
    sentMsgs.pop()
  }
}

//msgArr
let msgsSent = sentMsgs.map((msg,index)=>
 
        <div key={index}
            className= {msg.st?"left":"right"}
          >
           <p className="msg">{msg.text}</p>
          <span className="time">{msg.time}</span> 
          
      </div>
      

)
//chatters Arr
let toDel = [];
//console.log("Before",chatters.length)
//deleting extra chatters
for (let i = 0; i < chatters.length/2; i++) {
  if(chatters[i]==chatters[i+chatters.length/2]){
    //console.log('Alike');
    toDel.push(chatters[i])
       //chatters.pop();
  }else{
    //console.log("Not alike")
  }
  //console.log('toDel ',toDel)
  
  
}
for (let j = 0; j < toDel.length; j++) {
    if(toDel[j]==chatters[j]){
      chatters.pop()
    }
    
  }
//console.log("After",chatters.length)


//mapping chatters to the select container
let chatUsers = chatters.map((user,index)=>(
  <option key={index}
  
  >{user}</option>
  
))

    return(
      <>
        <div className="body">
        <h1 className="title">ChAt ApP <span>{currUser}</span></h1>
        <h4 className="chatwith">Chating With  :
            <select id='sel' onChange={fetchChatter}>
              {chatUsers}
            </select>
        </h4>
        <div className="msgArea" id='cont'>
          {msgsSent}
         {imgs.map((file, index)=>(
          
            <img key={index} src={file.data} id={file.tr?"sen":"rec"}/>
         
         )
         )}

          </div>
        <div className="send">
            <textarea className="typedMsg" id='txt' placeholder='Write your Message'
            type="text"
            value={currMsg}
            onChange={(e)=>{
              setcurrMsg(e.target.value)
            }}
          >
            </textarea>
        <div className='rgf'>
            <input type="file" className="picToSend" onChange={handleFileChange}/>
            <button className="sendBtn"
            onClick={senMSSG}
            >Send</button>
        </div>
      </div>
    </div>
      </>
    )
  
  
}
export default AApp

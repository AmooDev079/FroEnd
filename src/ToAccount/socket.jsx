import { io } from "socket.io-client";
let ws = io("http://192.168.230.173:3002")
export default ws
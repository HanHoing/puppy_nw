import TextField from "@material-ui/core/TextField"
import io from "socket.io-client"
import { useEffect, useRef, useState } from "react"
import Content from "./content"

//map 화면 구성 메시지 받고, socket연결
function Map() {
  const [state, setState] = useState({ message: "", message2: "", name: "" })
  const [chat, setChat] = useState([{}])

  const socketRef = useRef()

  //소켓연결, 메시지 전송
  useEffect(() => {
    //socketRef.current = io.connect("http://localhost:4000") //소켓 연결 시도
    socketRef.current = io.connect("http://192.168.200.199:4000") //소켓 연결 시도
    socketRef.current.on("message", ({ name, message, message2 }) => {
      setChat([...chat, { name, message, message2 }])
    })
    return () => socketRef.current.disconnect()
  },
    [chat]
  )

  //text변경
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  //message submit   / current.emit
  const onMessageSubmit = (e) => {
    const { name, message, message2 } = state
    socketRef.current.emit("message", { name, message, message2 })
    e.preventDefault()
  }

  //message render html
  const renderChat = () => {
    return (chat.map(({ name, message, message2 }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message},{message2}</span>
        </h3>
      </div>
    )
    ))
  }


  //App function return 
  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <div>
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="latitude"
          />
        </div>
        <div>
          <TextField
            name="message2"
            onChange={(e) => onTextChange(e)}
            value={state.message2}
            id="outlined-multiline-static"
            variant="outlined"
            label="longitude"
          />
        </div>
        <button>Send Location</button>
      </form>
      <div>
        {/* <h1>Chat Log</h1>
        {renderChat()} */}
      </div>
      <div>
        <Content chat={chat[chat.length - 1]} />
      </div>
    </div>

  )
}

export default Map
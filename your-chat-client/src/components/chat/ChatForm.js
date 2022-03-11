import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from "../../features/messages/messageSlice"
import { socket } from "../../App"

const ChatForm = () => {

  const [message, setMessage] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {

      socket.on('receive', (payload) => {
        console.log(payload)
        dispatch(setMessages({...payload}))
      })
  
  },[socket])


  const updateOwnMessage = (_id) => {
    const ownMessage = {
      _id,
      message,
      user: {
        username: user.username
      }
    }

    setMessage('')

    dispatch(setMessages({...ownMessage}))
  }

  
  const sendMesssage = (e) => {
    e.preventDefault()

    const payload = {
      message,
      token: user.token,
    }

    socket.emit('sendMessage', payload, id, updateOwnMessage)

    //problem is here

  }


 

  return (
    <div className="col-8 mx-auto">
    {/* message form */}
    <form>
        <div className="mb-3 d-flex">
        <input  type="text" className="form-control border-secondary" 
        onChange={e => setMessage(e.target.value)} value={message}
        placeholder="Write your message" id="message" name="message"/>
        <button className="btn btn-secondary" onClick={sendMesssage}>Send</button>
      </div>
    
    </form>
    </div>
  )
}

export default ChatForm
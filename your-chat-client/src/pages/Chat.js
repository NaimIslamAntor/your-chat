import MessageBox from "../components/chat/MessageBox"
import ChatForm from "../components/chat/ChatForm"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTheCurrentRoom, getTheCurrentRoomMessages, reset } from "../features/messages/messageSlice"
import { socket } from "../App"

const Chat = () => {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()


    useEffect(() => {

        if (!user) {
            navigate('/login')
        }

        dispatch(getTheCurrentRoom(id))
        dispatch(getTheCurrentRoomMessages(id))


        return () => {
            dispatch(reset())
        }

    },[user, navigate, id, getTheCurrentRoom, dispatch, getTheCurrentRoomMessages])

    
    useEffect(() => {
        socket.emit('join-room', id)

        return () => {
            socket.emit('leave-room', id)
        }
    },[id])


    return(
       <div className="container">
           <div className="row">
           {/* message box */}
                <MessageBox/>
              
                {/* chat form */}
                <ChatForm/>
           </div>
       </div>
    )
}

export default Chat
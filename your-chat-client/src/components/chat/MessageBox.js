import { useEffect } from "react"
import { useSelector } from "react-redux"
import Message from "./Message"

const MessageBox = () => {

  const { auth, messages } = useSelector(state => state)


  useEffect(() => {
    updateScroll()
  }, [updateScroll])

  function updateScroll(){
    const element = document.getElementById("messageBox")
    element.scrollTop = element.scrollHeight
}

  
  return (
<div id="messageBox" className="col-8 my-4 mx-auto border d-flex flex-column overflow-auto
    border-secondary" style={{height:'400px'}}>

<div className="d-flex flex-column justify-content-end flex-grow-1">
   {/* messages */}
  


   {
     messages.messages.map(message =>  (<Message
      key={message._id}
      name={message.user.username}
      message={message.message}
      me={message.user.username === auth.user.username}/>))
   }


   {/* <Message name="Antor" message="fine and you?"/>
   <Message name="Naim" message="fine too whats going on" me={true}/>
   <Message name="Antor" message="coding"/>

   <Message name="Naim" message="How are you?" me={true}/>
   <Message name="Antor" message="fine and you?"/>
   <Message name="Naim" message="fine too whats going on" me={true}/>
   <Message name="Antor" message="coding"/>
   <Message name="Naim"
    message="fine too whats going on fine too whats going on fine too whats going on fine too whats going on" 
    me={true}/> */}

</div>

    </div>
  )
}

export default MessageBox
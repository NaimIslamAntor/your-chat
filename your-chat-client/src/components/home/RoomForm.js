import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom } from '../../features/room/roomSlice'
import ErrorAlert from '../register/ErrorAlert'

const RoomForm = () => {

  const [creds, setCreds] = useState({
    room: '',
    about: '',
  })

  const dispatch = useDispatch()

  const {message, isError} = useSelector(state => state.room)


  const setCredsOnchange = e => {
   
    const { name, value } = e.target

    setCreds((credinfo) => (
      {
        ...credinfo,
        [name]: value,
      }
    ))

  }


  const submitRoom = e => {
    e.preventDefault()

    dispatch(createRoom(creds))
  }

  return (
    <>
    <div className="container my-3">
        <div className="row">
            <div className="col-8 mx-auto">
                {
                  isError ? <ErrorAlert message={message}/> : ''
                }
<form className="my-3">
  <div className="mb-3">
    <label htmlFor="room" className="form-label">Room name (must be unique)</label>
    <input type="text" className="form-control" id="room" name="room" onChange={setCredsOnchange}/>
  </div>


  <div className="mb-3">
  <label htmlFor="shortDescription" className="form-label">About this room (optional)</label>
  <textarea className="form-control" id="shortDescription" name="about" rows="3" 
  style={{resize: 'none'}} onChange={setCredsOnchange}></textarea>
</div>


  <button type="submit" className="btn btn-primary" onClick={submitRoom}>Create</button>
</form>
            </div>
        </div>
    </div>
    </>
  )
}

export default RoomForm
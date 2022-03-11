import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllRooms, reset } from '../features/room/roomSlice'

import RoomForm from '../components/home/RoomForm'
import RoomCard from '../components/home/RoomCard'


const Home = () => {

  const user = useSelector(state => state.auth.user)

  const {rooms} = useSelector(state => state.room)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getAllRooms())


    return () => {
      dispatch(reset())
    }

  },[user, navigate, dispatch, getAllRooms])

  return (
    <>
      <RoomForm/>
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto">
          {
        rooms.length > 0 ?
        rooms.map(room =>  <RoomCard key={room._id} name={room.name} id={room._id}/>)    : ''
      }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
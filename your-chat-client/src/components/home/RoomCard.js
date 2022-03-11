import { Link } from "react-router-dom"

const RoomCard = ({ name, id }) => {
  return (
    <div className="card w-75">
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      <Link to={`/room/${id}`} className="btn btn-secondary">Chat</Link>
    </div>
  </div>
  
  )
}

export default RoomCard
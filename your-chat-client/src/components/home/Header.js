import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/auth/authSlice"
const Header = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)


  const userLogout = () => {
    dispatch(logout())
  }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Your Chat</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {
              user ?  <li className="nav-item">
                <a className="nav-link" role="button" onClick={userLogout}>Logout</a>
              </li> :
              <>
              <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              </>
            }
              

             
             
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Header
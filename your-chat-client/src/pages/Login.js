import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import ErrorAlert from '../components/register/ErrorAlert'
import { reset } from '../features/auth/authSlice'

const Login = () => {

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const auth = useSelector(state => state.auth)
  const { user, errors } = auth

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      navigate('/')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate])





  //set creds
  const setCreds = e => {
    const {name, value} = e.target

    setUserData((userStateData) => (
      {
        ...userStateData,
        [name]: value
      }
    ))
  }

  //submit login
  const submitLogin = () => {
    dispatch(login(userData))
  }
    return(
        <div className="container my-3">
           <div className="row my-4">
               <div className="col-8 mx-auto">

               {
                 //show errors
                errors.length > 0 ? 
                errors.map(error => <ErrorAlert key={error}  message={error} />)
                 : ''
               }
          
  <div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input onChange={e => setCreds(e)} type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input onChange={e => setCreds(e)} type="password" className="form-control" id="password" name="password"/>
  </div>


  <button type="button" className="btn btn-primary" onClick={submitLogin}>Login</button>

               </div>
           </div>
       </div>
    )
}

export default Login
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import ErrorAlert from '../components/register/ErrorAlert'
import { reset } from '../features/auth/authSlice'

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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




  const setUserDataOnChnage = (e) => {
    const {name, value} = e.target

    setUserData((user) => ({
      ...user,
      [name]: value
    }))
  }


  const submitCreds = () => {
    dispatch(register(userData))
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
    <input onChange={e => setUserDataOnChnage(e)} type="text" className="form-control"
     name="username" id="username" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input onChange={e => setUserDataOnChnage(e)} type="password" className="form-control"
     name="password" id="password"/>
  </div>

  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input onChange={e => setUserDataOnChnage(e)} type="password" className="form-control" name="confirmPassword"
     id="confirmPassword"/>
  </div>


  <button type="button" className="btn btn-primary" onClick={submitCreds}>Register</button>

               </div>
           </div>
       </div>
    )
}

export default Register
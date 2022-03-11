import axios from 'axios'
const API_URL = '/api/auth'


//for registering an user
const userRegister = async (userCreds) => {
    const response = await axios.post(`${API_URL}/register`, userCreds)


    if (response.data) {
        localStorage.setItem('authInfo', JSON.stringify(response.data))
    }

    return response.data
}

//for user login
const userLogin = async (userCreds) => {
    const response = await axios.post(`${API_URL}/login`, userCreds)


    if (response.data) {
        localStorage.setItem('authInfo', JSON.stringify(response.data))
    }

    return response.data
}

//for user logout
const logout = () => {
    localStorage.removeItem('authInfo')
}




const authService = {
    userRegister,
    userLogin,
    logout,
}

export default authService
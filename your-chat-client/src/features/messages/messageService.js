import axios from 'axios'

const API_URL_ONE = '/api/room'
const API_URL_TWO = '/api/messages'
// for geting the current room
const getTheCurrentRoom = async(id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL_ONE}/${id}`, config)

    return response.data
}



//for getting current room messages
const getTheCurrentRoomMessages = async (id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get(`${API_URL_TWO}/${id}`, config)

    return response.data
}


const messageService = {
    getTheCurrentRoom,
    getTheCurrentRoomMessages
}

export default messageService
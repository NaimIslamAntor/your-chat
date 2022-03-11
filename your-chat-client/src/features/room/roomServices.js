import axios from 'axios'

const API_URL = '/api/room'


//for creating a room
const createRoom = async (roomCreds, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, roomCreds, config)

    return response.data
}


// for getting all the rooms
const getAllRooms = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}


const roomServices = {
    createRoom,
    getAllRooms
}

export default roomServices
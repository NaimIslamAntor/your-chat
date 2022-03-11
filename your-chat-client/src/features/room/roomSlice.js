import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roomServices from './roomServices';

//createRoom creates a room

export const createRoom  = createAsyncThunk('room/create', async (roomCreds, thunkApi) => {

    const token = thunkApi.getState().auth.user.token
    try {
        return await roomServices.createRoom(roomCreds, token)
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})


//getAllRooms get all the rooms

export const getAllRooms = createAsyncThunk('room/getAll', async (_, thunkApi) => {

    const token = thunkApi.getState().auth.user.token

    console.log(token)
    try {
        return await roomServices.getAllRooms(token)
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

const initialState = {
    rooms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
      reset: (state) => {
          state.rooms = []
          state.isError = false
          state.isSuccess = false
          state.isLoading = false
          state.message = ''
      }
  },
  extraReducers: (builder) => {
      builder
      .addCase(createRoom.pending, (state) => {
          state.isLoading = true
      })
      .addCase(createRoom.fulfilled, (state, action) => {
          state.rooms.unshift(action.payload)
          state.isLoading = false
          state.isSuccess = true
      })
      .addCase(createRoom.rejected, (state, action) => {
          state.isError = true
          state.isSuccess = false
          state.isLoading = false
          state.message = action.payload.message
      })

    .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getAllRooms.fulfilled, (state, action) => {
        state.rooms = action.payload
        state.isLoading = false
        state.isSuccess = true
    })
    .addCase(getAllRooms.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
    })
  }
});

export const { reset } = roomSlice.actions

export default roomSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageService'


const initialState = {
    currentRoom: null,
    messages: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}




//get the current room
export const getTheCurrentRoom = createAsyncThunk('room/get', async (id, thunkApi) => {
  const token = thunkApi.getState().auth.user.token

  try {
    return await messageService.getTheCurrentRoom(id, token)
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }


})




//get the current room messages
export const getTheCurrentRoomMessages = createAsyncThunk('room/messages', async (id, thunkApi) => {
  const {auth} = thunkApi.getState()

  const { token } = auth.user


  try {
    return await messageService.getTheCurrentRoomMessages(id, token)
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }


})


 //get the current room messages
// export const getTheCurrentRoomMessages = createAsyncThunk('room/messages', async (id, thunkApi) => {
//   const token = thunkApi.getState().auth.user.token

//   try {
//     return await messageService.getTheCurrentRoomMessages(id, token)
//   } catch (error) {
//     return thunkApi.rejectWithValue(error.response.data)
//   }


// })




const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    reset: (state) => {
    state.currentRoom = null
    state.messages = []
    state.isSuccess = false
    state.isError = false
    state.isLoading = false
    state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTheCurrentRoom.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTheCurrentRoom.fulfilled, (state, action) => {
      state.currentRoom = action.payload
      state.isLoading = false
      state.isSuccess = true
    })
    .addCase(getTheCurrentRoom.rejected, (state, action) => {
      state.currentRoom = null
      state.isError = true
      state.isSuccess = false
      state.isLoading = false
      state.message = action.payload.message
    })

    .addCase(getTheCurrentRoomMessages.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTheCurrentRoomMessages.fulfilled, (state, action) => {
      state.messages = action.payload
      state.isLoading = false
      state.isSuccess = true
    })
    .addCase(getTheCurrentRoomMessages.rejected, (state, action) => {
      state.messages = []
      state.isError = true
      state.isSuccess = false
      state.isLoading = false
      state.message = action.payload.message
    })
  }
});

export const { setMessages, reset } = messageSlice.actions

export default messageSlice.reducer
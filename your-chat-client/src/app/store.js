import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import roomReducer from '../features/room/roomSlice'
import messageReducer from '../features/messages/messageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    messages: messageReducer,
  },
});

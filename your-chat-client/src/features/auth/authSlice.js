import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const user = JSON.parse(localStorage.getItem('authInfo'))

//register thunk
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
       return await authService.userRegister(user)
    } catch (error) {
       
        return thunkApi.rejectWithValue(error.response.data)
    }
})


//login thunk

export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        return await authService.userLogin(user)
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

//logout thunk
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errors: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      reset: (state) => {
        state.isError = false
        state.isSuccess = false
        state.isLoading = false
        state.errors = []
      }
  },
  extraReducers: (builder) => {
      builder.addCase(register.pending, (state) => {
          state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
          state.user = action.payload
          state.isLoading = false
          state.isSuccess = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.errors = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
          state.user = null
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true
      })

     .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isSuccess = true
       })
     .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errors = action.payload
      state.user = null
    })
  }
});

export const { reset } = authSlice.actions

export default authSlice.reducer
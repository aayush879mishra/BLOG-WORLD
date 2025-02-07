import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isLoggedIn: false,
  user: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        const payload = action.payload
        state.isLoggedIn = true
        state.user = payload
    },
    removerUser: (state, action) => {
        state.isLoggedIn = false
        state.user = {}
    }
  },
})

export const { setUser, removerUser } = userSlice.actions

export default userSlice.reducer


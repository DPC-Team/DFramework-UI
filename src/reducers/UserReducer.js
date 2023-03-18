import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
    addingUser: {},
    visibleAdd: false,
  },
  reducers: {
    GetUsers: (state, action) => {
      state.users = action.payload
    },
    OpenAddUser: (state, action) => {
      state.visibleAdd = true
      state.addingUser = {}
    },
    CloseAddUser: (state, action) => {
      state.visibleAdd = false
    },
    AddUser: (state, action) => {
      state.addingUser = {}
    },
  },
})

export const { GetUsers, OpenAddUser, AddUser, CloseAddUser } = UserSlice.actions

export default UserSlice.reducer

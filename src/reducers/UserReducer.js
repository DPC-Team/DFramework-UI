import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
    addingUser: {},
    updatingUser: {},
    deleteUserId: null,
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
    UpdateUser: (state, action) => {
      state.updatingUser = {}
    },
    DeleteUser: (state, action) => {
      state.deleteUserId = action.payload
    },
  },
})

export const { GetUsers, OpenAddUser, AddUser, CloseAddUser, UpdateUser, DeleteUser } =
  UserSlice.actions

export default UserSlice.reducer

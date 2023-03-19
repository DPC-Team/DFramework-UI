import { createSlice } from '@reduxjs/toolkit'

const initialUser = {
  username: '',
  fullname: '',
  email: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
    addingUser: { ...initialUser },
    updatingUser: { ...initialUser },
    deleteUserId: null,
    visibleAdd: false,
    visibleUpdate: false,
  },
  reducers: {
    GetUsers: (state, action) => {
      state.users = action.payload
    },
    OpenAddUser: (state, action) => {
      state.visibleAdd = true
      state.addingUser = { ...initialUser }
    },
    CloseAddUser: (state, action) => {
      state.visibleAdd = false
    },
    OpenUpdateUser: (state, action) => {
      state.visibleUpdate = true
      state.updatingUser = action.payload
    },
    CloseUpdateUser: (state, action) => {
      state.visibleUpdate = false
      state.updatingUser = { ...initialUser }
    },
    AddUser: (state, action) => {
      state.addingUser = { ...initialUser }
    },
    UpdateUser: (state, action) => {
      state.updatingUser = action.payload
    },
    DeleteUser: (state, action) => {
      state.deleteUserId = action.payload
    },
  },
})

export const {
  GetUsers,
  OpenAddUser,
  AddUser,
  CloseAddUser,
  UpdateUser,
  DeleteUser,
  OpenUpdateUser,
  CloseUpdateUser,
} = UserSlice.actions

export default UserSlice.reducer

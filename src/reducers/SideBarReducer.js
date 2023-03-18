import { createSlice } from '@reduxjs/toolkit'

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarShow: true,
    sidebarUnfoldable: false,
  },
  reducers: {
    SetSidebar: (state, action) => {
      state.sidebarShow = action.payload
    },
    SetUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const { SetSidebar, SetUnfoldable } = SidebarSlice.actions

export default SidebarSlice.reducer

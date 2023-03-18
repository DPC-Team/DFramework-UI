import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'
import SideBarReducer from './reducers/SideBarReducer'

export default configureStore({
  reducer: {
    users: UserReducer,
    sidebar: SideBarReducer,
  },
})

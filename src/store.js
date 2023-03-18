import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'
import SideBarReducer from './reducers/SideBarReducer'
import LocalizationReducer from './reducers/LocalizationReducer'

export default configureStore({
  reducer: {
    users: UserReducer,
    sidebar: SideBarReducer,
    localization: LocalizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

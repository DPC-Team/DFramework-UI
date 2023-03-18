import { createSlice } from '@reduxjs/toolkit'

export const LocalizationSlice = createSlice({
  name: 'sidebar',
  initialState: {
    localization: {},
  },
  reducers: {
    SetLocalization: (state, action) => {
      state.localization = action.payload
    },
  },
})

export const { SetLocalization } = LocalizationSlice.actions

export default LocalizationSlice.reducer

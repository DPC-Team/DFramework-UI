import { createSlice } from '@reduxjs/toolkit'

export const LocalizationSlice = createSlice({
  name: 'sidebar',
  initialState: {
    localization: {
      get: getPropertyValueOrKey,
    },
  },
  reducers: {
    SetLocalization: (state, action) => {
      state.localization = action.payload
      if (state.localization) {
        state.localization.get = getPropertyValueOrKey
      }
    },
  },
})

function getPropertyValueOrKey(property) {
  property = property.toLowerCase()
  if (this.hasOwnProperty(property)) {
    return this[property]
  } else {
    return property
  }
}

export const { SetLocalization } = LocalizationSlice.actions

export default LocalizationSlice.reducer

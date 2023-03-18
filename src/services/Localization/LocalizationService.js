import { SetLocalization } from 'src/reducers/LocalizationReducer'
import apiClient from 'src/utils/apiClient'

export const LoadLocalization = () => (dispatch) => {
  return apiClient.get(`/localization/all`).then((response) => {
    dispatch(SetLocalization(response.data))
  })
}

import { GetUsers as getUsers, AddUser as addUser } from 'src/reducers/UserReducer'
import apiClient from 'src/utils/apiClient'

export const GetUsers =
  (PageSize = 10, PageNumber = 1) =>
  (dispatch) => {
    apiClient.get(`/users/all?PageSize=${PageSize}&PageNumber=${PageNumber}`).then((response) => {
      dispatch(getUsers(response.data))
    })
  }

export const AddUser = (user) => (dispatch) => {
  return apiClient.post(`/users/add`, user).then((response) => {
    dispatch(addUser(response.data))
  })
}

import {
  GetUsers as getUsers,
  AddUser as addUser,
  UpdateUser as updateUser,
  DeleteUser as deleteUser,
} from 'src/reducers/UserReducer'
import apiClient from 'src/utils/apiClient'

export const GetUsers =
  (PageNumber = 1, PageSize = 10) =>
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

export const UpdateUser = (user) => (dispatch) => {
  return apiClient.put(`/users/update`, user).then((response) => {
    dispatch(updateUser(response.data))
  })
}

export const DeleteUser = (id) => (dispatch) => {
  return apiClient.delete(`/users/delete/${id}`).then((response) => {
    dispatch(deleteUser(null))
  })
}

import React, { useEffect } from 'react'
import { GetUsers, DeleteUser } from 'src/services/Security/UserService'
import { useSelector, useDispatch } from 'react-redux'
import {
  OpenAddUser,
  CloseAddUser,
  DeleteUser as setDeleteUser,
  CloseUpdateUser,
} from 'src/reducers/UserReducer'
import AddUser from './AddUser'
import UserList from './UserList'
import UpdateUser from './UpdateUser'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import Confirmation from 'src/components/Confirmation/Confirmation'

const Users = () => {
  const localization = useSelector((state) => state.localization.localization)
  const deleteUserId = useSelector((state) => state.users.deleteUserId)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUsers())
  }, [dispatch])

  const OpenAddHandler = () => {
    dispatch(OpenAddUser())
  }

  const OnSaveUser = () => {
    dispatch(CloseAddUser())
    dispatch(GetUsers())
  }

  const OnSaveUpdateUser = () => {
    dispatch(CloseUpdateUser())
    dispatch(GetUsers())
  }

  const OnConfirmDelete = () => {
    dispatch(DeleteUser(deleteUserId)).then(() => {
      dispatch(GetUsers())
    })
  }

  const OnCancelDelete = () => {
    dispatch(setDeleteUser(null))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <AddUser onSave={OnSaveUser} />
        <UpdateUser onSave={OnSaveUpdateUser} />
        <Confirmation
          title={localization.get('users.delete.title')}
          text={localization.get('users.delete.text')}
          confirmButtonText={localization.get('users.delete.confirm.button')}
          closeButtonText={localization.get('users.delete.close.button')}
          confirmButtonColor="danger"
          onConfirm={OnConfirmDelete}
          onCancel={OnCancelDelete}
          open={deleteUserId != null}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{localization.get('users.title')}</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              <CButton color="info" onClick={OpenAddHandler}>
                {localization.get('users.add.button')}
              </CButton>
            </p>
            <UserList />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users

import React, { useState } from 'react'
import { CloseAddUser } from 'src/reducers/UserReducer'
import { AddUser as addUser } from 'src/services/Security/UserService'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormText,
} from '@coreui/react'

const AddUser = (props) => {
  const { onSave } = props

  const user = useSelector((state) => state.users.addingUser)
  const [currentUser, setUser] = useState(user)
  const visibleAdd = useSelector((state) => state.users.visibleAdd)
  const dispatch = useDispatch()

  const OnUsernameChange = (e) => {
    setUser((prev) => ({ ...prev, username: e.target.value }))
  }
  const OnFullnameChange = (e) => {
    setUser((prev) => ({ ...prev, fullName: e.target.value }))
  }
  const OnEmailChange = (e) => {
    setUser((prev) => ({ ...prev, email: e.target.value }))
  }

  const closeHandler = () => {
    setUser({})
    dispatch(CloseAddUser())
  }

  const saveHandler = () => {
    addUser(currentUser)

    onSave()
  }

  return (
    <CModal alignment="center" visible={visibleAdd} onClose={() => closeHandler()}>
      <CModalHeader>
        <CModalTitle>Add User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol xs="auto">
          <CFormLabel htmlFor="userName">Username</CFormLabel>
          <CFormInput
            type="text"
            id="userName"
            aria-describedby="userNameInputHelp"
            value={currentUser.username}
            onChange={OnUsernameChange}
          />
        </CCol>
        <CCol xs="auto">
          <CFormLabel htmlFor="fullName">Fullname</CFormLabel>
          <CFormInput
            type="text"
            id="fullName"
            aria-describedby="userNameInputHelp"
            value={currentUser.fullName}
            onChange={OnFullnameChange}
          />
        </CCol>
        <CCol xs="auto">
          <CFormLabel htmlFor="email" value={currentUser.email}>
            Email address
          </CFormLabel>
          <CFormInput
            type="email"
            id="email"
            placeholder="name@example.com"
            aria-describedby="emailInputHelp"
            onChange={OnEmailChange}
          />
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeHandler()}>
          Close
        </CButton>
        <CButton color="info" onClick={saveHandler}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddUser.propTypes = {
  onSave: PropTypes.func,
}

export default AddUser

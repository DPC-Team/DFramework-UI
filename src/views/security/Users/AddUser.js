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
  CCol,
  CFormLabel,
  CFormInput,
} from '@coreui/react'

const AddUser = (props) => {
  const { onSave } = props
  const localization = useSelector((state) => state.localization.localization)
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
        <CModalTitle>{localization.get('adduser.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol xs="auto">
          <CFormLabel htmlFor="userName">{localization.get('adduser.input.username')}</CFormLabel>
          <CFormInput
            type="text"
            id="userName"
            aria-describedby="userNameInputHelp"
            value={currentUser.username}
            onChange={OnUsernameChange}
          />
        </CCol>
        <CCol xs="auto">
          <CFormLabel htmlFor="fullName">{localization.get('adduser.input.fullname')}</CFormLabel>
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
            {localization.get('adduser.input.email')}
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
          {localization.get('adduser.button.close')}
        </CButton>
        <CButton color="info" onClick={saveHandler}>
          {localization.get('adduser.button.save')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddUser.propTypes = {
  onSave: PropTypes.func,
}

export default AddUser

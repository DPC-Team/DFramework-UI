import React, { useState, useEffect, useRef } from 'react'
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
  CFormInput,
  CForm,
} from '@coreui/react'

const AddUser = (props) => {
  const { onSave } = props
  const user = useSelector((state) => state.users.addingUser)
  const [currentUser, setUser] = useState(user)
  const [validated, setValidated] = useState(false)
  const localization = useSelector((state) => state.localization.localization)
  const visibleAdd = useSelector((state) => state.users.visibleAdd)
  const formRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setValidated(false)
  }, [user])

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

  const saveHandler = (e) => {
    const form = formRef.current
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      dispatch(addUser(currentUser)).then((res) => {
        onSave()
      })
    }
    setValidated(true)
  }

  return (
    <CModal alignment="center" visible={visibleAdd} onClose={() => closeHandler()}>
      <CModalHeader>
        <CModalTitle>{localization.get('adduser.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol xs="auto">
          <CForm
            ref={formRef}
            className="row needs-validation"
            onSubmit={saveHandler}
            noValidate
            validated={validated}
          >
            <div className="mb-3">
              <CFormInput
                type="text"
                id="userName"
                label={localization.get('adduser.input.username')}
                aria-describedby="userNameInputHelp"
                value={currentUser.username}
                onChange={OnUsernameChange}
                feedbackInvalid={localization.get('adduser.input.username.feedback')}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                id="fullName"
                label={localization.get('adduser.input.fullname')}
                aria-describedby="fullnameInputHelp"
                value={currentUser.fullName}
                onChange={OnFullnameChange}
                feedbackInvalid={localization.get('adduser.input.fullname.feedback')}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="email"
                id="email"
                label={localization.get('adduser.input.email')}
                placeholder="name@example.com"
                aria-describedby="emailInputHelp"
                onChange={OnEmailChange}
                feedbackInvalid={localization.get('login.input.email.feedback')}
                required
              />
            </div>
            <CButton type="submit" style={{ display: 'none' }}>
              Enviar
            </CButton>
          </CForm>
        </CCol>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeHandler}>
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

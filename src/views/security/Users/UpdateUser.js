import React, { useState, useEffect, useRef } from 'react'
import { CloseUpdateUser } from 'src/reducers/UserReducer'
import { UpdateUser as updateUser } from 'src/services/Security/UserService'
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

const UpdateUser = (props) => {
  const { onSave } = props
  const user = useSelector((state) => state.users.updatingUser)
  const [currentUser, setUser] = useState(user)
  const [validated, setValidated] = useState(false)
  const localization = useSelector((state) => state.localization.localization)
  const visibleUpdate = useSelector((state) => state.users.visibleUpdate)
  const formRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setValidated(false)
    setUser(user)
  }, [user])

  const OnFullnameChange = (e) => {
    setUser((prev) => ({ ...prev, fullName: e.target.value }))
  }
  const OnEmailChange = (e) => {
    setUser((prev) => ({ ...prev, email: e.target.value }))
  }

  const closeHandler = () => {
    setUser({})
    dispatch(CloseUpdateUser())
  }

  const saveHandler = (e) => {
    const form = formRef.current
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      dispatch(updateUser(currentUser)).then((res) => {
        onSave()
      })
    }
    setValidated(true)
  }
  return (
    <CModal alignment="center" visible={visibleUpdate} onClose={() => closeHandler()}>
      <CModalHeader>
        <CModalTitle>{localization.get('updateuser.title')}</CModalTitle>
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
                aria-describedby="userNameInputHelp"
                value={currentUser.username}
                readOnly
                plainText
                style={{ fontWeight: 'bold' }}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                id="fullName"
                label={localization.get('updateuser.input.fullname')}
                aria-describedby="fullnameInputHelp"
                value={currentUser.fullname}
                onChange={OnFullnameChange}
                feedbackInvalid={localization.get('updateuser.input.fullname.feedback')}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="email"
                id="email"
                label={localization.get('updateuser.input.email')}
                placeholder="name@example.com"
                aria-describedby="emailInputHelp"
                value={currentUser.email}
                onChange={OnEmailChange}
                feedbackInvalid={localization.get('updateuser.input.email.feedback')}
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
          {localization.get('updateuser.button.close')}
        </CButton>
        <CButton color="info" onClick={saveHandler}>
          {localization.get('updateuser.button.save')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

UpdateUser.propTypes = {
  onSave: PropTypes.func,
}

export default UpdateUser

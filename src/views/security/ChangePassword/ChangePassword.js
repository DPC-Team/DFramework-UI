import React, { useState, useEffect, useRef } from 'react'
import { changePassword } from 'src/services/Authentication/AuthenticationServices'
import { useSelector } from 'react-redux'
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
  CAlert,
} from '@coreui/react'

const ChangePassword = (props) => {
  const { open, onClose } = props
  const [currentChangePassword, setCurrentChangePassword] = useState({})
  const [validated, setValidated] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const localization = useSelector((state) => state.localization.localization)
  const formRef = useRef(null)

  useEffect(() => {
    setValidated(false)
    setCurrentChangePassword({})
    setErrorMessage(null)
  }, [open])

  const OnOldPasswordChange = (e) => {
    setCurrentChangePassword((prev) => ({ ...prev, oldPassword: e.target.value }))
  }
  const OnNewPasswordChange = (e) => {
    setCurrentChangePassword((prev) => ({ ...prev, newPassword: e.target.value }))
  }
  const OnConfirmedPasswordChange = (e) => {
    setCurrentChangePassword((prev) => ({ ...prev, confirmedPassword: e.target.value }))
  }

  const closeHandler = () => {
    setCurrentChangePassword({})
    if (onClose) onClose()
  }

  const saveHandler = (e) => {
    const form = formRef.current
    setErrorMessage(null)
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      changePassword(currentChangePassword)
        .then((res) => {
          closeHandler()
        })
        .catch((response) => {
          var data = response.response.data
          if (data && data.HasError) setErrorMessage(data.Message)
        })
    }
    setValidated(true)
  }

  return (
    <CModal alignment="center" visible={open} onClose={() => closeHandler()}>
      <CModalHeader>
        <CModalTitle>{localization.get('changepassword.title')}</CModalTitle>
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
              {errorMessage && <CAlert color="danger">{errorMessage}</CAlert>}
              <CFormInput
                type="password"
                id="oldpassword"
                label={localization.get('changepassword.input.oldpassword')}
                onChange={OnOldPasswordChange}
                feedbackInvalid={localization.get('changepassword.input.oldpassword.feedback')}
                required
                value={currentChangePassword.oldPassword}
                style={{ fontWeight: 'bold' }}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="password"
                id="newPassword"
                label={localization.get('changepassword.input.newpassword')}
                value={currentChangePassword.newPassword}
                onChange={OnNewPasswordChange}
                feedbackInvalid={localization.get('changepassword.input.newpassword.feedback')}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="password"
                id="confirmedpassword"
                label={localization.get('changepassword.input.confirmedpassword')}
                value={currentChangePassword.confirmedPassword}
                onChange={OnConfirmedPasswordChange}
                feedbackInvalid={localization.get(
                  'changepassword.input.confirmedpassword.feedback',
                )}
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
          {localization.get('changepassword.button.close')}
        </CButton>
        <CButton color="info" onClick={saveHandler}>
          {localization.get('changepassword.button.save')}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ChangePassword.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default ChangePassword

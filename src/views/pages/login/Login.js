import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { authenticate } from 'src/services/Authentication/AuthenticationServices'

const Login = () => {
  const localization = useSelector((state) => state.localization.localization)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)

  const navigate = useNavigate()
  const handlerUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlerPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onLogin = async (e) => {
    if (e) {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        var user = await authenticate(username, password)
        if (user && user.token) {
          setUsername('')
          setPassword('')
          navigate('/')
        }
      }
      setValidated(true)
    }
  }

  const OnEnterEvent = async (e) => {
    if (e.key === 'Enter') await onLogin()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    className="row needs-validation"
                    onSubmit={onLogin}
                    noValidate
                    validated={validated}
                  >
                    <h1>{localization.get('login.title')}</h1>
                    <p className="text-medium-emphasis">{localization.get('login.text')}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder={localization.get('login.input.username')}
                        autoComplete="username"
                        feedbackInvalid={localization.get('login.input.username.feedback')}
                        required
                        onChange={handlerUsernameChange}
                        onKeyPress={OnEnterEvent}
                        value={username}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder={localization.get('login.input.password')}
                        autoComplete="current-password"
                        onChange={handlerPasswordChange}
                        onKeyPress={OnEnterEvent}
                        value={password}
                        feedbackInvalid={localization.get('login.input.username.feedback')}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={onLogin}>
                          {localization.get('login.button')}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" type="submit">
                          {localization.get('login.forgotpassword')}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

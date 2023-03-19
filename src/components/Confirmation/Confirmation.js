import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalFooter, CModalBody, CButton, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const Confirmation = (props) => {
  const {
    title,
    text,
    confirmButtonText,
    closeButtonText,
    confirmButtonColor = 'primary',
    closeButtonColor = 'secondary',
    onConfirm,
    onCancel,
    open = false,
  } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(open)
  }, [open])

  const OnConfirmHandler = () => {
    if (onConfirm) onConfirm()
  }

  const OnCloseHandler = () => {
    setVisible(false)
    if (onCancel) onCancel()
  }

  return (
    <CModal visible={visible} onClose={OnCloseHandler}>
      <CModalHeader onClose={OnCloseHandler}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{text}</CModalBody>
      <CModalFooter>
        <CButton color={closeButtonColor} onClick={OnCloseHandler}>
          {closeButtonText}
        </CButton>
        <CButton color={confirmButtonColor} onClick={OnConfirmHandler}>
          {confirmButtonText}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

Confirmation.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  confirmButtonText: PropTypes.string,
  closeButtonText: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  closeButtonColor: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
}

export default Confirmation

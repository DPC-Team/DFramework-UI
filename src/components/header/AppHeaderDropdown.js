import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Logout } from 'src/services/Authentication/AuthenticationServices'
import avatar10 from './../../assets/images/avatars/10.jpg'
import { useSelector } from 'react-redux'
import ChangePassword from 'src/views/security/ChangePassword/ChangePassword'
import { getCurrentUser } from 'src/services/Authentication/AuthenticationServices'

const AppHeaderDropdown = () => {
  const localization = useSelector((state) => state.localization.localization)
  const [openChangePassword, setOpenChangePassword] = useState(false)

  const LogoutHandler = () => {
    Logout()
  }

  const OpenChangePassword = (e) => {
    e.preventDefault()
    setOpenChangePassword(true)
  }

  const user = getCurrentUser()

  return (
    <>
      <ChangePassword open={openChangePassword} onClose={() => setOpenChangePassword(false)} />
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={avatar10} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">{user.username}</CDropdownHeader>
          <CDropdownItem href="#" onClick={OpenChangePassword}>
            <CIcon icon={cilLockLocked} className="me-2" />
            {localization.get(`headerdropdown.changepassword`)}
          </CDropdownItem>
          <CDropdownItem href="#" onClick={LogoutHandler}>
            <CIcon icon={cilLockLocked} className="me-2" />
            {localization.get(`headerdropdown.logout`)}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown

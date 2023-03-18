import React from 'react'
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
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const localization = useSelector((state) => state.localization.localization)

  const LogoutHandler = () => {
    Logout()
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {localization.get(`headerdropdown.account`)}
        </CDropdownHeader>
        <CDropdownItem href="#" onClick={LogoutHandler}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {localization.get(`headerdropdown.logout`)}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

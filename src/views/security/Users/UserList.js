import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import Pagination from 'src/components/Pagination/Pagination'
import { GetUsers } from 'src/services/Security/UserService'
import { DeleteUser } from 'src/reducers/UserReducer'

const UserList = (props) => {
  const users = useSelector((state) => state.users.users)
  const localization = useSelector((state) => state.localization.localization)
  const pagination = { ...users, items: null }
  const dispatch = useDispatch()

  const onPaginationChange = (pageNumber) => {
    dispatch(GetUsers(pageNumber))
  }

  const deleteUser = (id) => {
    dispatch(DeleteUser(id))
  }

  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              {localization.get('users.table.header.username')}
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              {localization.get('users.table.header.fullname')}
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              {localization.get('users.table.header.email')}
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users &&
            users.items &&
            users.items.map((item) => (
              <CTableRow key={item.id}>
                <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                <CTableDataCell>{item.username}</CTableDataCell>
                <CTableDataCell>{item.fullname}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell className="col-2">
                  <CButton color="link"> {localization.get('users.table.edit.action')}</CButton>
                  <CButton color="dark" onClick={() => deleteUser(item.id)}>
                    {localization.get('users.table.delete.action')}
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <Pagination {...pagination} onChange={onPaginationChange} />
    </div>
  )
}

export default UserList

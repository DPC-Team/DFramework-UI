import React, { useEffect } from 'react'
import { GetUsers } from 'src/services/Security/UserService'
import { useSelector, useDispatch } from 'react-redux'
import { OpenAddUser } from 'src/reducers/UserReducer'
import AddUser from './AddUser'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

const Users = () => {
  const users = useSelector((state) => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetUsers())
  }, [dispatch])

  const OpenAddHandler = () => {
    dispatch(OpenAddUser())
  }

  const OnSaveUser = () => {
    dispatch(GetUsers())
  }

  return (
    <CRow>
      <CCol xs={12}>
        <AddUser onSave={OnSaveUser} />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              <CButton color="info" onClick={OpenAddHandler}>
                Add
              </CButton>
            </p>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
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
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users

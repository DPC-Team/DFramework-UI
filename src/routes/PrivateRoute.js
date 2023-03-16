import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />
  }

  try {
    const decoded = jwt_decode(token)
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token')
      return <Navigate to="/login" />
    }
  } catch (error) {
    console.log(error)
    localStorage.removeItem('token')
    return <Navigate to="/login" />
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.node,
}

export default PrivateRoute

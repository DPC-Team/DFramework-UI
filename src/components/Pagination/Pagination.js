import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Pagination = (props) => {
  const localization = useSelector((state) => state.localization.localization)
  const { hasPreviousPage, hasNextPage, totalPages, pageNumber, onChange } = props
  const items = []

  if (pageNumber === 1) {
    items.push(pageNumber)
    if (hasNextPage) items.push(2)
    if (totalPages > 2) items.push(3)
  } else {
    if (pageNumber === totalPages && pageNumber - 2 >= 1) items.push(pageNumber - 2)
    items.push(pageNumber - 1)
    items.push(pageNumber)
    if (pageNumber + 1 <= totalPages) items.push(pageNumber + 1)
  }

  const OnChangeHandler = (number) => {
    if (onChange) onChange(number)
  }

  const OnClickNextHandler = (e) => {
    OnChangeHandler(pageNumber + 1)
  }

  const OnClickPreviousHandler = (e) => {
    OnChangeHandler(pageNumber - 1)
  }

  if (hasPreviousPage || hasNextPage) {
    return (
      <CPagination align="center">
        <CPaginationItem disabled={!hasPreviousPage} onClick={OnClickPreviousHandler}>
          {localization.get('<')}
        </CPaginationItem>
        {items.map((item) => (
          <CPaginationItem
            key={item}
            active={pageNumber === item}
            onClick={() => OnChangeHandler(item)}
          >
            {item}
          </CPaginationItem>
        ))}
        <CPaginationItem disabled={!hasNextPage} onClick={OnClickNextHandler}>
          {localization.get('>')}
        </CPaginationItem>
      </CPagination>
    )
  }
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  hasPreviousPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  totalPages: PropTypes.number,
  pageNumber: PropTypes.number,
  totalCount: PropTypes.number,
}

export default Pagination

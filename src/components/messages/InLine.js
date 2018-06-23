import React from 'react'
import PropTypes from 'prop-types'

const InLine = ({ type, text }) => {

  let color = 'black'

  if (type === 'error') color = '#912d2b'

  return(
    <span style={{ color: color }}>{text}</span>
  )

}

InLine.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default InLine

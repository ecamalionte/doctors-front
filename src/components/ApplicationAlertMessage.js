import React from 'react'
import { Message  } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const ApplicationAlertMessage = ({title, message, status}) => {

  let message_props= {
    header: title,
    content: message
  }

  if (status === 'error'){
    message_props.negative = true
    message_props.icon = 'warning sign'
  }

  if (status === 'success'){
    message_props.info = true
    message_props.icon = 'info circle'
  }

  return (
    <Message {...message_props}/>
    )
}


ApplicationAlertMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string
}

export default ApplicationAlertMessage

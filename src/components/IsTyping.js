import React from 'react'
import { Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const IsTyping = ({user}) => {
  if(user !== '')
    return (
      <Label as='span' color='teal' ribbon='right'>
        {user}
        <Label.Detail>is typing ...</Label.Detail>
      </Label>
      )

  return(<div style={{ minHeight: '26px' }}><br/></div>)
}

IsTyping.propTypes = {
  user: PropTypes.string
}

export default IsTyping

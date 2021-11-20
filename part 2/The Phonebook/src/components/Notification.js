import React from 'react'

const Notification = ( {message} ) => {
  const messageStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const success = { color: "green" }
  const fail ={ color: "red" }
  const color = message[1] ? success :fail

  const style = {
    ...messageStyle,
    ...color
  }

  if ( message[0] === null ) {
    return null
  }
  return <div style={style}>{message}</div>
}

export default Notification

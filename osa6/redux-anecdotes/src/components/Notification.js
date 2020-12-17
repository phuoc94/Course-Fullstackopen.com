import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.message)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  setTimeout(() => {
    dispatch(setMessage(null))
  }, 5000)
  if(notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  

  return <></>
}

export default Notification
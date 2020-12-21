import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.message)

    if(notification){
        return (
            <div className={ notification[1] === 'error'
                ? 'bg-red-700 text-white px-4 py-2 flex justify-center rounded'
                : 'bg-green-700 text-white px-4 py-2 flex justify-center rounded' }>
                {notification[0]}
            </div>
        )
    }
    return <></>
}

export default Notification
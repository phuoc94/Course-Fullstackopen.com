import React, { useState, useImperativeHandle } from 'react'

const Notification = React.forwardRef((props, ref) => {
    const [emessage, setErrorMessage] = useState(null)

    const notiHandler = (message, type) => {
        setErrorMessage(
            [message, type]
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    useImperativeHandle(ref, () => {
        return {
            notiHandler
        }
    })

    if (!emessage) {
        return null
    } else {
        const message = emessage[0]
        const type = emessage[1]
        if (type === 'error') {
            return (
                <div className="bg-red-700 text-white px-4 py-2 flex justify-center rounded">
                    {message}
                </div>
            )
        } else if (type === 'success') {
            return (
                <div className="bg-green-700 text-white px-4 py-2 flex justify-center rounded">
                    {message}
                </div>
            )
        } else {
            return (
                <div>
                    {message}
                </div>
            )
        }
    }
})

Notification.displayName = 'Notification'

export default Notification
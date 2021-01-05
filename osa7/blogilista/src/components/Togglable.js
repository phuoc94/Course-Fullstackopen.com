import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div className="py-4 ">
            <div style={hideWhenVisible}>
                <button className="
                bg-green-300 py-2 px-4 rounded-lg w-52
                "
                onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}
                    className="bg-gray-400 py-2 px-4 rounded-lg w-1/3"
                >cancel</button>
            </div>
        </div>
    )
}
)
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable
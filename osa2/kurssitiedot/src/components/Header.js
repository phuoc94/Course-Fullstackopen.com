import React from 'react'

const Header = ({ text, type }) => {
    if (type === 'h2') {
        return (
            <h2>{text}</h2>
        )
    }
    return (
        <h1>{text}</h1>
    )
}

export default Header
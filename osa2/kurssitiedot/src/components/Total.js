import React from 'react'

const Total = ({ parts }) => {
    const total = parts.reduce((sum, p) => sum + p.exercises, 0)

    return (
        <p><b>Total of {total} exercise</b></p >
    )
}

export default Total
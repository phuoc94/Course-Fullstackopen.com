import React from 'react'
import Part from './Part'


const Content = ({ parts }) => {
    const partsEle = parts.map((part) =>
        <Part part={part} key={part.id} />
    )
    return (
        <div>
            {partsEle}
        </div>
    )
}

export default Content
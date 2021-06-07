import React, {useState, useEffect}  from 'react'
import './Acordion.css'

const Acordion = ({children, id, value, onChange}) => {
    return (
        <div className="accordion" id={id}>
            {
                children.map((child, index) => (
                    React.cloneElement(child, {
                        onClick: onChange,
                        key: index,
                        index,
                        parentId: id,
                        value
                    })
                ))
            }
        </div>
    )
}

export default Acordion

import React from 'react'
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
                        value: value - 1
                    })
                ))
            }
        </div>
    )
}

export default Acordion

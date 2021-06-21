import React from 'react'
import './Folder.css'
import clsx from 'clsx'

const Folder = ({name, categoryValue, target, icon, values, onChange}) => {

    return (
        <label className={clsx("Folder mb-2", {selected: values.includes(categoryValue)})}>
            <div className={clsx("Folder-content")}>
                <input 
                    value={categoryValue} 
                    checked={values.includes(categoryValue)} 
                    onChange={onChange} 
                    type="checkbox" 
                    name={target} />
                <i className={icon}></i>
                <p>{name}</p>
            </div>
        </label>
    )
}

export default Folder

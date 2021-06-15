import React, {useState} from 'react'
import './Folder.css'
import {useHistory, useLocation} from 'react-router-dom'
import clsx from 'clsx'

const Folder = ({name, categoryValue, target, icon, selection, onChange}) => {

    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <label className={clsx("Folder mb-2", {selected: selection === categoryValue})}>
            <div className={clsx("Folder-content")}>
                <input 
                    value={categoryValue} 
                    checked={selection === categoryValue} 
                    onChange={handleChange} 
                    type="radio" 
                    name={target} />
                <i className={icon}></i>
                <p>{name}</p>
            </div>
        </label>
    )
}

export default Folder

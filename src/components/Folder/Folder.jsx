import React from 'react'
import './Folder.css'
import {useHistory, useLocation} from 'react-router-dom'

const Folder = ({name}) => {
    const history = useHistory()
    const location = useLocation()

    const handleClick = () => {
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('category', 'clasica')
        history.push({
            pathname: '/collection',
            search: urlParams.toString()
        })
    }
    return (
        <div onClick={handleClick} className="Folder mb-1">
            <div className="Folder-content">
                <i className="fas fa-cube"></i>
                <h6>{name}</h6>
            </div>
        </div>
    )
}

export default Folder

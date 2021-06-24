import React, { useEffect, useState } from 'react'
import './LogoSelector.css'

const LogoSelector = ({dark, onChange}) => {
    const [file, setFile] = useState(null)

    const handleUpload = e => {
        file && URL.revokeObjectURL(file)
        const currFile = e.target.files[0]
        const fileUrl = URL.createObjectURL(currFile)
        setFile(fileUrl)
        onChange && onChange(fileUrl)
    }

    return (
        <div>
            <label style={{background: dark? "#333" : "#EEE", border: `1px dashed ${dark? "#FFF":"#555"}`}} className="LogoSelector">
                <input onChange={handleUpload} type="file" hidden />
                {
                    file?
                    <img src={file} className="img-fluid" alt={file.name}></img>
                    :
                    <i style={{color: dark? "#FFF": "#333"}} className="fas fa-upload LogoSelector-icon"></i>
                }
            </label>
            <p className="mt-1">{dark? "Fondo Oscuro" :  "Fondo Claro"}</p>
        </div>
    )
}

export default LogoSelector

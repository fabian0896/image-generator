import React from 'react'
import './Canvas.css'

import logoSvg from '../../SVG/image-regular.svg'

const Canvas = () => {
    return (
        <div className="Canvas">
            <div className="Canvas-info-container">
                <img className="Canvas-logo" src={logoSvg} alt="images logo" />
                <p className="Canvas-help-text">Ingresa los datos para poder renderizar la imagen</p>
            </div>
        </div>
    )
}

export default Canvas

import React, {useEffect, useRef, useState} from 'react'
import {BackgoundRemover} from '../../services/imaginator'

import './ImageRemover.css'

const ImageRemover = (props) => {
    const bgRemover = useRef(null)
    const [isEditing, setIsEsditing] = useState(false)
    const [imageLoad, setImageLoad] = useState(false)

    useEffect(()=>{
        const backgroundRemover = new BackgoundRemover('backgroundRemover', 'range')
        bgRemover.current = backgroundRemover
    }, [])

    const handleAddImage = () => {
        const fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute('accept', 'image/*')
        fileInput.click()
        const uploadImage = (e) => {
            const file = e.target.files[0]
            bgRemover.current.uploadImage(file)
            fileInput.removeEventListener('change', uploadImage)
            setIsEsditing(true)
            setImageLoad(true)
        }
        fileInput.addEventListener('change', uploadImage)
    }

    const handleSaveImage = async () => {
            const file = await bgRemover.current.generateImage()
            props.onSave && props.onSave(file)
            setIsEsditing(false)
            setImageLoad(false)
    }

    const handleCancel = () => {
        setIsEsditing(false)
        bgRemover.current.cancel()
        props.onCancel && props.onCancel()
        setImageLoad(false)
    }

    const handleFlip = () => {
        bgRemover.current.flipImage()
    }

    return (
        <div>
            <div className="ImageRemover-canvas-container">
                <div onClick={handleFlip} className="ImageRemover-icons-container">
                    <div>
                        <i className="fas fa-caret-right"></i>
                        <i className="fas fa-grip-lines-vertical"></i>
                        <i className="fas fa-caret-left"></i>
                    </div>
                </div>
                <canvas id="backgroundRemover"></canvas>
            </div>
            <input type="range" className="form-range mt-3" id="range"></input>
            <div className="row">
                <div className="col">
                    {
                        isEditing?
                        <button type="button" onClick={handleSaveImage} className="btn btn-primary form-control">Añadir</button>
                        :
                        <button type="button" onClick={handleAddImage} className="btn btn-primary form-control">Cargar Imagen</button>
                    }
                </div>
                {
                    imageLoad &&
                    <div className="col">
                        <button type="button" onClick={handleCancel} className="btn btn-danger form-control">Cancelar</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ImageRemover

import React, {useEffect, useRef, useState} from 'react'
import {BackgoundRemover} from '../../services/imaginator'

const ImageRemover = (props) => {
    const bgRemover = useRef(null)
    const [isEditing, setIsEsditing] = useState(false)

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
            console.log(file)
            bgRemover.current.uploadImage(file)
            fileInput.removeEventListener('change', uploadImage)
            setIsEsditing(true)
        }
        fileInput.addEventListener('change', uploadImage)
    }

    const handleSaveImage = async () => {
            const file = await bgRemover.current.generateImage()
            console.log(file)
            props.onSave && props.onSave(file)
            setIsEsditing(false)
    }

    const handleCancel = () => {
        setIsEsditing(false)
        bgRemover.current.cancel()
        props.onCancel && props.onCancel()
    }

    return (
        <div>
            <canvas id="backgroundRemover"></canvas>
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
                <div className="col">
                    <button type="button" onClick={handleCancel} className="btn btn-danger form-control">Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ImageRemover

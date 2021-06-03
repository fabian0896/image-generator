import React, { useEffect, useRef, useState } from 'react'

import { Imaginator } from '../../services/imaginator'
import { ImageRemover, ProductForm } from '../../components'

const FormGroup = () => {
    const canvas = useRef()
    const [imageMode, setImageMode] = useState(false)

    useEffect(() => {
        const imaginator = new Imaginator('c', 1140, 840)
        imaginator.init({
            productName: 'Faja Latex Clasica 3 Hileras',
            ref: '1934-4',
            price: '$82.000',
            whatsapp: '+57 321 737 8301'
        })
        canvas.current = imaginator
        console.log("hola mundo")
    }, [])

    const handleSubmitInfo = (values) => {
        canvas.current.update(values)
    }

    const handelChangeImageMode = (state) => ()=>{
        setImageMode(state)
    }

    const handleSaveImage = (file) => {
        canvas.current.addImage(file)
    }

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                {
                    imageMode ?
                        <ImageRemover
                            onSave={handleSaveImage}
                            onCancel={handelChangeImageMode(false)} />
                        :
                        <ProductForm
                            onImageMode={handelChangeImageMode(true)}
                            onSubmit={handleSubmitInfo}
                        />
                }
            </div>
            <div className="col-md-8 col-sm-12">
                <canvas id="c"></canvas>
            </div>
        </div>
    )
}

export default FormGroup

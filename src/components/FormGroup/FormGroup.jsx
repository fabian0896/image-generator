import React, { useEffect, useRef, useState } from 'react'
import {useFormik} from 'formik'

import useImaginator from '../../hooks/useImaginator'
import { 
    ImageRemover, 
    ProductForm, 
    Canvas, 
    Imaginator 
} from '../../components'

const FormGroup = () => {
    const canvas = useRef()
    const [imageMode, setImageMode] = useState(false)
    const [productValues, setProductValues] = useState(null)

    
    const formik = useFormik({
        initialValues: {
            productName: '',
            ref: '',
            price: 0,
            phone: '',
            color: null,
            category: ''
        },
        onSubmit: (values) => {
            console.log('Aqui hay que actualizar los datos del canvas', values)
            setProductValues(values)
        }
    })


    const handleSubmitInfo = (values) => {
        canvas.current.update(values)
    }

    const handelChangeImageMode = (state) => ()=>{
        setImageMode(state)
    }

    const handleSaveImage = (file) => {
        //imaginator.addImage(file)
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
                            formik={formik}
                            onImageMode={handelChangeImageMode(true)}
                            onSubmit={handleSubmitInfo}
                        />
                }
            </div>
            <div className="col-md-8 col-sm-12">
                {
                    !!productValues?
                    <Imaginator initValues={productValues}/>
                    :
                    <Canvas/>
                }
            </div>
        </div>
    )
}

export default FormGroup

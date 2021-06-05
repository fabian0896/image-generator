import React, { useState } from 'react'
import {useFormik} from 'formik'

import { 
    ImageRemover, 
    ProductForm, 
    Canvas, 
    Imaginator 
} from '../../components'


const FormGroup = () => {
    const [imageMode, setImageMode] = useState(false)
    const [file, setFile] = useState(null)
    const [productValues, setProductValues] = useState(null)

    
    const formik = useFormik({
        initialValues: {
            productName: '',
            ref: '',
            price: {
                value: '',
                currency: 'COP'
            },
            phone: '',
            color: null,
            category: '',
            selltype: 'wholesale'
        },
        onSubmit: (values) => {
            console.log('Aqui hay que actualizar los datos del canvas', values)
            setProductValues(values)
        }
    })

    const handelChangeImageMode = (state) => ()=>{
        setImageMode(state)
    }

    const handleSaveImage = (file) => {
        //imaginator.addImage(file)
        console.log(file)
        setFile(file)
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
                        />
                }
            </div>
            <div className="col-md-8 col-sm-12">
                {
                    !!productValues?
                    <Imaginator
                        image={file} 
                        initValues={productValues}/>
                    :
                    <Canvas/>
                }
            </div>
        </div>
    )
}

export default FormGroup

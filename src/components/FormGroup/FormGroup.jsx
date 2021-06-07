import React, { useState } from 'react'
import {useFormik} from 'formik'

import { 
    ImageRemover, 
    ProductForm, 
    Canvas, 
    Imaginator,
    Acordion,
    AcordionItem
} from '../../components'


const FormGroup = () => {
    const [imageMode, setImageMode] = useState(false)
    const [file, setFile] = useState(null)
    const [productValues, setProductValues] = useState(null)

    const [collapse, setCollapse] = useState(0)

    
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
        setFile(file)
    }

    const handleChangeAcordion = (value)=>{
        setCollapse(value)
    }   

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <Acordion onChange={handleChangeAcordion} value={collapse} id="formAcordion">
                    <AcordionItem title="Informacion De La Prenda">
                        <ProductForm
                                formik={formik}
                                onImageMode={handelChangeImageMode(true)} />
                    </AcordionItem>
                    <AcordionItem title="Gestion De Fotos">
                        <ImageRemover
                                onSave={handleSaveImage}
                                onCancel={handelChangeImageMode(false)} />
                    </AcordionItem>            
                </Acordion>
                <button onClick={()=>setCollapse(1)} > Pestaña 2</button>
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

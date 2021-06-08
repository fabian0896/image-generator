import React, { useState } from 'react'

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

    const [collapse, setCollapse] = useState(1)

    
    const handelChangeImageMode = (state) => ()=>{
        setImageMode(state)
    }

    const handleSaveImage = (file) => {
        setFile(file)
    }

    const handleChangeAcordion = (value)=>{
        setCollapse(value)
    }   

    const handleSubmit = (values) => {
        console.log('Aqui hay que actualizar los datos del canvas', values)
        setProductValues(values)
        setCollapse(2)
    }

    const handleSaveImage = () => {
        
    }

    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <Acordion onChange={handleChangeAcordion} value={collapse} id="formAcordion">
                    <AcordionItem title="Informacion De La Prenda">
                        <ProductForm onSubmit={handleSubmit}/>
                    </AcordionItem>
                    <AcordionItem title="Gestion De Fotos">
                        <ImageRemover
                                onSave={handleSaveImage}
                                onCancel={handelChangeImageMode(false)} />
                    </AcordionItem>            
                </Acordion>
                <button onClick={handleSaveImage} className="btn btn-primary form-control mt-4">Guardar</button>
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

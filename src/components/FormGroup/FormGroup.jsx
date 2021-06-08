import React, { useEffect, useState } from 'react'

import {
    ImageRemover,
    ProductForm,
    Canvas,
    Imaginator,
    Acordion,
    AcordionItem,
} from '../../components'
import imaginatorContext from '../../context/ImaginatorContext'



const FormGroup = () => {
    const [productValues, setProductValues] = useState(null)
    const [collapse, setCollapse] = useState(1)
    const [imaginator, setImaginator] = useState(null)

    const handleSaveImage = (file) => {
        imaginator.addImage(file)
        console.log(imaginator.imageCount)
        if(imaginator.imageCount === 2){
            console.log("hay que cerrar el editor de imagenes")
        }
    }

    const handleChangeAcordion = (value) => {
        setCollapse(value)
    }

    const handleSubmit = (values) => {
        console.log('Aqui hay que actualizar los datos del canvas', values)
        setProductValues(values) 
        setCollapse(2)   
    }

    const handleSaveData = () => {
        console.log("hay que generar la imagen")
        imaginator.saveImage()
    }
    
    return (
        <div className="row">
            <div className="col-md-4 col-sm-12">
                <Acordion onChange={handleChangeAcordion} value={collapse} id="formAcordion">
                    <AcordionItem title="Informacion De La Prenda">
                        <ProductForm onSubmit={handleSubmit} />
                    </AcordionItem>
                    <AcordionItem disabled={!imaginator} title="Gestion De Fotos">
                        <ImageRemover onSave={handleSaveImage} />
                    </AcordionItem>
                </Acordion>
                <button disabled={!imaginator} onClick={handleSaveData} className="btn btn-primary form-control mt-4">Guardar</button>
            </div>
            <div className="col-md-8 col-sm-12">
                {
                    !!productValues ?
                        <Imaginator
                            reference={(ref)=>setImaginator(ref)}
                            initValues={productValues} />
                        :
                        <Canvas />
                }
            </div>
        </div>
    )
}

export default FormGroup

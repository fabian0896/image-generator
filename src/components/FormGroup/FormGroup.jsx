import React, { useEffect, useState, useRef } from 'react'

import {
    ImageRemover,
    ProductForm,
    Imaginator,
    Acordion,
    AcordionItem,
    Loader
} from '../../components'
import { useImaginator } from '../../hooks'
import { useHistory } from 'react-router-dom'



const FormGroup = ({editData, mode}) => {
    const [productValues, setProductValues] = useState(null)
    const [collapse, setCollapse] = useState(1)
    const ref =  useRef(null)

    const history = useHistory()

    const imaginator = useImaginator(ref)

    const handleSaveImage = async (file) => {
        await imaginator.addImage(file)
        if(imaginator.imageCount === 1){
            console.log("hay que cerrar el editor de imagenes")
            setCollapse(0)
        }
    }

    const handleChangeAcordion = (value) => {
        setCollapse(value)
    }

    const handleSubmit = async (values) => {
        console.log('Aqui hay que actualizar los datos del canvas', values)
        setProductValues(values) 
        await imaginator.render(values)
        setCollapse(2)   
    }

    const handleSaveData = async () => {
        console.log("hay que generar la imagen")

        if(mode === 'edit'){
            if(editData){
                await imaginator.updateImage(productValues, {download: false})
            }else{
                await imaginator.saveImage(productValues, {download: false})
            }
        }else{
            await imaginator.saveImage(productValues, {download: false})
        }

        navigateToCollection(productValues)
    }

    useEffect(()=>{
        if(!editData) return
        setProductValues(editData)
        const jsonObject = JSON.parse(editData.editable)
        imaginator.loadFromJSON(jsonObject)
    }, [editData])


    const handleChangeHooks = (hooks) => {
        imaginator.addHooksImage(hooks)
    }

    const handleDeleteIamge = (image) => {
        imaginator.removeImage(image)
    }
    
   
    const navigateToCollection = (values) => {
        const urlParams = new URLSearchParams()
        urlParams.append('category', values.category)
        urlParams.append('currency', values.price.currency)
        urlParams.append('selltype', values.selltype)
        history.push({
            pathname: '/collection',
            search: urlParams.toString()
        })
    }

    return (
        <React.Fragment>
            <Loader loading={imaginator.loading}/>
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <Acordion onChange={handleChangeAcordion} value={collapse} id="formAcordion">
                        <AcordionItem title="Informacion De La Prenda">
                            <ProductForm editData={editData} onSubmit={handleSubmit} />
                        </AcordionItem>
                        <AcordionItem disabled={!imaginator} title="Gestion De Fotos">
                            <ImageRemover onSave={handleSaveImage} />
                        </AcordionItem>
                    </Acordion>
                    <button disabled={!productValues || (imaginator.imageCount < 1)} onClick={handleSaveData} className="btn btn-primary form-control mt-4">{mode === 'edit'? 'Editar' : 'Guardar'}</button>
                </div>
                <div className="col-md-8 col-sm-12">
                    <Imaginator
                        onDeleteImage={handleDeleteIamge}
                        selection={imaginator.selection} 
                        onChangeHooks={handleChangeHooks} 
                        ref={ref}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FormGroup

import React, { useEffect, useState } from 'react'
import {
    ImageCard, 
    ButtonSelect, 
    CollectionHeader, 
    Modal, 
    FilterSelectionForm,
    ProgressBar
} from '../components'
import {useLocation} from 'react-router-dom'
import { useConfig, useQueries } from '../hooks'
import imageDownloader from '../services/imageDownloader'

const Collection = () => {
    const [queryValues, setQueryValues] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [loadState, setLoadState] = useState(null)
    
    const config = useConfig()
    const [images, getImages, loading, next, hasMore] = useQueries()
    const location = useLocation()

    useEffect(()=>{
        const searchData = new URLSearchParams(location.search)   
        const values = {}
        for(let value of searchData.keys()){
            values[value] = searchData.get(value)
        }
        setQueryValues(values)
        getImages(values)
    },[location])

    
    const handleOpenModal = ( ) => {
        setModalOpen(true)
    }

    const handleCloseModal = ( ) => {
        setModalOpen(false)
    }


    const handleDownloadSubmit = async (values) => {
        console.log(values.options)
        await imageDownloader.generateZip(values.filters, values.options, progress => {
            console.log(progress)
            setLoadState(progress)
        })
        setModalOpen(false)
        setLoadState(null)
        console.log("Se crearon las imagenes ")
    }

    return (
        <div>
            <Modal
                title="Descarga De Imagenes"
                onCancel={handleCloseModal} 
                open={modalOpen}>
                    {
                        loadState?
                        <ProgressBar progress={loadState} />
                        :
                        <FilterSelectionForm onSubmit={handleDownloadSubmit}/>
                    }
            </Modal>
            <div className="row">
               <div className="col-3">
                    <ButtonSelect
                        selection={queryValues}
                        name="category"
                        title="Linea"
                        values={config.categories}/>
                    <ButtonSelect
                        selection={queryValues}
                        name="price.currency"
                        title="Moneda" 
                        values={config.currencies}/>
                    <ButtonSelect
                        selection={queryValues} 
                        name="selltype"
                        title="Modo de Venta"
                        values={config.selltypes}/>       
                </div>         
               <div className="col-9">
                   <CollectionHeader onClick={handleOpenModal}/>
                    <div className="row">
                        
                                {
                                    images.map(image =>(
                                        <div key={image.id} className="col-4">
                                            <ImageCard  data={image}/>
                                        </div>
                                    ))   
                                }
                    </div>
                    {
                        hasMore &&
                        <button disabled={loading} onClick={next} className="btn btn-link form-control">Cargar Más...</button>
                    }
               </div>
            </div>
        </div>
    )
}

export default Collection

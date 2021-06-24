import React, { useEffect, useState } from 'react'
import {
    ImageCard, 
    ButtonSelect, 
    CollectionHeader, 
    Modal, 
    FilterSelectionForm,
    ProgressBar,
    Paginator,
    Loader
} from '../components'
import {useLocation, useHistory} from 'react-router-dom'
import { useConfig, useQueries } from '../hooks'
import imageDownloader from '../services/imageDownloader'

const Collection = () => {
    const [queryValues, setQueryValues] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loadState, setLoadState] = useState(null)
    
    const config = useConfig()
    const location = useLocation()
    const history = useHistory()

    const {
        data: images, 
        getData: getImages,
        pages,
        setPage,
        activePage,
        loading
    } = useQueries()


    useEffect(()=>{
        const searchData = new URLSearchParams(location.search)   
        const filters = {
            category: searchData.getAll('category') || [],
            selltype: searchData.getAll('selltype') || [],
            currency: searchData.getAll('currency') || []
        }
        const query = decodeURI(searchData.get('search') || '')
        setQueryValues(filters)
        getImages(query, filters)
    },[location])



    
    const handleOpenModal = ( ) => {
        setModalOpen(true)
    }

    const handleCloseModal = ( ) => {
        setModalOpen(false)
    }

    const handleDownloadSubmit = async (values) => {
        console.log(values)

        await imageDownloader.generateZip(values.filters, values.options, progress => {
            setLoadState(progress)
        })
        setModalOpen(false)
        setLoadState(null)
        console.log("Se crearon las imagenes ")
    }

    const handleSearch = (value) => {
        const searchData = new URLSearchParams(location.search) 
        const searchValue = encodeURI(value)
        searchData.set('search', searchValue)
        history.push({
            pathname: '/collection',
            search: searchData.toString()
        })
    }

    return (
        <div>
           <Loader loading={loading}/>
            <Modal
                title="Descarga De Imagenes"
                onCancel={handleCloseModal} 
                open={modalOpen}>
                    {
                        loadState?
                        <ProgressBar progress={loadState} />
                        :
                        <FilterSelectionForm
                            initValues={queryValues} 
                            onSubmit={handleDownloadSubmit}/>
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
                        name="currency"
                        title="Moneda" 
                        values={config.currencies}/>
                    <ButtonSelect
                        selection={queryValues} 
                        name="selltype"
                        title="Modo de Venta"
                        values={config.selltypes}/>       
                </div>         
               <div className="col-9">
                   <CollectionHeader onSearch={handleSearch} onClick={handleOpenModal}/>
                    <div className="row">
                        
                                {
                                    images.map(image =>(
                                        <div key={image.id} className="col-4">
                                            <ImageCard  data={image}/>
                                        </div>
                                    ))   
                                }
                    </div>
                    <Paginator
                        active={activePage} 
                        onChange={setPage} 
                        pages={pages}/>
               </div>
            </div>
        </div>
    )
}

export default Collection

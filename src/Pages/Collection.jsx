import React, { useEffect, useState } from 'react'
import {ImageCard, ButtonSelect} from '../components'
import {useLocation} from 'react-router-dom'
import { useConfig, useQueries } from '../hooks'
import InfiniteScroll from 'react-infinite-scroll-component'

const Collection = () => {
    const config = useConfig()
    const [images, getImages, loading, next, hasMore] = useQueries()
    const [queryValues, setQueryValues] = useState({})
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

    const handleNext = () => {
        console.log("next function")
        next()
    }
        
    return (
        <div>
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

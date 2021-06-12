import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'
import {ImageCard, Folder} from '../components'
import {useLocation} from 'react-router-dom'

const Collection = () => {
    const [images, setImages] = useState([])
    const location = useLocation()
    useEffect(()=>{
        const fetchFunction = async () => {
            const data = await firebaseService.getAllImages()
            setImages(data)
        }
        fetchFunction()
    },[])

    useEffect(()=>{
        console.log(location.search)
    },[location])

    return (
        <div>
            <div className="row">
               <div className="col-3">
                    <h4>Categoria</h4>
                    <hr />
                    <Folder 
                        name="Linea Clásica"/>
                    <Folder 
                        name="Linea Deportiva"/>
                    <Folder 
                        name="Linea Bioenergetica"/>
                    <Folder 
                        name="Lina Metalizada"/>
                    <Folder 
                        name="Edicion Especial"/>
                    <Folder 
                        name="Linea Powernet"/>
                    <Folder 
                        name="Otros"/>
                    
                    <h4 className="mt-4">Moneda</h4>
                    <hr />
                    <Folder name="Pesos"/>
                    <Folder name="Dolares"/>

                    <h4 className="mt-4">Forma de Venta</h4>
                    <hr />
                    <Folder name="Por Mayor"/>
                    <Folder name="Publico"/>
               </div>
               <div className="col-9">
                   <h1 className="mb-4">Linea Clásica por mayor (PESOS)</h1>
                   <div className="row">
                        {
                            images.map(image =>(
                                <div key={image.id} className="col-4">
                                    <ImageCard  data={image}/>
                                </div>
                            ))   
                        }
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Collection

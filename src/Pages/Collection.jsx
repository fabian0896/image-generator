import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'
import {ImageCard} from '../components'

const Collection = () => {
    const [images, setImages] = useState([])
    useEffect(()=>{
        const fetchFunction = async () => {
            const data = await firebaseService.getAllImages()
            setImages(data)
        }
        fetchFunction()
    },[])

    return (
        <div>
            <h1>Todas las Images</h1>
            <hr className="my-4"/>
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
    )
}

export default Collection

import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'

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
                        <div className="col-4 mb-3" key={image.id}>
                            <img className="shadow bg-body rounded" width="100%" src={image.downloadUrl} alt={image.productName} />
                            <p className="my-1 text-center">{image.productName}</p>
                            <p className="my-1 text-center text-mute">{image.ref}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Collection

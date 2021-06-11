import React from 'react'
import {useParams} from 'react-router-dom'
import { ImageShow } from '../components'
import { useGetProduct } from '../hooks'

const Image = () => {
    const {id} = useParams()
    const [data, loading] = useGetProduct(id)
    return (
        <div>
            {
                loading?
                <p>Cargando...</p>
                :
                <ImageShow data={data}/>
            }
        </div>
    )
}


export default Image

import React, { useEffect, useState } from 'react'
import {FormGroup, Loader} from '../components'
import { useParams, useLocation} from 'react-router-dom'
import { useGetProduct } from '../hooks'


const Creator = () => {
    const { id } = useParams()
    const location = useLocation()
    const [data, loading] = useGetProduct(id)
    const [mode, setMode] = useState(null)
    useEffect(()=>{
        const selectedMode = new URLSearchParams(location.search).get('mode')
        setMode(selectedMode)
    },[location])

    return (
        <div>
            {
                loading?
                <Loader loading={true}/>
                :
                <FormGroup mode={mode} editData={data}/>
            }
        </div>
    )
}

export default Creator

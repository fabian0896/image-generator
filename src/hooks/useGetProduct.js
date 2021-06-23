import {useState, useEffect} from 'react'
import firebaseService from "../services/firebaseService"

const useGetProduct = (id) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    
    useEffect(()=>{
        if(!id){
            setLoading(false)
            return
        }
        const fetchData = async () => {
            const fetchData = await firebaseService.getImageById(id)
            setData(fetchData)
            setLoading(false)
        }
        fetchData()
    }, [])

    const deleteFunc = async () => {
        setLoading(true)
        await firebaseService.deleteImage({id})
        setLoading(false)
    }

    return [data, loading, deleteFunc]
}

export default useGetProduct
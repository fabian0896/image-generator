import {useState} from 'react'
import firebaseService from '../services/firebaseService'


const useQueries = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const getData = async (filters) => {
        setLoading(true)
        const res = await firebaseService.getImagesByFiltes(filters)
        setData(res)
        setLoading(false)
    }

    return [data, getData, loading]

}


export default useQueries
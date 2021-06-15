import {useRef, useState} from 'react'
import firebaseService from '../services/firebaseService'


const useQueries = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [next, setNext] = useState(null)
    const [isNext, setIsNext] = useState(true)
    
    const getData = async (filters) => {
        setLoading(true)
        const {data: res, next: nextFunc} = await firebaseService.getImagesByFiltes(filters)
        setData(res)
        setLoading(false)
        setNext(v => nextFunc)
        setIsNext(true)
        return nextFunc
    }

    const handleNext = async () => {
        if(!next) return setIsNext(false)
        setLoading(true)
        const {data: res, next: nextFunc} = await next()
        setData(v => [...v, ...res])
        setNext(v => nextFunc)
        setLoading(false)
    }

    return [data, getData, loading, handleNext, isNext]

}


export default useQueries
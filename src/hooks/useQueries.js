import {useEffect, useRef, useState} from 'react'
import queryService from '../services/queryService'

const useQueries = () =>{
    const [data, setData] = useState([])
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const [filterObject, setFilterObject] = useState({})
    const [queryText, setQueryText] = useState('')
    
    const getData =  (query="", filters) => {
        setFilterObject(filters)
        setActivePage(1) 
        setQueryText(query)  
    }

   const handlePage = (value) => {
       if(value === 'next'){
            setActivePage(v =>  v + 1)
        }else if(value === 'back'){
            setActivePage(v =>  v - 1)
       }else{
           setActivePage(value)
       }
   } 

    useEffect(()=>{
        const asyncFunc = async () => {
            setLoading(true)
            const res = await queryService.search(queryText, filterObject, (activePage - 1))
            setPages(res.nbPages)
            setData(res.hits)
            console.log(res)
            setLoading(false)
        }
        asyncFunc()
    }, [activePage, filterObject, queryText])

    return {
        data,
        getData,
        loading,
        pages,
        setPage: handlePage,
        activePage
    }

}


export default useQueries
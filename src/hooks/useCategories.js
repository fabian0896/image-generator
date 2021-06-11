import { useEffect, useState } from "react";
import firebaseService from "../services/firebaseService";

const useCategories = () =>{
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const data = await firebaseService.getCategories()
            const result = []
            for(let category in data){
                result.push({
                    value: category,
                    name: data[category]
                })
            }
            setCategories(result)
        }
        fetchData()
    }, [])

    return categories
}

export default useCategories
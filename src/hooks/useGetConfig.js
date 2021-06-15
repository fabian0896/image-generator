import { useEffect, useState } from 'react';
import configData from '../config.json'

const useGetConfig = () => {
    const [config, setConfig] = useState(null)

    useEffect(()=>{
        setConfig(configData)
    }, [])

    return {
        config
    }

}


export default useGetConfig
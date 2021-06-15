import { useContext } from 'react'
import {configContext} from '../context/configContext'

const useConfig = () => {
    const data = useContext(configContext)
    return data
}

export default useConfig
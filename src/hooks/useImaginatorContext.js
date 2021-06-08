import {useContext} from 'react'
import ImaginatorContext from '../context/ImaginatorContext'


const useImaginatorContext = () => {
    return useContext(ImaginatorContext)
}

export default useImaginatorContext
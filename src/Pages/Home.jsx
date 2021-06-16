import React, {useState} from 'react'
import { Modal } from '../components'
import { useGetProduct } from '../hooks'
import imageDownloader from '../services/imageDownloader'

const ID = "41AwZdwRJVMYlSOzvSQg"

const Home = () => {
    const [data] = useGetProduct(ID)
    const [open, setOpen] = useState(false)

    const handleClick = async () => {
        imageDownloader.generateZip()
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        console.log("se va a cerrar el modal")
        setOpen(false)
    }

    const handleTest = () => {
        imageDownloader.orderByFolder()
    }

    return (
        <div>
            <Modal
                onCancel={handleCloseModal} 
                open={open}/>
            <button onClick={handleClick} className="btn btn-primary">Generar</button>
            <button onClick={handleOpenModal} className="btn btn-warning mx-4">Abrir Modal</button>
            <button onClick={handleTest} className="btn btn-danger mx-4">Prueba de filtrado</button>
        </div>
    )
}

export default Home

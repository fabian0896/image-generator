import React, {useState} from 'react'
import { Modal } from '../components'
import { useGetProduct } from '../hooks'
import prepareDownload from '../services/prepareDownload'

const ID = "41AwZdwRJVMYlSOzvSQg"

const Home = () => {
    const [data] = useGetProduct(ID)
    const [open, setOpen] = useState(false)

    const handleClick = async () => {
        const images = await prepareDownload.generateBlobps(data, { whatsapp: false })
        console.log(images)
        const url = URL.createObjectURL(images.large)
        const img = new Image()
        img.src = url
        img.width = 500
        document.body.appendChild(img)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                onCancel={handleCloseModal} 
                open={open}/>
            <button onClick={handleClick} className="btn btn-primary">Generar</button>
            <button onClick={handleOpenModal} className="btn btn-warning mx-4">Abrir Modal</button>
        </div>
    )
}

export default Home

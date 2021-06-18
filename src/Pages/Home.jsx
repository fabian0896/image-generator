import React, {useState} from 'react'
import { Modal } from '../components'
import { useGetProduct } from '../hooks'
import algoliaService from '../services/algoliaService'
import firebaseService from '../services/firebaseService'
import imageDownloader from '../services/imageDownloader'

const ID = "41AwZdwRJVMYlSOzvSQg"

const Home = () => {
    const [data] = useGetProduct(ID)
    const [open, setOpen] = useState(false)
    const [testData, setTestData] = useState([])

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

    const handleTest =  async () => {
        console.log("test button")
        const res = await algoliaService.search("", {
            category: ['clasica', 'deportiva'],
            currency: ['USD', 'COP'],
            selltype: ['retail']
        })
        console.log(res)
        setTestData(res)
    }

    return (
        <div>
            <Modal
                onCancel={handleCloseModal} 
                open={open}/>
            <button onClick={handleClick} className="btn btn-primary">Generar</button>
            <button onClick={handleOpenModal} className="btn btn-warning mx-4">Abrir Modal</button>
            <button onClick={handleTest} className="btn btn-danger mx-4">Prueba de Algolia</button>
            {
                testData.map((res)=>(
                    <div key={res.objectID} style={{border: '1px solid black', marginBottom: 10}}>
                        <p>{res.productName}</p>
                        <p>{res.ref}</p>
                        <p>{res.category}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Home

import React, {useState} from 'react'
import { Loader } from '../components'
import algoliaService from '../services/algoliaService'
import imageDownloader from '../services/imageDownloader'



const Home = () => {
    const [testData, setTestData] = useState([])
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        imageDownloader.generateZip()
    }


    const handleLoading = () => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 5000)
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
            <Loader loading={loading}/>
            <button onClick={handleClick} className="btn btn-primary">Generar</button>
            <button onClick={handleLoading} className="btn btn-warning mx-4">Abrir Modal</button>
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

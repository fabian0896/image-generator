import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'
import productsDbservices from '../services/productsDbservices'
import numeral from 'numeral'
import imageDownloader from '../services/imageDownloader'


const asyncFunc = async () => {
    const data = await firebaseService.getAllImages()
    console.log(data)
    await productsDbservices.generateNewImages(data)
    return 
}


const Home = () => {


    const handleClick = async () => {
        await asyncFunc()  
    }

    const handleTest = () => {
        console.log("Crear folders...")
        const res = imageDownloader.orderByFolder()
        console.log(res)
    }

    return (
        <div>
           <button onClick={handleClick} className="btn btn-primary">Generar prendas</button>
        </div>
    )
}

export default Home

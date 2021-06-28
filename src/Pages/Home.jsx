import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'
import productsDbservices from '../services/productsDbservices'
import numeral from 'numeral'


const asyncFunc = async () => {
    const data = await firebaseService.getAllImages()  
    await productsDbservices.generateNewImages(data)
    return 
}


const Home = () => {


    const handleClick = async () => {
        return
        await asyncFunc()  
    }

    return (
        <div>
           <button onClick={handleClick} className="btn btn-primary">Generar prendas</button>
        </div>
    )
}

export default Home

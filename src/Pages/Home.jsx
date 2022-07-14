import React, { useEffect, useState } from 'react'
import firebaseService from '../services/firebaseService'
import productsDbservices from '../services/productsDbservices'
import numeral from 'numeral'
import imageDownloader from '../services/imageDownloader'

/* 
COMO ACTUALIZAR IMAGENES DE FORMA PROGRAMATICA.

1. optener todas los valores de las prendas desde base de datos y basados en la lista generada.
2. empezar a iterar sobre cada una de estas prendas haciendo lo sigiente:
    2.1 cargar el canvaz con el editable de la prenda (imaginator.loadFromJSON(jsonObject))
    2.2 renderizar el canvas con los nuevos valores  (imaginator.render(values))
    2.3 llamar a la funcion de update (imaginator.updateImage(productValues, {download: false}));

NOTA: hay que agregar un cavas en el home para poder usar el hook de useImaginator
*/


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

    return (
        <div>
           <button onClick={handleClick} className="btn btn-primary">Generar prendas</button>
        </div>
    )
}

export default Home

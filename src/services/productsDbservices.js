import data from '../product-info.json'
import uploadImage from './uploadImage'
import firebaseService from './firebaseService'
import {Imaginator} from './imaginator'
import numeral from 'numeral'

const getProductByRef = (ref) => {
    const product = data.find(v => v.reference.toLowerCase() === ref.toLowerCase())
    return product
}



const generateNewImages = async (listImagesData) =>{ 

    const canvas = document.createElement('canvas')

    const imaginator = new Imaginator(canvas, {
        width:1140,
        height: 840,
        visibele: false
    })

    let count = 0
    for(let imageData of listImagesData){

        const newPrice = getProductByRef(imageData.ref)?.cop

        if(!newPrice){
            console.log(`LA REFERENCIA ${imageData.ref} DE NOMBRE ${imageData.productName} NO SE ENCUENTRA EN LA BASE DE DATOS`)
            continue
        }


        const values = {
            ...imageData,
            selltype: 'wholesale',
            price:{
                value: numeral(newPrice).format('$0,0'),
                currency: "COP"
            }
        }

        await imaginator.loadFromJSON(imageData.editable)
        await imaginator.render({
            ...values,
            background: values.color,
        })

       
        //convierto el canvas a JSOn para poder editarlo en el futuro
        const editJSON = await imaginator.toJSON(async (image)=>{
            return await uploadImage(image)
        })
        
        //Consigo el url de la imagen del canvas
        const images = await imaginator.toDataURL({blobMode: true})
         
        // hay que subir la imagen a firestore para descargas en el futuro
        
        const imagesUrls = {}
        for(let size in images){
            const downloadUrl = await uploadImage(images[size] ,'priceImage')
            imagesUrls[size] = downloadUrl
        }
    
        //agrego todos los datos a la Base de Datos
        await firebaseService.addImageToDB({
            ...values,
            images: imagesUrls,
            editable: JSON.stringify(editJSON)
        })
        count += 1
        console.log(`${count} / ${listImagesData.length}`)
    }
    console.log("Se crearon todas las nuevas prendas!")
    return
}



export default {
    getProductByRef,
    generateNewImages
}
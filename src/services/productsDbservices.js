import data from '../product-info.json'
import uploadImage from './uploadImage'
import firebaseService from './firebaseService'
import {Imaginator} from './imaginator'
import numeral from 'numeral'
import { delay } from 'lodash'


function capitalize(str) {
    if(typeof str !== 'string') return undefined
    const result = []
    for(let word of str.split(' ')){
        const lower = word.toLowerCase();
        const res = word.charAt(0).toUpperCase() + lower.slice(1);
        result.push(res)
    }
    return result.join(' ')
}



const getProductByRef = (ref) => {
    const product = data.find(v => v.reference.toLowerCase() === ref.toLowerCase())
    return product
}

const slow = () => new Promise(res => {
    setTimeout(()=>{
        res()
    }, 200)
})

const generateNewImages = async (listImagesData) =>{ 

    const canvas = document.createElement('canvas')

    const imaginator = new Imaginator(canvas, {
        width:1140,
        height: 840,
        visibele: false
    })
    
    let count = 0
    const idsArray = []
    for(let imageData of listImagesData){
        await slow()
        const product = getProductByRef(imageData.ref)
        const newPrice = product?.usd
        const name_en = capitalize(product?.name_en)
        

        if(!newPrice){
            console.log(`LA REFERENCIA ${imageData.ref} DE NOMBRE ${imageData.productName} NO SE ENCUENTRA EN LA BASE DE DATOS`)
            continue
        }


        const values = {
            ...imageData,
            productName: name_en? name_en : imageData.productName,
            selltype: 'wholesale',
            price:{
                value: numeral(newPrice).format('$0[.]0[0]'),
                currency: "USD"
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
        idsArray.push(imageData.id)
        console.log(`${count} / ${listImagesData.length}`)
    }
    console.log("Se crearon todas las nuevas prendas!")
    console.log(idsArray)
    return
}



export default {
    getProductByRef,
    generateNewImages
}
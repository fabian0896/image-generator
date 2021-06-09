import { useRef, useEffect, useState } from 'react'
import parsePhoneNumber from 'libphonenumber-js'
import { Imaginator } from '../services/imaginator'
import uploadImage from '../services/uploadImage'
import firebaseService from '../services/firebaseService'


const useImaginator = (canvasId) => {
    const canvas = useRef(null)
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState(null)
    const [imageCount, setImageCount] = useState(0)

    useEffect(() => {
        const canvasRef = typeof canvasId === 'object' ? canvasId.current : canvasId
        const imaginator = new Imaginator(canvasRef, 1140, 840)
        imaginator.setDefaultValues({whatsapp: '+57 318 2657709'})
        canvas.current = imaginator
        setLoading(false)

        imaginator.onSelected((object => {
            setSelection(object)
        }))

    }, [])


    const addImage = async (file) => {
        setLoading(true)   
        await canvas.current.addImage(file)
        const imgCount = canvas.current.imageCount()
        console.log(imgCount)
        setImageCount(imgCount)
        setLoading(false)
    }

    const render = async (values) => {
        setLoading(true)
        await canvas.current.render({
            ...values,
            price: values.price,
            whatsapp: values.phone && parsePhoneNumber(values.phone, 'CO').formatInternational(),
            background: values.color
        })
        setLoading(false)
    }

    const addHooksImage = async (hooks=0) => {
        await canvas.current.addVarianHook(hooks)
    }


    const removeImage = (image) => {
        canvas.current.removeElement(image)
    }

    const toJSON = async () => {
        setLoading(true)
        await canvas.current.toJSON(async (image)=>{
            return await uploadImage(image)
        })
        setLoading(false)
    }


    const saveImage = async (values) => {
        //convierto el canvas a JSOn para poder editarlo en el futuro
        const editJSON = await canvas.current.toJSON(async (image)=>{
            return await uploadImage(image)
        })
        
        //Consigo el url de la imagen del canvas
        const imageUrl = canvas.current.toDataURL()
         
        // hay que subir la imagen a firestore para descargas en el futuro
        const blob = await fetch(imageUrl).then(res => res.blob())
        const downloadUrl = await uploadImage(blob ,'priceImage')
    
        //agrego todos los datos a la Base de Datos
        await firebaseService.addImageToDB({
            ...values,
            downloadUrl,
            editable: JSON.stringify(editJSON)
        })


        //Genero la descarga de la imagen desde local
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = canvas.current.productName
        link.click()

        console.log("se guardaron los datos en la base de datos")
        //aqui toca pasar los datos a firebase
    }


    return {
        loading,
        addImage,
        render,
        addHooksImage,
        selection,
        removeImage,
        toJSON,
        saveImage,
        imageCount
    }
}


export default useImaginator
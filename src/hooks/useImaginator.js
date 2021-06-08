import { useRef, useEffect, useState } from 'react'
import parsePhoneNumber from 'libphonenumber-js'
import { Imaginator } from '../services/imaginator'
import uploadImage from '../services/uploadImage'



const useImaginator = (canvasId) => {
    const canvas = useRef(null)
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState(null)

    useEffect(() => {
        const canvasRef = typeof canvasId === 'object' ? canvasId.current : canvasId
        const imaginator = new Imaginator(canvasRef, 1140, 840)
        imaginator.setDefaultValues({whatsapp: '+57 321 737 8301'})
        canvas.current = imaginator
        setLoading(false)

        imaginator.onSelected((object => {
            setSelection(object)
        }))

    }, [])


    const addImage = async (file) => {
        setLoading(true)   
        await canvas.current.addImage(file)
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


    const saveImage = () => {
        const imageUrl = canvas.current.toDataURL()
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = true
        link.click()
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
        saveImage
    }
}


export default useImaginator
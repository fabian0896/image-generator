import {Imaginator} from './imaginator'
import firebaseService from './firebaseService'
import JSZip, { folder } from 'jszip'
import {saveAs} from 'file-saver'
import TEXT_DATA from '../textDaja.json'


const generateBlobps = async (data, options) => {
    const canvas = document.createElement('canvas')

    const zip = new JSZip()

    const imaginator = new Imaginator(canvas, {
        width:1140,
        height: 840,
        visibele: false
    })

    const images = await imaginator.renderAndGenerateBlob(data.editable, {
        ...data,
        background: data.color,
        ...options
    })


    zip.file('test.jpeg', images.large, {base64: true})

    zip.generateAsync({type: 'blob'}).then(data => {
        console.log("el zip es: ", data)
        saveAs(data, 'Prueba.zip')
    })
    
    return images
}



const folderOrder = ['selltype', 'price.currency', 'category']

const orderByFolder = () => {
    const presentsFiltersValues = []
    for(let folder of folderOrder){
        presentsFiltersValues.push(findObjects(folder))
    }
    
    for(let values of presentsFiltersValues){

    }
}

const findObjects = (propName) => {
    return TEXT_DATA.reduce((props, data) =>{   
        const currentValue = accessPorp(data, propName)
        const isInProps = props.indexOf(currentValue) !== -1
        if(isInProps) return props
        return [...props, currentValue]
    }, [])
}

const accessPorp = (obj, route) =>{
    let result = obj
    const routeArray = route.trim().split('.')
    routeArray.forEach(path => {
        result = result[path] || {}
    })
    return result
}





const generateZip = async (filter, options, ) => {
    const images = await firebaseService.getAllImagesByFilter({
        'category': 'clasica', 
    })

    console.log(images)

    const canvas = document.createElement('canvas')

    const zip = new JSZip()
    const folder = zip.folder('Linea Clásica')

    const imaginator = new Imaginator(canvas, {
        width:1140,
        height: 840,
        visibele: false
    })

    let count = 0
    for(let image of images){
        const renderedImage = await imaginator.renderAndGenerateBlob(image.editable, {
            ...image,
            background: image.color,
        })
        folder.file(`${image.productName}.jpeg`, renderedImage.large, {base64: true})
    }

    const zipContent = await zip.generateAsync({type: 'blob'})

    saveAs(zipContent, 'Prndas.zip')
    
}


export default {
    generateBlobps,
    generateZip,
    orderByFolder
}
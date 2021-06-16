import {Imaginator} from './imaginator'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'


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


export default {
    generateBlobps
}
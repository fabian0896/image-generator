import firebase from 'firebase/app'
import 'firebase/firestore'

import uploadImage from './uploadImage'

const writeImageInDb = async (data)=>{

    const [frontImage, backImage] = await Promise.all([
        uploadImage(data.images.frontImage),
        uploadImage(data.images.backImage)
    ])
   
    const doc = firebase.firestore().collection('images').doc()

    const dataObj = {
        ...data,
        id: doc.id,
        images:{
            frontImage,
            backImage
        }
    }

    await doc.set(dataObj)

    return dataObj

}

export default writeImageInDb
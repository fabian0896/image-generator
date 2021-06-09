import firebase from 'firebase/app'
import 'firebase/firestore'

const addImageToDB = async (values) => {
    const db = firebase.firestore().collection('images')
    const doc = db.doc()

    const id = doc.id

    await doc.set({
        ...values,
        id
    })

    return id
}



export default {
    addImageToDB
}
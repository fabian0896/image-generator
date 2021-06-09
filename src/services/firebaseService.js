import firebase from 'firebase/app'
import 'firebase/firestore'

const IMAGES = 'images'

const addImageToDB = async (values) => {
    const db = firebase.firestore().collection(IMAGES)
    const doc = db.doc()

    const id = doc.id

    await doc.set({
        ...values,
        id
    })

    return id
}

const getAllImages = async () => {
    const db = firebase.firestore().collection(IMAGES)
    const snap = await db.get()
    const res = snap.docs.map(snap => snap.data())
    return res
}


export default {
    addImageToDB,
    getAllImages
}
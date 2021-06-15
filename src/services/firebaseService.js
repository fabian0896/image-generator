import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

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

const updateImage = async (values) => {
    const db = firebase.firestore().collection(IMAGES)
    const doc = db.doc(values.id)
    await doc.update(values)
    return updateImage
}

const getAllImages = async () => {
    const db = firebase.firestore().collection(IMAGES)
    const snap = await db.get()
    const res = snap.docs.map(snap => snap.data())
    return res
}


const getImageById = async (id) => {
    const db = firebase.firestore().collection(IMAGES)
    const doc = db.doc(id)
    const snap = await doc.get()
    return snap.data()
}

const updateStorageImage = async (blob, url) => {
    const storageRef = firebase.storage().refFromURL(url)
    await storageRef.delete()
    const snap = await storageRef.put(blob)
    return snap.ref.getDownloadURL()
}
const deleteStorageImage = async (url) => {
    const storageRef = firebase.storage().refFromURL(url)
    await storageRef.delete()
    return
} 

const getCategories = async () => {
    const db = firebase.firestore().collection('config')
    const doc = db.doc('categories')
    const snap = await doc.get()
    return snap.data()
}


const getImagesByFiltes = async (filters) => {
    const db = firebase.firestore().collection(IMAGES)
    let query = db
    Object.keys(filters).forEach(filterName => {
        query = query.where(filterName, '==', filters[filterName])
    })
    query = query.limit(20)
    const snap = await query.get()
    const results =  snap.docs.map(doc => doc.data())
    return results
}

export default {
    addImageToDB,
    getAllImages,
    getImageById,
    updateImage,
    updateStorageImage,
    getCategories,
    deleteStorageImage,
    getImagesByFiltes
}
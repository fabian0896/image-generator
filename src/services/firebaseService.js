import firebase from 'firebase/app'
import 'firebase/firestore'

export const addImageToDB = async () => {
    const db = firebase.firestore().collection('images')
}
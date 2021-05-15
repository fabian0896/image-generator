import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

const uploadImage = (file) => {
    return new Promise((resolve, reject)=>{
        const storageRef = firebase.storage().ref()
        const imageRef = storageRef.child(`images/${file.name}`)
        const metadata = {
            contentType: file.type,
          };
        imageRef.put(file, metadata).then(snapShot =>{
            const url = snapShot.ref.getDownloadURL()
            resolve(url)
        }).catch(reject)  
    })
}   


export default uploadImage
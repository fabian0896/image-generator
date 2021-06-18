import algoliaService from "./algoliaService"
import firebaseService from "./firebaseService"


const getData = async (query ,filters, limit=true) => {
    const res = await algoliaService.search('', filters, limit)
    const promises = res.map(v => firebaseService.getImageById(v.objectID))
    const result = await Promise.all(promises)
    return result
}


export default {
    getData
}
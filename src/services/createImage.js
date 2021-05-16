import jsreport from 'jsreport-browser-client-dist'
import numeral from 'numeral'


const JsUser = "sveltyfajas@gmail.com"
const JsPassword = "Fabian08*"
const API = 'https://svelty-fajas.jsreportonline.net/'
const SHORT_ID = "Kw6w-VbE05"

const createImage = async (payload) => {
    jsreport.headers['Authorization'] = "Basic " + btoa(`${JsUser}:${JsPassword}`)
    jsreport.serverUrl = API
    
    const res = await jsreport.renderAsync({
        "template":{
            "shortid": SHORT_ID
        },
        "data": {
            ...payload,
            price: numeral(payload.price).format('$0,0') 
        }
    })
    res.download(payload.name)
    const blob = res.toBlob()
    return blob
}

export default createImage
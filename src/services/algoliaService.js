import algoliasearch from "algoliasearch";


const client = algoliasearch('3J3NJDQ9UX', 'af0c96444245b64033badda50d8cb14a')


const index = client.initIndex('images')


const addRecord = async (values) => {
    const { productName, category, price, selltype, id, ref } = values
    await index.saveObject({
        objectID: id,
        productName,
        category,
        selltype,
        currency: price.currency,
        ref
    })
    return
}

const updateRecord = async (values) => {
    const { productName, category, price, selltype, id, ref } = values
    await index.partialUpdateObject({
        objectID: id,
        productName,
        category,
        selltype,
        currency: price.currency,
        ref
    })
    return
}


const testSearch = async () => {
    const result = await index.search("faja", {
        facetFilters: [
            ['category:clasica', 'category:metalizada']
        ]
    })
    return result.hits
}


const search = async (query="", filters, limit=true) => {
    const filterArray = Object.keys(filters).reduce((arr, filter) => {
        if(!filters[filter].length) return arr
        const filterValues = filters[filter].map(v => `${filter}:${v}`)
        return [...arr, filterValues]
    },[])

    const searchObject = {
        facetFilters: filterArray
    }

    if(!limit){
        searchObject['hitsPerPage'] = 1000 
    }

    const result = await index.search(query, searchObject)
    if(limit) return result
    return result.hits
}


export default {
    addRecord,
    updateRecord,
    testSearch,
    search
}
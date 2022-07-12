import algoliasearch from "algoliasearch";

const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID;

const client = algoliasearch(APPLICATION_ID, API_KEY);

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

const deleteRecord = async ({id}) => {
    console.log("Se va a eliminar ", id, " de Algolia")
    await index.deleteObject(id)
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
        facetFilters: [
            ['category:clasica', 'category:metalizada']
        ]
    })
    return result.hits
}


const search = async (query="", filters={}, limit=true, page=0) => {
    const filterArray = Object.keys(filters).reduce((arr, filter) => {
        if(!filters[filter].length) return arr
        const filterValues = filters[filter].map(v => `${filter}:${v}`)
        return [...arr, filterValues]
    },[])

    const searchObject = {
        facetFilters: filterArray,
        page
    }

    if(!limit){
        searchObject['hitsPerPage'] = 1000 
    }

    const result = await index.search(query, searchObject)
    if (limit) return result
    return result.hits
}

const algoliaObject = {
    addRecord,
    updateRecord,
    testSearch,
    search,
    deleteRecord
};

export default algoliaObject;
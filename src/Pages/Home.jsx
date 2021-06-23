import React, {useState} from 'react'
import AsyncCreatableSearch from 'react-select/async-creatable'
import _ from 'lodash'
import algoliaService from '../services/algoliaService'



const _loadSuggestions = (query, callback) => {
    algoliaService.search(query).then(res=>{
        console.log(res)
        const format = res.hits.map(v => ({
            label: v.productName,
            value: v.objectID
        }))
        console.log(format)
        return callback(format)
    })
}

const loadSugestion = _.debounce(_loadSuggestions, 400)


const Home = () => {
    return (
        <div>
           <p>Hola esto es el home! Para hacer las pruebas.</p>
           <AsyncCreatableSearch
                isClearable
                onChange={obj => console.log("la seleccion es: ", obj)}
                isOptionSelected={(object, objects)=> objects.find(v => v.id === object.id)}
                onCreateOption={input => console.log("el input es: ", input)}
                createOptionPosition="first" 
                cacheOptions
                defaultOptions
                loadOptions={loadSugestion}
           />
        </div>
    )
}

export default Home

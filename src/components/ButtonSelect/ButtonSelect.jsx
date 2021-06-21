import React, { useEffect } from 'react'
import { Folder } from '../../components'
import {  useHistory, useLocation} from 'react-router-dom'
import { useFormik } from 'formik'
import _ from 'lodash'

const ButtonSelect = ({values, title, name, selection }) => {
    const history = useHistory()
    const location = useLocation()

    const formik = useFormik({
        initialValues:{
            [name]: [] 
        }
    })


    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        urlParams.delete(name)
        formik.values[name].forEach(value => {
            urlParams.append(name, value)
        })
        history.push({
            pathname: '/collection',
            search: urlParams.toString()
        })
    }, [formik.values])

    
    useEffect(()=>{
        if(!selection) return
        const isEqual = _.isEqual(selection[name], formik.values[name])
        if(!isEqual && selection[name]){
            formik.setFieldValue(name, selection[name])
        }
    },[selection])

    return (
        <div className="mb-3">
            <h4>{title}</h4>
            <hr />
            {
                values.map(value=>(
                    <Folder
                        values={formik.values[name]}
                        onChange={formik.handleChange}
                        icon={value.iconClass}
                        target={name}
                        categoryValue={value.value}
                        key={value.value}
                        name={value.name} />

                ))
            }
        </div>
    )
}

export default ButtonSelect

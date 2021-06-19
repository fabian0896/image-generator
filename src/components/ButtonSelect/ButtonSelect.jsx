import React, {useState} from 'react'
import { Folder } from '../../components'
import {  useHistory, useLocation} from 'react-router-dom'
import { useFormik } from 'formik'

const ButtonSelect = ({values, title, name, selection}) => {
    const history = useHistory()
    const location = useLocation()

    const formik = useFormik({
        initialValues:{
            values: []
        }
    })
 
    const handleChange = (val) => {
        addQueryParams(val)
    }

    const addQueryParams = (value) => {
        const urlParams = new URLSearchParams(location.search)
        urlParams.set(name, value)
        history.push({
            pathname: '/collection',
            search: urlParams.toString()
        })
    }

    return (
        <div className="mb-3">
            <h4>{title}</h4>
            <hr />
            {
                values.map(value=>(
                    <Folder
                        selection={selection[name]}
                        onChange={handleChange}
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

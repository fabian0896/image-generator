import React from 'react'
import './CollectionHeader.css'
import { useFormik } from 'formik'

const CollectionHeader = ({ onClick, onSearch }) => {

    const formik = useFormik({
        initialValues:{
            search: ""
        },
        onSubmit : (values) => {
            onSearch && onSearch(values.search)
        }
    })

    const handleClick = () => {
        onClick && onClick()
    }

    return (
        <div className="CollectionHeader mb-4">
            <form onSubmit={formik.handleSubmit}>
            <div className="input-group me-4">
                <input
                    name="search"
                    value={formik.values.search} 
                    onChange={formik.handleChange} 
                    type="text" 
                    className="form-control" 
                    placeholder="Busqueda..." />
                <button className="btn btn-outline-secondary" type="submit" >Buscar</button>
            </div>

            </form>
            <button onClick={handleClick} className="CollectionHeader-download-btn">
                <i className="fas fa-download"></i>
            </button>
        </div>
    )
}

export default CollectionHeader

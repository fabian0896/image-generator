import React from 'react'
import { useFormik } from 'formik'
import numeral from 'numeral'
import parsePhoneNumber from 'libphonenumber-js'

import ColorSelect from './ColorSelect'

import './ProductForm.css'

const ProductForm = (props) => {

    const formik = useFormik({
        initialValues: {
            productName: '',
            ref: '',
            price: 0,
            phone: '+57',
            color: null
        },
        onSubmit: (values) => {
            console.log('Aqui hay que actualizar los datos del canvas', values)
            props.onSubmit && props.onSubmit({
                ...values,
                price: numeral(values.price).format('$0,0'),
                phone: parsePhoneNumber(values.phone, 'CO').format('INTERNATIONAL')
            })
        }
    })



    const handleChangePrice = e => {
        const value = e.target.value
        const name = e.target.name
        const priceNumber = numeral(value).value()
        formik.setFieldValue(name, priceNumber)
    }

    const handleSetImageMode = () => {
        props.onImageMode && props.onImageMode()
    }

    const handleChangeColor = (color) => {
        formik.setFieldValue('color', color)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">Nombre De La Prenda</label>
                <input
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    name="productName"
                    type="text"
                    className="form-control"
                    id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="ref" className="form-label">Referencia</label>
                <input
                    value={formik.values.ref}
                    onChange={formik.handleChange}
                    name="ref"
                    type="text"
                    className="form-control"
                    id="ref" />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Valor</label>
                <input
                    value={numeral(formik.values.price).format("$0,0")}
                    onChange={handleChangePrice}
                    name="price"
                    type="text"
                    className="form-control"
                    id="price" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select id="category" className="form-select  mb-3">
                    <option selected>selecciona una categoria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>


            <div className="mb-3">
                <label htmlFor="price" className="form-label">WhatsApp</label>
                <input
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    name="phone"
                    type="tel"
                    className="form-control"
                    id="phone" />
            </div>

            <ColorSelect 
                onChange={handleChangeColor}
                value={formik.values.color}
            />

            <div className="row mt-4">
                <div className="col">
                    <button type="submit" className="btn btn-primary form-control">Guardar Info</button>
                </div>
                <div className="col">
                    <button onClick={handleSetImageMode} type="button" className="btn btn-dark form-control">Agregar Imagenes</button>
                </div>
            </div>


        </form>
    )
}

export default ProductForm

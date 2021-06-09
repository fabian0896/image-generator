import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik'

import ColorSelect from './ColorSelect'

import './ProductForm.css'

const colors = [
    {
        value: '#292926',
        metalic: false
    },
    {
        value: '#E0CAB3',
        metalic: false
    },
    {
        value: '#CD4D8D',
        metalic: false
    },
    {
        value: '#148ED5',
        metalic: false
    },
    {
        value: '#FF9291',
        metalic: false
    },
    {
        value: '#9550AF',
        metalic: false
    },
    {
        value: '#C44545',
        metalic: false
    },
    {
        value: '#3760BF',
        metalic: false
    },
    {
        value: '#157FB8',
        metalic: false
    },
    {
        value: '#BA3867',
        metalic: false
    },
    {
        value: '#EFDF41',
        metalic: false
    },
    {
        value: '#79437F',
        metalic: true
    },
    {
        value: '#A82752',
        metalic: true
    },
    {
        value: '#18378A',
        metalic: true
    },
    {
        value: '#335167',
        metalic: true
    },
    {
        value: '#292926',
        metalic: true
    },
    {
        value: '#E0CAB3',
        metalic: true
    },
]


const ProductForm = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues: {
            productName: '',
            ref: '',
            price: {
                value: '',
                currency: 'COP'
            },
            phone: '',
            color: null,
            category: '',
            selltype: 'wholesale'
        },
        onSubmit: (values) => {
            onSubmit && onSubmit(values)
        }
    })


    const handleChangeColor = useCallback((color) => {
        formik.setFieldValue('color', color)
    }, [])


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
                <label htmlFor="price" className="form-label">Precio</label>
                <div className="ProductForm-price-container">
                    <div className="price">
                        <NumberFormat
                            value={formik.values.price.value}
                            onChange={formik.handleChange}
                            name="price.value"
                            type="text"
                            className="form-control"
                            id="price"
                            thousandSeparator={true}
                            prefix={'$'} />
                    </div>
                    <div className="currency">
                        <div className="btn-group" role="group">
                            <input
                                checked={formik.values.price.currency === 'COP'}
                                onChange={formik.handleChange}
                                value="COP"
                                type="radio"
                                className="btn-check"
                                name="price.currency"
                                id="COP" />
                            <label className="btn btn-outline-primary" htmlFor="COP">COP</label>

                            <input
                                checked={formik.values.price.currency === 'USD'}
                                onChange={formik.handleChange}
                                value="USD"
                                type="radio"
                                className="btn-check"
                                name="price.currency"
                                id="USD" />
                            <label className="btn btn-outline-primary" htmlFor="USD">USD</label>
                        </div>
                    </div>
                </div>
            </div>


            <div className="ProductForm-sell-type-container mb-3">
                <div className="btn-group" role="group">
                    <input
                        checked={formik.values.selltype === "wholesale"}
                        value="wholesale" onChange={formik.handleChange}
                        type="radio" className="btn-check"
                        name="selltype"
                        id="wholesale" />
                    <label className="btn btn-outline-primary" htmlFor="wholesale">Por Mayor</label>

                    <input
                        checked={formik.values.selltype === "retail"}

                        value="retail" onChange={formik.handleChange}
                        type="radio" className="btn-check"
                        name="selltype"
                        id="retail"
                        autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="retail">Publico</label>
                </div>
            </div>


            <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select value={formik.values.category} onChange={formik.handleChange} name="category" id="category" className="form-select  mb-3">
                    <option defaultValue>selecciona una categoria</option>
                    <option value="clasica">Clásica</option>
                    <option value="deportiva">Deportiva</option>
                    <option value="metalizada">Metalizada</option>
                    <option value="especial">Especial</option>
                    <option value="powernet">Powernet</option>
                    <option value="bioenergetica">Bioenergetica</option>
                    <option value="other">Otra</option>
                </select>
            </div>


            {   //Si se quiere avilitar la opcion de cambiar el whatsapp hay que poner este campo
                false &&
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
            }




            <ColorSelect
                label="Color de fondo"
                colors={colors}
                onChange={handleChangeColor}
                value={formik.values.color}
            />

            <button type="submit" className="btn btn-primary form-control mt-3">Guardar Info</button>

        </form>
    )
}

export default ProductForm

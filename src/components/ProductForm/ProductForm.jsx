import React, { useCallback, useEffect } from 'react'
import NumberFormat from 'react-number-format';
import { useFormik } from 'formik'


import ColorSelect from './ColorSelect'

import './ProductForm.css'
import { useConfig } from '../../hooks';

import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    productName: Yup.string().required(),
    ref: Yup.string().required(),
    price: Yup.object().shape({
        value: Yup.string().required(),
        currency: Yup.string().required()
    }),
    phone: Yup.string(),
    color: Yup.object().shape({
        metalic: Yup.boolean().required(),
        value: Yup.string().required()
    }),
    category: Yup.string().required(),
    selltype: Yup.string().required()
})


const ProductForm = ({ onSubmit, editData }) => {

    const config = useConfig()

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
        validationSchema,
        onSubmit: (values) => {
            onSubmit && onSubmit(values)
        }
    })

    useEffect(()=>{
        if(!editData) return
        console.log(editData)
        formik.setValues(editData)
        formik.setTouched('color')

    }, [editData])

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
                <div className="input-group">
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
            </div>


            <div className="ProductForm-sell-type-container mb-3">
                <div className="btn-group" role="group">
                    {
                        config.selltypes.map((selltype)=>(
                            <React.Fragment key={selltype.value}>
                                <input
                                    checked={formik.values.selltype === selltype.value}
                                    value={selltype.value} onChange={formik.handleChange}
                                    type="radio" 
                                    className="btn-check"
                                    name="selltype"
                                    id={selltype.value} />
                                <label className="btn btn-outline-primary" htmlFor={selltype.value}>{selltype.name}</label>
                            </React.Fragment>
                        ))
                    }
                </div>
                {/* <div className="btn-group" role="group">
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
                </div> */}
            </div>


            <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select value={formik.values.category} onChange={formik.handleChange} name="category" id="category" className="form-select  mb-3">
                    <option defaultValue>selecciona una categoria</option>
                    {
                        config.categories.map((category, index)=>(
                            <option key={index} value={category.value}>{category.name}</option>
                        ))
                    }
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
                colors={config.colors}
                onChange={handleChangeColor}
                value={formik.values.color}
            />

            <button disabled={!formik.isValid} type="submit" className="btn btn-primary form-control mt-3">Guardar Info</button>

        </form>
    )
}

export default ProductForm

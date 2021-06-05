import React, { useCallback } from 'react'
import numeral from 'numeral'


import ColorSelect from './ColorSelect'

import './ProductForm.css'

const colors = [
    {
        value: 'red',
        metalic: false
    },
    {
        value: 'blue',
        metalic: false
    },
    {
        value: 'purple',
        metalic: false
    },
    {
        value: 'yellow',
        metalic: true
    },
    {
        value: 'orange',
        metalic: false
    },
    {
        value: '#563D7C',
        metalic: true
    },
    {
        value: 'grey',
        metalic: true
    },
]

const ProductForm = ({ formik, ...props }) => {

    const handleChangePrice = e => {
        const value = e.target.value
        const name = e.target.name
        const priceNumber = numeral(value).value()
        formik.setFieldValue(name, priceNumber)
    }

    const handleSetImageMode = () => {
        props.onImageMode && props.onImageMode()
    }

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
                <select value={formik.values.category} onChange={formik.handleChange} name="category" id="category" className="form-select  mb-3">
                    <option defaultValue>selecciona una categoria</option>
                    <option value="1">Clásica</option>
                    <option value="2">Deportiva</option>
                    <option value="3">Especial</option>
                    <option value="4">Powernet</option>
                    <option value="5">Bioenergetica</option>
                    <option value="6">Otra</option>
                </select>
            </div>

            {
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

            <div className="row">
                <div className="col-7">
                    <div className="btn-group" role="group">
                        <input type="radio" className="btn-check" name="btnradio" id="mayor" autocomplete="off" checked />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Por Mayor</label>

                        <input type="radio" className="btn-check" name="btnradio" id="detal" autocomplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Por Detal</label>
                    </div>
                </div>
                <div className="col-5">
                    <div className="btn-group" role="group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">COP</label>

                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">USD</label>
                    </div>
                </div>
            </div>


            <ColorSelect
                colors={colors}
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

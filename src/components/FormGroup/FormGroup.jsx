import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import numeral from 'numeral'

import { writeImageInDb, createImage } from '../../services'
import Imaginator from '../../services/imaginator'
import logoSVG from '../../SVG/logo-w.svg'
import dividerSVG from '../../SVG/divider.svg'
import whatsappSVG from '../../SVG/whatsapp.svg'

const FormGroup = () => {
    const canvas = useRef()
    useEffect(() => {
        const imaginator = new Imaginator('c', 1140, 840)
        imaginator.init({
            productName: 'Faja Latex Clasica 3 Hileras',
            ref: '1934-4',
            price: '$82.000',
            whatsapp: '+57 321 737 8301',
            dividerSVG: dividerSVG,
            logoSVG: logoSVG,
            whatsappSVG: whatsappSVG
        })
        canvas.current = imaginator
        console.log("hola mundo")
    }, [])

    const formik = useFormik({
        initialValues: {
            productName: '',
            ref: '',
            price: 0,
        },
        onSubmit: (values, actions) => {
            canvas.current.update({
                ...values,
                price: numeral(values.price).format('$0,0')
            })
        }
    })

    const handleChangeImage = (e) => {
        const file = e.target.files[0]
        canvas.current.addImage(file)
    }

    const handleChangePrice = e => {
        const value = e.target.value
        const name = e.target.name
        const priceNumber = numeral(value).value()
        formik.setFieldValue(name, priceNumber)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row">

                <div className="col-4">
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
                    <button type="submit" className="btn btn-primary mt-3">Generar Imagen</button>
                </div>
                <div className="col-8">
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Añadir Imagen</label>
                        <input onChange={handleChangeImage} className="form-control" accept="image/*" type="file" id="formFile" />
                    </div>
                    <canvas id="c"></canvas>
                </div>


            </div>
        </form>
    )
}

export default FormGroup

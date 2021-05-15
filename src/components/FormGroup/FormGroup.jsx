import React from 'react'
import {useFormik} from 'formik'
import numeral from 'numeral'

import {writeImageInDb} from '../../services'

const FormGroup = () => {

    const formik = useFormik({
        initialValues:{
            name: '',
            ref: '',
            price: 0,
            images:{
                frontImage: null,
                backImage: null
            }
        },
        onSubmit: (values, actions) => {
            console.log(values)
            writeImageInDb(values).then(data => {
                console.log(data)
            })
        }
    })

    const handleChangeImage = (e) => {
        const file = e.target.files[0]
        const name = e.target.name
        formik.setFieldValue(name, file)
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
                        <label htmlFor="name" className="form-label">Nombre De La Prenda</label>
                        <input
                            value={formik.values.name} 
                            onChange={formik.handleChange}
                            name="name"
                            type="text" 
                            className="form-control" 
                            id="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ref" className="form-label">Referencia</label>
                        <input
                            value={formik.values.ref} 
                            onChange={formik.handleChange}
                            name="ref"
                            type="text" 
                            className="form-control" 
                            id="ref"/>
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
                <div className="col-4">
                    <div className="mb-3">
                        <label htmlFor="frontImage" className="form-label">Imagen Frontal</label>
                        <input
                            accept="image/png, image/gif, image/jpeg" 
                            name="images.frontImage" 
                            onChange={handleChangeImage} 
                            className="form-control" 
                            type="file" 
                            id="frontImage"/>
                    </div>
                    {
                        formik.values.images.frontImage &&
                        <img 
                            src={URL.createObjectURL(formik.values.images.frontImage)}
                            alt={formik.values.name} 
                            className="rounded img-thumbnail img-fluid" />
                    }
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <label htmlFor="backImage" className="form-label">Imagen Trasera</label>
                        <input
                            onChange={handleChangeImage}
                            accept="image/png, image/gif, image/jpeg" 
                            name="images.backImage" 
                            className="form-control" 
                            type="file"  
                            id="backImage"/>
                    </div>
                    {
                        formik.values.images.backImage &&
                        <img 
                            src={URL.createObjectURL(formik.values.images.backImage)}
                            alt={formik.values.name} 
                            className="rounded img-thumbnail img-fluid" />
                    }
                </div>
            </div>
        </form>
    )
}

export default FormGroup

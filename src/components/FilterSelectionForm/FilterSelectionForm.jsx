import React, { useEffect } from 'react'
import { useConfig } from '../../hooks'
import { useFormik } from 'formik'

const FilterSelectionForm = ({ initValues, closeModal, onSubmit }) => {
    const config = useConfig()

    const formik = useFormik({
        initialValues: {
            filters: {
                category: [],
                selltype: [],
                currency: [],
            },
            options: {
                withWhatsapp: true,
                whatsapp: config.whatsapp,
                price: true
            }
        },
        onSubmit: async (values, actions) => {
            onSubmit && await onSubmit(values)
            actions.resetForm()
        }
    })

    useEffect(() => {
        initValues && formik.setFieldValue('filters', initValues)
    }, [initValues])

    const handleClose = () => {
        formik.resetForm()
        closeModal()
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-6 mb-3">
                    <h5>Lineas:</h5>
                    {
                        config.categories.map(category => (
                            <div key={category.value} className="form-check form-switch">
                                <input
                                    checked={formik.values.filters.category.includes(category.value)}
                                    onChange={formik.handleChange}
                                    name="filters.category"
                                    value={category.value}
                                    className="form-check-input"
                                    type="checkbox"
                                    id={category.value} />
                                <label className="form-check-label" htmlFor={category.value}>{category.name}</label>
                            </div>
                        ))
                    }

                </div>

                <div className="col-6">
                    <h5>Modo de Venta:</h5>
                    {
                        config.selltypes.map(selltype => (
                            <div key={selltype.value} className="form-check form-switch">
                                <input
                                    checked={formik.values.filters.selltype.includes(selltype.value)}
                                    name="filters.selltype"
                                    value={selltype.value}
                                    onChange={formik.handleChange}
                                    className="form-check-input"
                                    type="checkbox"
                                    id={selltype.value} />
                                <label className="form-check-label" htmlFor={selltype.value}>{selltype.name}</label>
                            </div>
                        ))
                    }

                    <h5 className="mt-4">Moneda:</h5>
                    {
                        config.currencies.map(currency => (
                            <div key={currency.value} className="form-check form-switch">
                                <input
                                    checked={formik.values.filters.currency.includes(currency.value)}
                                    name="filters.currency"
                                    value={currency.value}
                                    onChange={formik.handleChange}
                                    className="form-check-input"
                                    type="checkbox"
                                    id={currency.value} />
                                <label className="form-check-label" htmlFor={currency.value}>{currency.name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="my-3"></div>
            <h5>Oras configuraciones</h5>
            <div className="form-check form-switch mb-2">
                <input
                    checked={formik.values.options.withWhatsapp}
                    name="options.withWhatsapp"
                    onChange={formik.handleChange}
                    className="form-check-input"
                    type="checkbox"
                    id="withPhone" />
                <label className="form-check-label" htmlFor="withPhone">Con WhatsApp</label>
            </div>
            {
                formik.values.options.withWhatsapp &&
                <input
                    name="options.whatsapp"
                    onChange={formik.handleChange} 
                    value={formik.values.options.whatsapp} 
                    className="form-control mb-3"/>
            }
            <div className="form-check form-switch mb-3">
                <input
                    checked={formik.values.options.price}
                    onChange={formik.handleChange}
                    name="options.price"
                    className="form-check-input"
                    type="checkbox"
                    id="withPrice" />
                <label className="form-check-label" htmlFor="withPrice">Con Precio</label>
            </div>
            <div className="modal-footer mt-3">           
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary">Descargar</button>
            </div>
        </form>
    )
}

export default FilterSelectionForm

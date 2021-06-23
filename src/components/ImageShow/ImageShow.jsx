import React from 'react'
import './ImageShow.css'
import clsx from 'clsx'
import {useHistory} from 'react-router-dom'

const currency = {
    COP: 'Pesos',
    USD: 'Dolares'
}

const selltype = {
    retail: {
        name: 'Precio al publico',
        icon: 'fas fa-user-friends'
    },
    wholesale: {
        name: 'Por Mayor',
        icon: 'fas fa-building'
    }
}


const ImageShow = ({ data, onDelete }) => {

    const history = useHistory()

    const handleClone = () => {
        const urlParams = new URLSearchParams()
        urlParams.append('mode', 'clone')
        history.push({
            pathname: '/creator/' + data.id,
            search: urlParams.toString()
        })
    }
    
    const handleEdit = () => {
        const urlParams = new URLSearchParams()
        urlParams.append('mode', 'edit')
        history.push({
            pathname: '/creator/' + data.id,
            search: urlParams.toString()
        })
    }


    const handleDownload = () => {
        const a = document.createElement('a')
        a.href = data.images.large
        a.download = data.productName
        a.click()
    }

    const handleDelete  = () => {
        onDelete && onDelete()
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="">
                    <h2>Linea {data.category}</h2>

                    <div  className="ImageShow-selltype-container">
                        <i className={clsx(selltype[data.selltype].icon, "ImageShow-selltype-icon")}></i>
                        <h5 className="ImageShow-selltype-name">{selltype[data.selltype].name}</h5>
                    </div>

                    <div className="ImageShow-currency-container">
                        <i className="fas fa-money-bill ImageShow-currency-icon"></i>
                        <h5 className="ImageShow-currency-name">{currency[data.price.currency]} ({data.price.currency})</h5>
                    </div>
                </div>

                <hr className="my-4"/>

                {/* <button onClick={handleDownload} className="btn btn-primary form-control mb-3">
                    <div className="pr-2">
                        <i className="fas fa-download pr-2"></i>
                    </div>
                    Descargar
                </button> */}
                <button onClick={handleEdit} className="btn btn-primary form-control mb-3">
                    <div className="pr-2">
                        <i className="fas fa-edit pr-2"></i>
                    </div>
                    Editar
                </button>
                <button onClick={handleClone} className="btn btn-primary form-control mb-3">
                    <div className="pr-2">
                        <i className="fas fa-clone pr-2"></i>
                    </div>
                    Clonar
                </button>
                <button onClick={handleDelete} className="btn btn-danger form-control mb-3">
                    <div className="pr-2">
                        <i className="fas fa-trash-alt pr-2"></i>
                    </div>
                    Eliminar
                </button>
            </div>
            <div className="col-md-9">
                <div className="ImageShow-image-container">
                    <div onClick={handleDownload} className="ImageShow-download-button">
                        <i className="fas fa-download"></i>
                    </div>
                </div>
                <img className="img-fluid ImageShow-image" src={data.images.medium} alt={data.productName} />
            </div>
        </div>
    )
}

export default ImageShow

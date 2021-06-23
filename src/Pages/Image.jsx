import React, { useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { ImageShow, Modal } from '../components'
import { useGetProduct } from '../hooks'

const Image = () => {
    const [openModal, setOpenModal] = useState(false)
    const {id} = useParams()
    const [data, loading, deleteFunc] = useGetProduct(id)
    
    const history = useHistory()

    const handleDelete = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const ModalContent = (props)=>{
        return(
            <p>Estsas seguro que deseas eliminar la prenda: <strong>{data?.productName}</strong></p>
        )
    }

    const handleConfirm = async () => {
        console.log("se va a borrar la imagen!")
        await deleteFunc()
        history.push('/collection')
    }

    return (
        <div>
            <Modal
                onConfirm={handleConfirm}
                onCancel={handleCloseModal}
                title="Borrar Imagen?" 
                open={openModal}
                render={<ModalContent/>}
                />
                
            {
                loading?
                <p>Cargando...</p>
                :
                <ImageShow
                    onDelete={handleDelete} 
                    data={data}/>
            }
        </div>
    )
}


export default Image

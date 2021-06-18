import React, { useEffect, useRef } from 'react'

const Modal = ({open, onCancel, title, children}) => {
    const modal = useRef(null)
    const closeBtn = useRef(null)
    useEffect(()=>{
        if(open){
            const btn = document.createElement('button')
            btn.setAttribute('data-bs-target', '#modal-component')
            btn.setAttribute('data-bs-toggle', 'modal')
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn)
        }else{
            closeBtn.current.click()
        }
    }, [open])


    useEffect(()=>{
        modal.current.addEventListener('hide.bs.modal', ()=>{
            onCancel && onCancel()
        })
    }, [])

    const handleClose = () => {
        onCancel && onCancel()
    }

    return (
            <div ref={modal} id="modal-component" className="modal fade" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{title}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {React.cloneElement(children, {
                                closeModal: handleClose
                            }) }
                        </div>  
                        <button style={{display: 'none'}} ref={closeBtn} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
    )
}

export default Modal

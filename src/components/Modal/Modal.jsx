import React, { useEffect, useRef } from 'react'

const Modal = ({open, onCancel}) => {
    const modal = useRef(null)
    useEffect(()=>{
        if(open){
            const btn = document.createElement('button')
            btn.setAttribute('data-bs-target', '#modal-component')
            btn.setAttribute('data-bs-toggle', 'modal')
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn)
            console.log("Click ")
        }
    }, [open])

    useEffect(()=>{
        modal.current.addEventListener('hidden.bs.modal', ()=>{
            onCancel && onCancel()
        })
    }, [])

    return (
            <div ref={modal} id="modal-component" className="modal fade" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Modal

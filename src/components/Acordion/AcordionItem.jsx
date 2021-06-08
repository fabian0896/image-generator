import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

const AcordionItem = ({title, children, active, index, parentId, value, onClick, disabled}) => {
    const ref = useRef(null)
    useEffect(()=>{
        if(value === index){
            ref.current.click()
        }
    },[value])

    const handleClick = () => {
        onClick(index)
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button disabled={disabled} onClick={handleClick}  ref={ref} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls="collapseOne">
                    {title}
                </button>
            </h2>
            <div id={`collapse-${index}`} className={clsx("accordion-collapse collapse", {show: active})} aria-labelledby="headingOne" data-bs-parent={`#${parentId}`} >
                <div className="accordion-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AcordionItem

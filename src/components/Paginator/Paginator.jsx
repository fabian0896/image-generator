import React from 'react'
import './Paginator.css'
import clsx from 'clsx'

const Paginator = ({pages, onChange, active}) => {
    return (
        <div className="Paginator">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button onClick={()=> onChange('back')} className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {
                        Array(pages).fill(0).map((_, index)=>(
                            <li key={index} className={clsx("page-item",{active: active === (index + 1)})}><button onClick={()=>onChange(index + 1)} className="page-link">{index + 1}</button></li>
                        ))
                    }
                    <li className="page-item">
                        <button onClick={()=> onChange('next')} className="page-link" href="#" aria-label="Next">
                            <span>&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Paginator

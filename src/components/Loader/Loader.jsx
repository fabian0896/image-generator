import React from 'react'
import './Loader.css'

const Loader = ({loading}) => {

    return (
        <React.Fragment>
            {
                loading &&
                <div className="Loader">
                    <div style={{width: '3rem', height: '3rem'}} className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Loader

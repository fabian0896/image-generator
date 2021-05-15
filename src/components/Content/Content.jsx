import React from 'react'

const Content = ({children}) => {
    return (
        <div className="container mt-3">
            <div className="row">
                {children}
            </div>
        </div>
    )
}

export default Content

import React from 'react'

const ImaginatorProvider = ({children}) => {

    return (
        <React.Fragment>
            {
                children.map(child => React.cloneElement(child,{
                    test: 'Hola Mundo'
                }))
            }
        </React.Fragment>
    )
}

export default ImaginatorProvider

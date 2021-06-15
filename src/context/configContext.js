import React, { Fragment, useEffect } from 'react'
import config from '../config.json'
import { useGetConfig } from '../hooks'


export const configContext = React.createContext(config)


export const ConfigProvider = ({children}) => {
   
    const { config } = useGetConfig()

    return (
        <Fragment>
            {
                config ?
                <configContext.Provider value={config}>
                    {children}
                </configContext.Provider>
                :
                <p>Cargando...</p>
            }
        </Fragment>
        
    )
}


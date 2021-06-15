import React from 'react'
import { useConfig } from '../hooks'

const Home = () => {
    const config = useConfig()
    console.log(config)
    return (
        <div>
            Hola Desde Home
        </div>
    )
}

export default Home

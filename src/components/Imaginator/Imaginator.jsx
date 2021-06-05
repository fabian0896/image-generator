import React, { useEffect, useRef, useState } from 'react'
import { useImaginator } from '../../hooks'
import clsx from 'clsx'

import './Imaginator.css'


const ButtonGroup = ({onChange}) => {

    const [selection, setSelection] = useState(0)


    const handleClick = (value) => () => {
        if (value === selection) {
            setSelection(0)
            onChange && onChange(0)
            return
        }
        setSelection(value)
        onChange && onChange(value)
    }
    return(
        <div className="Imaginator-button-container">
            <div className="btn-group mt-3" role="group" aria-label="Basic example">
                <button onClick={handleClick(1)} type="button" className={clsx("btn", { ['btn-primary']: selection === 1, ['btn-outline-primary']: !(selection === 1) })}>Cierre</button>
                <button onClick={handleClick(2)} type="button" className={clsx("btn", { ['btn-primary']: selection === 2, ['btn-outline-primary']: !(selection === 2) })}>2 Hileras</button>
                <button onClick={handleClick(3)} type="button" className={clsx("btn", { ['btn-primary']: selection === 3, ['btn-outline-primary']: !(selection === 3) })}>3 Hileras</button>
                <button onClick={handleClick(4)} type="button" className={clsx("btn", { ['btn-primary']: selection === 4, ['btn-outline-primary']: !(selection === 4) })}>4 Hileras</button>
            </div>
        </div>
    )
}



const Imaginator = ({ initValues, image }) => {
    const canvasRef = useRef(null)

    const imaginator = useImaginator(canvasRef)

    useEffect(()=>{
        imaginator.render(initValues)
    }, [initValues])

    useEffect(()=>{
        if(!image) return
        imaginator.addImage(image)
    }, [image])

    const handleChangeHooks = (hooks) => {
        imaginator.addHooksImage(hooks)
    }

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
            <ButtonGroup onChange={handleChangeHooks}/>
        </div>
    )
}

export default Imaginator

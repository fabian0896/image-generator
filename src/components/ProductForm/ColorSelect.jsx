import React, { useState, useEffect } from 'react'
import fontColorContrast from 'font-color-contrast'
import { Imaginator } from '../../services/imaginator'

const OtherColorSelect = (props) => {
    const [colorValue, setColorValue] = useState('#eeeeee')
    const [textColor, setTextColor] = useState('#555')
    const [checkbox, setCheckbox] = useState(false)
    const [originalColor, setOriginalColor] = useState('#eeeeee')

    useEffect(()=>{
        const color = originalColor
        if(checkbox){
            const metalicColor = Imaginator.getMetalicColors(color)
            const linearGradient = getMetalicGradient(metalicColor)
            setColorValue(linearGradient)
            setTextColor(metalicColor.contrastText)
        }else{
            setColorValue(color)
            setTextColor(fontColorContrast(color))
        }
    }, [originalColor, checkbox])

    const handleChangeCheckbox = e => {
        const check = e.target.checked
        setCheckbox(check)
    }

    const handleChangeColor = (e) => {
        const color = e.target.value
        setOriginalColor(color)
    }

    const getMetalicGradient = (color) => {
        const { lightColor, darkColor } = color
        const linearGradient = `linear-gradient(60deg, ${darkColor} 0%, ${lightColor} 15%, ${darkColor} 30%, ${lightColor} 41%, ${darkColor} 60%, ${lightColor} 71%, ${lightColor} 86%, ${darkColor} 100%)`
        return linearGradient
          
    }

    return (
        <div>
            <label style={{ background: colorValue, color: textColor, border: `1px dashed ${textColor}` }} htmlFor="colorSelector" className="other-color-container">
                <span>Otro color</span>
                <input
                    onChange={handleChangeColor}
                    className="color-input"
                    type="color"
                    name="colorSelector"
                    id="colorSelector" />
            </label>
            <div className="chekbox-container">
                <div className="mt-2 form-check">
                    <input checked={checkbox} onChange={handleChangeCheckbox} type="checkbox" className="form-check-input mr-5" id="exampleCheck1" />
                    <label className="form-check-label pl-5" htmlFor="exampleCheck1">Color Metalizado</label>
                </div>
            </div>
        </div>
    )
}


const ColorSelect = () => {
    return (
        <div className="mt-3">
            <label className="form-label">Color</label>
            <div className="row">
                <div className="col-2">
                    <div className="color-container mb-3 metalic" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3 selected" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-2">
                    <div className="color-container mb-3" />
                </div>
                <div className="col-12">
                    <OtherColorSelect />
                </div>
                <div className="col-12 custom-checkbox">

                </div>
            </div>
        </div>
    )
}






export default ColorSelect

import React, { useState, useEffect } from 'react'
import fontColorContrast from 'font-color-contrast'
import { Imaginator } from '../../services/imaginator'
import clsx from 'clsx'
import Color from 'color'

const OtherColorSelect = ({onChange, selected, color}) => {
    const [colorValue, setColorValue] = useState('#eeeeee')
    const [textColor, setTextColor] = useState('#555')
    const [checkbox, setCheckbox] = useState(color?.metalic || false)
    const [originalColor, setOriginalColor] = useState(color?.value || '#eeeeee' )
    const [colorObject, setColorObject] = useState({value: '#eeeeee', metalic: false})
    const [customTimeOut, setCustomTimeOut] = useState(true)

    useEffect(() => {
        const color = originalColor
        if (checkbox) {
            const metalicColor = Imaginator.getMetalicColors(color)
            const linearGradient = getMetalicGradient(metalicColor)
            setColorValue(linearGradient)
            setTextColor(metalicColor.contrastText)
        } else {
            setColorValue(color)
            setTextColor(fontColorContrast(color))
        }
        
        const newColor = {
            value: color,
            metalic: checkbox
        }
        onChange && onChange(newColor)
        setColorObject(newColor)

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
            <label 
                style={{ background: colorValue, color: textColor, border: `1px dashed ${textColor}` }} 
                htmlFor="colorSelector" 
                className={clsx("other-color-container", {selected: selected(colorObject)})}>
                <span>Seleccionar otro color</span>
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


const ColorComponent = ({ color, selected, onSelected }) => {
    const getMetalicGradient = (color) => {
        const { lightColor, darkColor } = color
        const linearGradient = `linear-gradient(60deg, ${darkColor} 0%, ${lightColor} 15%, ${darkColor} 30%, ${lightColor} 41%, ${darkColor} 60%, ${lightColor} 71%, ${lightColor} 86%, ${darkColor} 100%)`
        return linearGradient
    }

    const getBackground = () => {
        if (color.metalic) {
            const metalicColor = Imaginator.getMetalicColors(color.value)
            const linearGradient = getMetalicGradient(metalicColor)
            return linearGradient
        } 
        return color.value
    }

    const handleClick = () => {
        onSelected && onSelected(color)
    }

    return (
        <div className="col-2">
            <div
                onClick={handleClick} 
                style={{background: getBackground()}} 
                className={clsx("color-container mb-3 metalic", {selected})} />
        </div>
    )
}


const ColorSelect = ({value, onChange, colors}) => {

    const [selection, setSelection] = useState(null)

    const handleColorSelect = (color) => {
        setSelection(color)
        onChange && onChange({
            ...color,
            value: Color(color.value).hex().toString()
        })
    }
      
    const sameColor = (color1, color2) => {
        if(!color1 || !color2) return false
        const sameColor =  Color(color1.value).hex().toString() === Color(color2.value).hex().toString()
        if(!sameColor) return false
        const sameMetalic = color1.metalic === color2.metalic
        return sameMetalic
    }

    return (
        <div className="mt-3">
            <label className="form-label">Color</label>
            <div className="row">
                {
                    colors.map((color, index) => (
                        <ColorComponent
                            selected={sameColor(color, value ? value : selection)}
                            onSelected={handleColorSelect} 
                            key={index} 
                            color={color} />
                    ))
                }
                <div className="col-12">
                    <OtherColorSelect
                        color={value}
                        selected={ actualColor => sameColor(actualColor, value? value : selection)}
                        onChange={handleColorSelect} />
                </div>
            </div>
        </div>
    )
}






export default ColorSelect

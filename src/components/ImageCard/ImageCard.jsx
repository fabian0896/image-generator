import React from 'react'
import { useState } from 'react'
import './ImageCard.css'
import clsx from 'clsx'
import {useHistory} from 'react-router-dom'

const ImageCard = ({ data, selectable }) => {
    const history = useHistory()
    const [checked, setChecked] = useState(false)

    const handleClick = () => {
        if(selectable) return
        //history.push(`/creator/${data.id}`)
        history.push({
            pathname: `/image/${data.id}`
        })
    }

    return (
        <label>
            <div onClick={handleClick} className={clsx("mb-3 ImageCard-container",{selected: checked})} key={data.id}>
                {
                    selectable &&
                    <div className="ImageCard-checkbox-container">
                        <input 
                            checked={checked} 
                            onChange={e => setChecked(e.target.checked)} 
                            className="form-check-input" 
                            type="checkbox"/>
                    </div>
                }
                <img className="img-fluid" src={data.images.small} alt={data.productName} />
            </div>
        </label>
    )
}

export default ImageCard

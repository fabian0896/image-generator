import numeral from 'numeral'
import React from 'react'

const ProgressBar = ({progress}) => {
    return (
        <div style={{padding: 20}}>
            <p className="text-center">Creando imagenes {progress.count} / {progress.total}</p>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${(progress.count/progress.total)*100}%`}}>{numeral(progress.count/progress.total).format('0%')}</div>
            </div>
        </div>
    )
}

export default ProgressBar

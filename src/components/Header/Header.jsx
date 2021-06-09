import React from 'react'
import logo from '../../logo.svg'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/creator" className="nav-link" >Creator</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/collection" className="nav-link" >Collection</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header

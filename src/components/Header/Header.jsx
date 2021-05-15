import React from 'react'
import logo from '../../logo.svg'

const Header = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="logo" width="40" height="40" />
                    Angel Slim
                </a>
            </div>
        </nav>
    )
}

export default Header

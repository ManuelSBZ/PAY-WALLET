import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"


export const Navbar = () => {
    const erasejwt = () =>{
        sessionStorage.removeItem("access_token")
    }
    return (<div className="container-fluid px-0">
        <div className="row">
            <div className="col px-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Wallet</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/register/user">Signup <span class="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login/user">Login</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" onClick={e => erasejwt(e)} to="/login/user">Logout</Link>
                            </li>
                        </ul>
                    </div>
                    
                </nav>
            </div>
        </div>
    </div>)
}
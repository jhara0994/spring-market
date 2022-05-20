import React from 'react'   
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function NavBar () {
    return (
        <header>
            <h1>The Promise of Spring</h1>
            <nav>
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/art">
                        <li>Arts</li>
                    </Link>
                    <Link to="/contact">
                        <li>Contact</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
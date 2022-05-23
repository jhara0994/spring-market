import React from 'react'   
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import SignUpForm from '../SignupForm/SignupForm'
import LoginForm from '../LoginForm/LoginForm'
import { useStoreContext } from '../../utils/GlobalState'
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions'


function NavBar () {
    const handleClick = () => {
        dispatchEvent({type: UPDATE_CURRENT_CATEGORY, categoryId: null})
    }
    return (
        <header>
            <h1>The Promise of Spring</h1>
            <nav>
                <ul>
                    <Link to="/" onClick={handleClick}>
                        <li>Home</li>
                    </Link>
                    <Link to="/art" onClick={handleClick}>
                        <li>Arts</li>
                    </Link>
                    <Link to="/contact" onClick={handleClick}>
                        <li>Contact</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
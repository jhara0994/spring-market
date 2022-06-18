import React, { useState } from 'react'

import { validateEmail } from './../../utils/helpers.js'

import classes from './Contact.module.css'


export default function Collab(props) {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [collabMessage, setCollabMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;  

        return name === "name" ? setName(value) : name === "email" ? setEmail(value) : setCollabMessage(value)
    }

    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();

        if(!name || !email || !collabMessage) {
            alert('Please complete all fields!')
        }
    
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if (!validateEmail(email)) {
            //setErrorMessage('Email is invalid! Please use an valid email so we can collaborate.');
            alert("Email is invalid. Please check the spelling of the email provided.")
            // We want to exit out of this code block if something is wrong so that the user can correct it
        console.log("I actually did something!!!");
            return;
        }

        alert(`Your message has been sent. Thank you ${name}.`);
    
        // If everything goes according to plan, we want to clear out the input after a successful registration.
        setName('');
        setEmail('');
        setCollabMessage('')
    }
    
        return(
           <main className={classes.Container} >
                <section className="contact" id="contact">
                <div className="collab-page">
                    <h2 className="title">Contact Us</h2>
                    <p>
                       Thank you for visiting our store. To get in contact, please send us a message below, and we will get back to you shortly.
                    </p>
                    <form className="collab-form" autoComplete='on'>
                    <input className="name"
                            value={name}
                            name="name"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Name"
                        />
                        <input className="email"
                            value={email}
                            name="email"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Email"
                        />
                        <textarea rows={5} className="message"
                            value={collabMessage}
                            name="collabMessage"
                            onChange={handleInputChange}
                            type="textarea"
                            placeholder="Message"
                        />
                        <button type="button" onClick={handleFormSubmit}>Send Message</button>
                    </form> 
                </div>
            </section>      
           </main>  
        )
}


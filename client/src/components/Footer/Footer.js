import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer(props) {
    return (
        <footer className="footer">
          <div className="footerInfo">
            <a href="tel:+4045558899" className="contact-info"><PhoneIcon className ="contactIcon" /></a>
            <a href="mailto: jharalson29@gmail.com?subject=Touch of Spring" className="contact-info"><EmailIcon className ="contactIcon" /></a>
            <a href="https://github.com/jhara0994/MERN-E-Commerce/graphs/contributors" className="contact-info"><GitHubIcon className ="contactIcon"  /></a> 
          </div>                               
        </footer>
    )
}
import React from 'react'
import css from './Footer.module.css'
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer(props) {
    return (
        <footer className={css.footer}>
          <div className={css.footerInfo}>
            <a href="tel:+4045558899" className="contact-info"><PhoneIcon className ={css.contactIcon} /></a>
            <a href="mailto: jharalson29@gmail.com?subject=Art E-Commerce" className="contact-info"><EmailIcon className ={css.contactIcon} /></a>
            <a href="https://github.com/jhara0994/MERN-E-Commerce/graphs/contributors" className="contact-info"><GitHubIcon className ={css.contactIcon}  /></a> 
          </div>                               
        </footer>
    )
}
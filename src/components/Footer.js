import './Footer.css'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Footer () {
    return (
        <div className='footer'>
            <div className="logo">
                <img src={Logo} alt="pkc logo" />
            </div>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/team">Projects</Link></li>
                <li><Link to="/team">Contact Us</Link></li>
            </ul>
            <div className='footer-copyright'>
                2023 Kauri Point Construction, All Rights Reserved
            </div>
        </div>
    )
}
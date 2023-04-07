import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'

// styles & images
import './Navbar.css'
import Logo from '../assets/logo.png'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className="navbar">
      <ContactCard />
      <ul>
        <li className="logo">
          <img src={Logo} alt="pkc logo" />
        </li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            
          </>
        )}
        {user && (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">App</Link></li>

            <li>Hi {user.displayName}, </li>
            <li><Avatar src={user.photoURL} /></li>
            <li>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disabled>Loging out...</button>}
            </li>
          </>
          
        )}
        
      </ul>
      
    </nav>
  )
}

const ContactCard = ()=> {
  return(
    <div className='quickContactCard'>
      <div className='phone'>021 037 2837</div>
      <div className='email'>simon@kauripointconstruction.co.nz</div>
    </div>
  )
}
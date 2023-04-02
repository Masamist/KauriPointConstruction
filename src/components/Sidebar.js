import { NavLink } from 'react-router-dom'

//styles
import './Sidebar.css'

export default function Sidebar({ handleExitProject} ) {
  
  const viewProjectList= () => { {handleExitProject()} }
  
  return (
    <div className="sidebar">
      <nav className="links">
        <ul>
          <li onClick={viewProjectList}>
            <NavLink exact to="/">Project List</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create Project</NavLink>
          </li>
        </ul> 
      </nav>    
    </div>
  )
}

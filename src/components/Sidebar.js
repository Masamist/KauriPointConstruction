import { NavLink } from 'react-router-dom'

//styles
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink exact to="/">Project List</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create Project</NavLink>
        </li>
      </ul>     
    </div>
  )
}

import { Link } from 'react-router-dom'
// styles
import './ProjectSummary.css'


export default function ProjectSummary({ projects }) {
  return (
    <div className="project-summary">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/project/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <progress value="32" max="100"> 32% </progress>
          <p>Start date: {project.startDate.toDate().toDateString()}</p>
        </Link>
      ))}
    </div>
  )
}

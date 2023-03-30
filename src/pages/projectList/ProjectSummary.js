import { stringify } from 'json5';
import { Link } from 'react-router-dom'
import { ProgressBar, calculateProjectProgress } from '../../components/ProgressBar'
// styles
import './ProjectSummary.css'


export default function ProjectSummary({ projects }) {

  return (
    <div className="project-summary">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => {
        const results = calculateProjectProgress(project);

        const claimed = (results.totalClaimed / results.totalCost) * 100

        console.log('RESULTS:', stringify(results))
        return (
        <Link to={`/project/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <ProgressBar initial={claimed} warning={claimed} progress={claimed}/>
          <p>Start date: {project.startDate.toDate().toDateString()}</p>
        </Link>
      )})}
    </div>
  )
}

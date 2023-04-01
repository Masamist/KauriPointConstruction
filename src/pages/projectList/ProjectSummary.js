import { stringify } from 'json5';
import dayjs from 'dayjs';
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

        return (
          <div className='projectListCard'>
            <div className='title'>
              <div className='arrow-right' />
              <Link to={`/project/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
              </Link>
            </div>
              <ProgressBar initial={claimed} warning={claimed} progress={claimed}/>
              <p>{dayjs(project.startDate.toDate()).format('DD/MMM')}</p>
          </div>
      )})}
    </div>
  )
}

import ProjectSummary from '../../components/ProjectSummary'
import { useCollection } from '../../hooks/useCollection'

// styles
import './ProjectList.css'

export default function ProjectList() {
  const { documents, error } = useCollection('projects')

  return (
    <div className="project-list">
      <h2 className="page-title" id="pc-Green">Project List</h2>
      { error && <p className='error'>{error}</p>}
      {documents && <ProjectSummary projects={documents} />}
    </div>
  )
}
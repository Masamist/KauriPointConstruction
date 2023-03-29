import ProjectSummary from './ProjectSummary'
import Sidebar from '../../components/Sidebar'
import { useCollection } from '../../hooks/useCollection'

// styles
import './ProjectList.css'

export default function ProjectList() {
  const { documents, error } = useCollection('projects')

  return (
    <div className='page-container'>
    <Sidebar />
    <div className='content-container'>
      <div className="project-list">
        <h2 className="page-title">Project List</h2>
        { error && <p className='error'>{error}</p>}
        {documents && <ProjectSummary projects={documents} />}
      </div>
    </div>
    </div>
  )
}
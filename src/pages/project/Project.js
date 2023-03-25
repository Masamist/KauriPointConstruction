import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectDetail from './projectDetail'


// styles
import './Project.css'
import Sidebar from '../../components/Sidebar'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects' , id)
  
  if(error) {
    return <div className="error">{error}</div>
  }
  if(!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <Sidebar />
        <div className='content-container'>
          <div className="project-details">
            <ProjectDetail project={document} />
          </div>
      </div>
    </>
  )
}
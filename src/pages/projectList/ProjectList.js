import ProjectSummary from './ProjectSummary'
import Sidebar from '../../components/Sidebar'
import { useCollection } from '../../hooks/useCollection'

// styles
import './ProjectList.css'
import { useState } from 'react'
import Project from '../project/Project'

export default function ProjectList() {
  const { documents, error } = useCollection('projects')
  const [project, setProject] = useState(null)

  const handleSetProject = (project) => { setProject(project) }

  function handleExitProject() {
    handleSetProject(null)
  }
  return (
    <div className='page-container'>
    <Sidebar handleExitProject={handleExitProject}/>
    <div className='content-container'>

      {project? <Project document={project}/>
        :<div className="project-list">
            <h2 className="page-title">Project List</h2>
            { error && <p className='error'>{error}</p>}
            {documents && <ProjectSummary projects={documents} handleSetProject={handleSetProject}/>}
          </div>}
    </div>
    </div>
  )
}
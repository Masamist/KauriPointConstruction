import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDocument } from '../../hooks/useDocument'
import ProjectDetail from './ProjectDetail'
import ProjectLabourList from './ProjectLabourList'

// styles
import './Project.css'
import { ProjectClientInfo } from './ProjectClientInfo'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects' , id)

  const [ switchLabourList, SetSwitchLabourList ] = useState(false)

  
  if(error) {
    return <div className="error">{error}</div>
  }
  if(!document) {
    return <div className="loading">Loading...</div>
  }

  const handleSwitchList = () => {
    if(switchLabourList === false){
      SetSwitchLabourList(true)
    } else {
      SetSwitchLabourList(false)
    }
  }

  return (
    <div className="project">
      <ProjectClientInfo project={document} />
      <div>
        <p>+ Update Project</p>
        <button onClick={ handleSwitchList } className="btn" id={switchLabourList ? 'btn-disabled' : 'btn-active'}>MainList</button>
        <button onClick={ handleSwitchList } className="btn" id={!switchLabourList ? 'btn-disabled' : 'btn-active'}>LabourList</button>
      </div>
      
      {!switchLabourList && <ProjectDetail project={document} />}
      {switchLabourList && <ProjectLabourList project={document} />}
    </div>
  )
}
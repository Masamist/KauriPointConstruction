import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserRole } from '../../hooks/useUserRole'


import Sidebar from '../../components/Sidebar'
import ProjectClientInfo from './ProjectClientInfo'
import ProjectDetail from './ProjectDetail'
import ProjectLabourList from './ProjectLabourList'
import ProjectUpdateClientInfo from './projectUpdate/ProjectUpdateClientInfo'
import ProjectUpdateProjectDetail from './projectUpdate/ProjectUpdateProjectDetail'


// styles
import './Project.css'


export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects' , id)
  const [ switchLabourList, SetSwitchLabourList ] = useState(false)
  const { user, authIsReady } = useAuthContext()
  const userRole = useUserRole(user)
  console.log(userRole)
  
  if(error) {
    return <div className="error">{error}</div>
  }
  if(!document) {
    return <div className="loading">Loading...</div>
  }

  // Switches for Main and Labour components
  const handleSwitchList = () => {
    SetSwitchLabourList(!switchLabourList)
  }

  return (
    <div className='page-container'>
      <Sidebar />
      <div className='content-container'>
        <div className="project">      

          <ProjectClientInfo project={document}/>
          {userRole==="admin" &&
          <ProjectUpdateClientInfo project={document}/>}

          <div>
            <button onClick={ handleSwitchList } className="btn" id={switchLabourList ? 'btn-disabled' : 'btn-active'}>MainList</button>
            <button onClick={ handleSwitchList } className="btn" id={!switchLabourList ? 'btn-disabled' : 'btn-active'}>LabourList</button>
          </div>
          
          {!switchLabourList && 
            <>
              <ProjectDetail project={document} />
              { userRole==="admin" &&
                <ProjectUpdateProjectDetail project={document} />
              }
            </>
          }
          {switchLabourList && <ProjectLabourList project={document} />}
        </div>
      </div>
    </div>
  )
}
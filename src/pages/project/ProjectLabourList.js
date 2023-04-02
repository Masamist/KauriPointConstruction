import LabourList from '../../components/LabourList'

// styles
import './ProjectLabourList.css'


export default function ProjectLabourList({project}) {
  console.log('labour List: ', project.labourList)
  return (
    <div className="project-detail">
        <h3>Labour Const Breakdown by Stage</h3>
        <div className="project-labour-list">
          <LabourList list={project.labourList} team={project.team} />
        </div>    
    </div>
  )
}

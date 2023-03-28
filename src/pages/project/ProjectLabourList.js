import LabourList from '../../components/LabourList'

// styles
import './ProjectLabourList.css'


export default function ProjectLabourList({project}) {

  return (
    <div className="project-detail">
        <h3>Labour Const Breakdown by Stage</h3>
        <div className="project-labour-list">
          <LabourList list={project.labourList} />
        </div>    
    </div>
  )
}

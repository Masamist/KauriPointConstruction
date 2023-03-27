// styles
import './ProjectLabourList.css'


export default function ProjectLabourList({project}) {


  return (
    <div className="project-detail">
        <h3>Labour Const Breakdown by Stage</h3>
        <LabourList labourList={project.labourList} />
        
    </div>
  )
}

function LabourList({ labourList }) {
  return (
    <div className="project-labour-list">
      {Object.entries(labourList).map( ([key, groups]) => { return ( 
        <div key={key} className="task-group-container">
          <strong>{key}</strong>
          <LabourListTask groups={groups}/>
        </div> 
    )})}
    </div>
  )
}

function LabourListTask( {groups} ) {
  return (
    <>
      {Object.entries(groups).map( ([key, groups]) => {
        const name = groups.name
        return (
          <div key={key}>
            <span>{name}</span>
          </div>
        )
      })}
    </>
  )
}

import { useState } from 'react'

// styles
import './ProjectLabourList.css'


export default function ProjectLabourList({project}) {

  const [totalDays, setTotalDays] = useState([])


  return (
    <div className="project-detail">
        <h3>Labour Const Breakdown by Stage</h3>
        <div className="project-labour-list">
          <LabourList labourList={project.labourList} />
        </div>    
    </div>
  )
}

function LabourList({ labourList }) {

  return (
    <div>
      {Object.entries(labourList).map( ([key, groups]) => { return ( 
        <div key={key} className="task-group-container">
          <div className="task-group-name-container"><strong>{key}</strong></div>
          <LabourListTask groups={groups}/>
          <div><p>Total Days</p></div>
          <div><p>Total Amount</p></div>
        </div> 
    )})}
    </div>
  )
}

function LabourListTask( {groups} ) {
  return (
    <>
      {Object.entries(groups).map( ([key, groups]) => {
        return (
          <div key={key}>
            <div>
              <span>{groups.name}</span>
            </div>
            <HoursPredicted hoursPredicted={groups.hoursPredicted} />
            
          </div>
        )
      })}
    </>
  )
}

function HoursPredicted( {hoursPredicted} ) {
  // const total = {}
  

  return (
    <>
      {Object.entries(hoursPredicted).map( ([key, hours]) => {
        if(hours===""){
          hours = "-"
        }
        return (
          <>
            <span key={key}> {hours} </span>
          </>
        )
      })}
    </>
  )
}

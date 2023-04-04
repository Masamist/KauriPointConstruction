import { stringify } from 'json5';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import { ProgressBar, calculateProjectProgress } from '../../components/ProgressBar'
// styles
import './ProjectSummary.css'
import { useState } from 'react';
import React from 'react';


export default function ProjectSummary({ projects }) {

  return (
    <div className="project-summary">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => {
        //const results = calculateProjectProgress(project);
        //const claimed = (results.totalClaimed / results.totalCost) * 100

        return (
          <ProjectListCard key={project.id} project={project} /> //claimed={claimed}
      )})}
    </div>
  )
}

function ProjectListCard({project, claimed}) {
  const [expandProjectListCard, setExpandProjectListCard] = useState(false) 

  const handleExpandProjectListCard = () => {
    setExpandProjectListCard(!expandProjectListCard)
  }

//<p>{dayjs(project.startDate.toDate()).format('DD/MMM')}</p>
  return (
    <>
    <div className='projectListCard'>
      <div className='title'>
        {expandProjectListCard ? <div className='arrow-down' onClick={handleExpandProjectListCard}/>
                              : <div className='arrow-right' onClick={handleExpandProjectListCard}/>}
        
        <Link to={`/project/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
        </Link>
       
      </div>
        <ProgressBar initial={claimed} warning={claimed} progress={claimed}/>
        
    </div>
    {expandProjectListCard && <CardStages mainList={project.mainList} />}
    </>
  )
}

function CardStages({mainList}) {
  return (
    <div className='cardStages'>
    {Object.entries(mainList).map( ([key, value]) => {
      //console.log('value1: ', value)
      return(
        <React.Fragment key={key}>
          {Object.entries(value).map( ([key, value]) => {
            //console.log('value2: ', value)
            const taskName = value.task? value.task : '-'
            return (
              <div key={key}> 
                <h3>{key}</h3> <CardStageTasks stageTasks={value}/>
              </div>
            )
          })}
        </React.Fragment>
      )
    })}    
    
    </div>
  )
}

function CardStageTasks({stageTasks}) {
  console.log('stageTasks: ', stageTasks)
  return(
    <div>
      {Object.entries(stageTasks).map( ([key, task]) => {
        return (
          <div className='cardStageTasks' key={key}>
            <span>{task.task}</span>
            <span>{task.status}</span>
          </div>
        )
        
      })}

    </div>
  )
}
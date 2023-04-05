//import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import { ProgressBar, calculateProjectProgress } from '../../components/ProgressBar'
//functions
import {calculateTaskClaimed, calculateStageProgress} from '../../components/ProgressBar'

// styles
import './ProjectSummary.css'
import { useState } from 'react';
import React from 'react';
import { stringify } from 'querystring';


export default function ProjectSummary({ projects }) {

  return (
    <div className="project-summary">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => {
        const results = calculateProjectProgress(project);
        const claimed = results.totalClaimed / results.totalCost * 100

        return (
          <ProjectListCard key={project.id} project={project} claimed={claimed}/> 
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
    {expandProjectListCard && <CardMainList mainList={project.mainList} />}
    {expandProjectListCard && <CardLabourList labourList={project.labourList} />}
    </>
  )
}

//MAIN LIST
function CardMainList({mainList}) {
  const [expandList, setExpandMainList] = useState(true)

  const HandleCollapseMainList = () => {
    setExpandMainList(!expandList)
  }

  return (
    <div className='cardMainList'>
      <h4 onClick={HandleCollapseMainList}>MainList</h4>
    {Object.entries(mainList).map( ([key, value]) => {
      //console.log('value1: ', value)
      return(
        <React.Fragment key={key}>
          {expandList &&
            Object.entries(value).map( ([key, stage]) => {
              //console.log('value2: ', value)
              const stageStats = calculateStageProgress(stage)
              const stageClaimed = stageStats.totalClaimed / stageStats.totalCost * 100

              return (
                <div key={key}> 
                  <CardStageTasks stageName={key} stageTasks={stage} stageClaimed={stageClaimed}/>
                </div>
              )
            })
          }
        </React.Fragment>
      )
    })}    
    
    </div>
  )
}

function CardStageTasks({stageName, stageTasks, stageClaimed}) {
  const [expandStage, setExpandStage] = useState(false) 

  const ToggleExpandStage = () => {
  setExpandStage(!expandStage)
}
  //console.log('stageTasks: ', stageTasks)

  return(
    <div>
      <div className='cardStage-stageHeader'>
        <h3 onClick={ToggleExpandStage} className='cardStage-stageName'>{stageName}</h3> 
        <ProgressBar progress={stageClaimed} />
      </div>

      {expandStage && 
        Object.entries(stageTasks).map( ([key, task]) => {

          const claimed = calculateTaskClaimed(task)/ parseInt(task.calculatedamount) * 100

          return (
            <div className='cardStageTasks' key={key}>
              <span className='cardStagetask-name'>{task.task}</span>
              <ProgressBar progress={claimed}/>
              <span className='cardStagetask-status'>{task.status}</span>
            </div>
      )
        
      })}

    </div>
  )
}


//LABOUR LIST
function CardLabourList({labourList}) {
  const [expandLabourList, setExpandLabourList] = useState(false)

  const HandlesetExpandLabourList = () => {
    setExpandLabourList(!expandLabourList)
  }

  let VARIABLE = "VARIABLE"
  return (
    <div className='cardMainList'>
      <h4 onClick={HandlesetExpandLabourList}>Labour List</h4>
      {expandLabourList && 
        Object.entries(labourList).map( ([key, value]) => {
          return(<div key={key}>{
            Object.entries(value).map( ([key, value]) => {
              return(
                <React.Fragment key={key}>
                  <CardLabourListTasks stageName={key} stageTasks={value} />
                </React.Fragment>
              )
            })
          
            }</div>)
        })}   
    
    </div>
  )
}


function CardLabourListTasks({stageName, stageTasks}) {
  const [expandLabourStage, setExpandLabourStage] = useState(false) 

  const ToggleExpandLabourStage = () => {
    setExpandLabourStage(!expandLabourStage)
}

  return(
    <div>
      <div className='cardStage-stageHeader'>
        <h3 onClick={ToggleExpandLabourStage} className='cardStage-stageName'>{stageName}</h3> 
      </div>

      {expandLabourStage && 
        Object.entries(stageTasks).map( ([key, task]) => {

          return (
            <div className='cardStageTasks' key={key}>
              <span className='cardStagetask-name'>{task.name}</span>
            </div>
      )
        
      })}

    </div>
  )
}
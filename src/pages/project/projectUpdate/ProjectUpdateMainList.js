import { useState, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFirestore } from '../../../hooks/useFirestore'

import { ProgressBar, calculateStageProgress, calculateTaskClaimed } from '../../../components/ProgressBar'
import { numberWithCommas } from '../ProjectFinancialInfo'

import UpdateTaskStatus from './components/UpdateTaskStatus'
import AddStage from './components/AddStage'
import AddTask from './components/AddTask'

//styles
import '../../../components/MainList.css'
import './ProjectUpdateMainList.css'
import CreateNewStage from './components/CreateNewStage'

export const ACTIONS = {
    CREATE_STAGE: 'create_stage',
    ADD_STAGE: 'add_stage',
    ADD_TASK: 'add_task',
    CHANGE_STATUS: 'change_status',
    DELETE_STAGE: 'delete_stage',
    DELETE_TASK_ITEM: 'delete_task_item',
}

function reducer(reStages, action) {
  let stageTask
  // console.log('reducer payload', tasks, name)
  switch(action.type){
    case ACTIONS.CREATE_STAGE:
      stageTask = [...reStages]
      stageTask.push(action.payload.newStage)
      return stageTask

    case ACTIONS.ADD_STAGE:
      const name = action.payload.stage
      const tasks = action.payload.tasks
      // console.log('Reducer')
      stageTask = [...reStages]
      stageTask.push({ name, tasks })
      return stageTask

    case ACTIONS.ADD_TASK:
      return reStages.map(stage => {
        // console.log('reducer', action.payload.stageName)
        // console.log('action.payload.taskList', action.payload.taskList)
        // console.log('stage', stage)

        if(stage.name === action.payload.stageName )
          return {
            ...stage,
            tasks: [
              ...stage.tasks, 
              action.payload.task,          
              // action.payload.taskList.map(details => {return {...details}})          
            ]
          }

        return { ...stage }
    })

    case ACTIONS.CHANGE_STATUS: 
      return reStages.map(stage => {
        return {   
          ...stage,
          tasks: 
            stage.tasks.map(task => 
              {
                if(task.task === action.payload.task){
                  return {
                    ...task,
                    code: task.code,
                    task: task.task,
                    comments: task.coments,
                    details: task.details,
                    quoteEstimateOrProvision: task.quoteEstimateOrProvision,
                    percentageComplete: task.percentageComplete,
                    subcontractedamount: task.subcontractedamount,
                    subContractor: task.subContractor,
                    status: action.payload.status,
                    calculatedamount: action.payload.calculatedamount,
                  }
                }
                return {...task}    
              })  
        }
      }) 

      // const subContractor = task.subcontractor ? task.subcontractor : " -"
      // const calculatedamount= task.calculatedamount ? numberWithCommas(parseFloat(task.calculatedamount)) : ' -'
      // const status = task.status ? task.status : ' -'
      // const claimed = calculateTaskClaimed(task) > 0 ? numberWithCommas(calculateTaskClaimed(task)) : '-'
      // const percentageComplete = (calculateTaskClaimed(task) / parseFloat(task.calculatedamount)) * 100
    

    case ACTIONS.DELETE_STAGE:
      console.log('payload', action.payload.stageName);
      return reStages.filter(stage => stage.name !== action.payload.stageName)
        .map(stage => {
          return {...stage}
      })
      // return reStages

    case ACTIONS.DELETE_TASK_ITEM:
    return reStages.map(stage => {
        // console.log('action.payload.task', action.payload.task)
        // console.log('stage.tasks', stage.tasks)

      return {   
        ...stage,
        tasks: 
          stage.tasks.filter(task => task.task !== action.payload.task)
            .map(task => {
              return {...task}
          })    
      }
    })

  default:
    return reStages
  }
}

const TaskSectionData = ({label, value}) => {
  return (
      <div className='TaskSectionData'>
          <span className='TaskSectionData-label'>{label}: </span> 
          <span className='TaskSectionData-value'>{value}</span>
      </div>
  )
}

function TaskSection({task}) {
  return (
      <div className='TaskSection'>
          <TaskSectionData label='Code' value={task.code}/>
          <TaskSectionData label='Details' value={task.details}/>
          <TaskSectionData label='Quote, Estimate or Provision' value={task.quoteestimateorprovision}/>
          <TaskSectionData label='comment' value={task.comment}/>
      </div>
  )
}

// function TaskDetails({stageKey, index, task, dispatch}) {
function TaskDetails({task, dispatch}) {
  const [expandTask, setExpandTask] = useState(false) 

  const handleExpandTask = ()=>{
      setExpandTask(!expandTask)
  }
  const taskName = task.task ? task.task : ' -'
  const subContractor = task.subcontractor ? task.subcontractor : " -"
  const calculatedamount= task.calculatedamount ? numberWithCommas(parseFloat(task.calculatedamount)) : ' -'
  const status = task.status ? task.status : ' -'
  const claimed = calculateTaskClaimed(task) > 0 ? numberWithCommas(calculateTaskClaimed(task)) : '-'
  const percentageComplete = (calculateTaskClaimed(task) / parseFloat(task.calculatedamount)) * 100
  
  return (
      <>
      <div onClick={handleExpandTask} className='mainlist-task'>
          {expandTask ? <span className='arrow-down'/> : <span className='arrow-right'/> }
          <span className='mainlist-taskHeader-name'>
              <div>{taskName}</div>
              <ProgressBar progress={percentageComplete} />
          </span>
          <span className='mainlist-taskHeader-subContractor'>{subContractor}</span>
          <span className='mainlist-taskHeader-cost'>{claimed} / {calculatedamount}</span>
          <span className='mainlist-taskHeader-status'>{status}
          
            {/* <UpdateTaskStatus stageKey={stageKey} index={index} task={task} dispatch={dispatch} /> */}

            <UpdateTaskStatus task={task} dispatch={dispatch} />
          </span>
      </div>
      <div>
      {expandTask && <TaskSection task={task}/>}
      </div>
      </>
  )
}

function Tasks ({ stageKey, stage, dispatch }) { 
return(
  
    <div className='mainList-stageTasks'>
      <div className='mainlist-taskHeader'>
          <span className='mainlist-taskHeader-name'>Task Items</span>
          <span className='mainlist-taskHeader-subContractor'>SubContractor</span>
          <span className='mainlist-taskHeader-cost'>Claimed / Cost</span>
          <span className='mainlist-taskHeader-status'>Status</span>
      </div>
      {Object.entries(stage).map( ([key, task]) => {
          return (
              <TaskDetails stageKey={stageKey}
                          index={key} 
                          task={task}
                          dispatch={dispatch}
                          />
          )
      })}
    </div>
  )
}

// function Stage({ stageKey, stage, dispatch }) {
function Stage({ stage, dispatch }) {
  const [expandStages, setCollapseStages] = useState(false)
  
  function handleExpand() { setCollapseStages(!expandStages)}

  function handleDeleteStage(e) {
    const stageName = e.target.value
    dispatch({ type: ACTIONS.DELETE_STAGE, payload:{ stageName: stageName }})
  }

  // console.log('stage: ',stage)
  return (
    <div className='mainlist-stageCard'>
      <div className='flex'>
        <h3 onClick={handleExpand}>{stage.name}</h3>

        
      </div>
      <div>
      {/* {expandStages && <Tasks stageKey={stageKey} stage={stage.tasks} dispatch={dispatch} />} */}
        {expandStages && <Tasks stage={stage.tasks} dispatch={dispatch} />}
      </div>
      <div className='modal-footer'>
        <AddTask stage={stage} dispatch={dispatch} />
        <button value={stage.name} onClick={(e) => handleDeleteStage(e)}>- Delete Stage</button>
      </div>
      
    </div>
  )
}

// Reducer setup here
export default function ProjectUpdateMainList({project}) {
  const passMainlist = project.mainList
  const [ stages, useStages] = useState(passMainlist)
  const [reStages, dispatch] = useReducer(reducer, stages)
  const { updateDocument, response } = useFirestore('projects')
  const { id } = useParams()
  const history = useHistory()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const mainList = {
        mainList: reStages
    }
    console.log('mainList before', reStages)
    // await updateDocument(id, mainList)
    await updateDocument(id, mainList)
    //console.log('mainList after',mainList)

    if (!response.error) {
        history.push('/')
      }
  }
  console.log("reStages", reStages)
  
  return (
    <div>
      <h2>Main List:</h2>
      <div className="update-mainlist">    
      { Object.entries(reStages).map( ([key, stage]) => {
        // console.log('stageKey',key)
        return <Stage stage={stage} dispatch={dispatch} />
        // return <Stage stageKey={key} stage={stage} dispatch={dispatch} />
      })}
      <AddStage stage={stages} dispatch={dispatch} />
      <CreateNewStage stage={stages} dispatch={dispatch} />
      <div className='modal-footer'>
        <button onClick={handleSubmit} className="btn" id="btn_right">Update All Change</button>
        <button className="btn-cancel" id="btn_right">Cancel</button>
      </div>
      
      </div>
    </div> 
  )
}

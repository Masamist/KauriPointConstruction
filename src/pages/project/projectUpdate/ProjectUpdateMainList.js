import { useState, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFirestore } from '../../../hooks/useFirestore'

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
                      status: action.payload.status,
                      details: task.details,
                      calculatedamount: action.payload.calculatedamount,
                    }
                  }
        return {...task}    
        })  
      }
    }) 

    case ACTIONS.DELETE_STAGE:
      console.log('payload', action.payload.stageName);
      return reStages.filter(stage => stage.name !== action.payload.stageName)
        .map(stage => {
          return {...stage}
      })
      return reStages

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

function Tasks ({ stage, dispatch }) { 
return(
  <div>
    <table className='mainlist-taskHeaderBackground'>
      <thead className='mainlist-taskHeader flex'>
        <th>Task Items</th>
        <th>SubContractor</th>
        <th>Charge Amount</th>
        <th>Status</th>
      </thead>
      {Object.entries(stage).map( ([key,task]) => {
        const taskName = task.task ? task.task : ' -'
        const subContractor = task.subcontractor ? task.subcontractor : " -"
        const calculatedamount= task.calculatedamount ? task.calculatedamount : ' -'
        const status = task.status ? task.status : ' -'
        const id = key
        return (
          <tbody className='mainlist-taskBackground' key={key}>
            <td>{taskName}</td>
            <td>{subContractor}</td>
            <td>{calculatedamount}</td>
            <td>{status}</td>
            {/* <td><UpdateTaskStatus key={task.id} task={task} dispatch={dispatch} /></td> */}
            
            <td><UpdateTaskStatus id={id} task={task} dispatch={dispatch} /></td>
          </tbody>
          )
        })}
      </table>
    </div>
  )
}

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
        <button value={stage.name} onClick={(e) => handleDeleteStage(e)}>
          - Delete Stage
        </button>
      </div>
      <div>
        {expandStages && <Tasks stage={stage.tasks} dispatch={dispatch} />}
      </div>
      <div>
        <AddTask stage={stage} dispatch={dispatch} />
      </div>
    </div>
  )
}

// Reducer setup here
export default function ProjectUpdateMainList({stages}) {
  const [reStages, dispatch] = useReducer(reducer, stages)
  const { updateDocument, response } = useFirestore('projects')
  const { id } = useParams()
  const history = useHistory()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const mainList = {
        mainList: reStages
    }
    
    await updateDocument(id, mainList)

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
        return <Stage key={key} stage={stage} dispatch={dispatch} />
      })}
      <AddStage stage={stages} dispatch={dispatch} />
      <CreateNewStage stage={stages} dispatch={dispatch} />
      <button onClick={handleSubmit} className="btn" id="btn_right">Update All Change</button>
      <button className="btn-cancel" id="btn_right">Cancel</button>
      </div>
    </div> 
  )
}

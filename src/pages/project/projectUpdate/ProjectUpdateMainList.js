import { useState, useReducer } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useFirestore } from '../../../hooks/useFirestore'

import UpdateTaskStatus from './components/UpdateTaskStatus'

//styles
import '../../../components/MainList.css'

export const ACTIONS = {
    ADD_TASK: 'add_task',
    CHANGE_STATUS: 'change_status',
    DELETE_TASK_ITEM: 'delete_task_item',
}


function reducer(reStages, action) {

    switch(action.type){
        case ACTIONS.ADD_TASK:
            // return [...tasks, newStage(action.payload.task)]
            return reStages

        case ACTIONS.CHANGE_STATUS:
            console.log("stageDetails", reStages)
            // console.log("tasks", reStages.map(stage => { return stage.tasks.map(task => task.task)  }))
            // console.log("payload task name:", action.payload.task)
            // console.log("payload status:", action.payload.status)

            // return reStages.map(stage => {
            //     stage.tasks.map(task => {
            //         if(task.task === action.payload.task){
            //             return {
            //                 ...stage,
            //                 tasks: [
            //                     { ...task, status: action.payload.status }
            //                 ]
            //             }
            //         }
            //         return {...task}
            //     })
            //     return { ...stage }
            // })
                    
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
                                            subcontractor: task.subcontractor,
                                            // subcontractedamount: task.subcontractedamount,
                                            // calculatedamount: task.calculatedamount,
                                            
                                            // comments: task.comments,
                                            // budgetamount: task.budgetamount,
                                            // stilltoclaim: task.stilltoclaim,
                                            // complete: task.budgetamount,
                                            // comment: task.comment,
                                            // claims: task.claims 
                                            // {
                                            //     "claim1": "120",
                                            //     "claim3": "100"''
                                            // }
                                        }
                                    }
                            return {...task}
                                
                        })  
                    }
                }) 

            // return stages.map(stage => (stage.tasks).filter(action.payload.task)).map(stage => ({
            //     ...stage,
            //     "tasks": [{ ...stage.tasks,
            //                 "status": action.payload.status
            //     }]

            // })
            // )
        case ACTIONS.DELETE_TASK_ITEM:
            return reStages.map(stage => {
                console.log('action.payload.task', action.payload.task)
                return {   
                    ...stage,
                    tasks: 
                        stage.tasks.filter(!stage.tasks.task === action.payload.task).map((task) => {
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
                            <td >{taskName} </td>
                            <td>{subContractor}</td>
                            <td>{calculatedamount}</td>
                            <td>{status} </td>
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
    // console.log('stage: ',stage)
    return (
        <div className='mainlist-stageCard'>
            <div className='flex'>
                <h3 onClick={handleExpand}>{stage.name}</h3>
            </div>
            <div>
                {expandStages && <Tasks stage={stage.tasks} dispatch={dispatch} />}
            </div>
        </div>
    )
}

export default function MainList({stages}) {
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
    
    return (
            <div>
                <h2>Main List:</h2>
                <button onClick={handleSubmit} id="btn_right">Update MainList</button>
                { Object.entries(reStages).map( ([key, stage]) => {
                            return <Stage key={key} stage={stage} dispatch={dispatch} />
                })}
            </div> 
        )
}

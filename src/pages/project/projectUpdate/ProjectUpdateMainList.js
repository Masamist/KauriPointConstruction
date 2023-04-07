import { useState, useReducer } from 'react'
import UpdateTaskStatus from './components/UpdateTaskStatus'
//styles
import '../../../components/MainList.css'

export const ACTIONS = {
    ADD_TASK: 'add_task',
    CHANGE_STATUS: 'change_status'
}

function reducer(stage, action) {
    switch(action.type){
        case ACTIONS.ADD_TASK:
            // return [...tasks, newStage(action.payload.task)]
            return stage

        case ACTIONS.CHANGE_STATUS:
            console.log("stage", stage)
            console.log("test:",action.payload.id)
            return stage.map(singleStage => {
                if(singleStage.id === action.payload.id){
                    return {...singleStage, status: action.payload.status}
                }
            return singleStage
            })    
            
            

        default:
            return stage
    }
}

// function newStage(name){
//     return {id:"", task: name, status: ""}
// }
    // 1 : {
    //     "code": "A-300",
    //     "task": "Hire Costs (Tools & Machinery)",
    //     "details": "The provision of machinery, tools, consumables, plant hire and vehicles needed for the work",
    //     "subcontractedamount": "200",
    //     "calculatedamount": "220",
    //     "subcontractor": "KPC",
    //     "quote,estimateorprovision": "Provision",
    //     "comments": "",
    //     "budgetamount": "220",
    //     "stilltoclaim": "0",
    //     "complete": "1",
    //     "status": "",
    //     "comment": "",
    //     "claims": {
    //       "claim1": "120",
    //       "claim3": "100"
    //     }
    //   },




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

function Stage({ name, stage }) {
    const [expandStages, setCollapseStages] = useState(false)
    const [stageDtails, dispatch] = useReducer(reducer, stage)
        console.log('allStage', stageDtails)
    
    function handleExpand() { setCollapseStages(!expandStages)}
    // console.log('stage: ',stage)
    return (
        <div className='mainlist-stageCard'>
            <div className='flex'>
                <h3 onClick={handleExpand}>{name}</h3>
            </div>
            <div>
                {expandStages && <Tasks stage={stageDtails} dispatch={dispatch} />}
            </div>
        </div>
    )
}

export default function MainList({stages}) {
    
    return (
            <div>
                <h2>Main List:</h2>
                
                {  Object.entries(stages).map( ([key, stage]) => {
                    return (
                        Object.entries(stage).map( ([key, stage]) => {
                            //console.log('FinalStage: ',key, ' :: ', stage )
                            return <Stage key={key} name={key} stage={stage} />
                        })
                    )
                    
                })}
        </div> 
    )
}

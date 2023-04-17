import { useState } from 'react'
//styles
import './MainList.css'
import { ProgressBar, calculateTaskClaimed } from './ProgressBar'
import { numberWithCommas } from '../pages/project/ProjectFinancialInfo'

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

function TaskDetails({task}) {
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
        <tr onClick={handleExpandTask} className='mainlist-task'>
            <td >
                <div>{taskName}</div>
                <ProgressBar progress={percentageComplete} />
            </td>
            <td>{subContractor}</td>
            <td>{claimed} / {calculatedamount}</td>
            <td>{status}</td>
        </tr>
        <tr>
        {expandTask && <TaskSection task={task}/>}
        </tr>
        </>
    )
}


function Tasks ({ stage }) { 
    // console.log("STAGE:", stage)
    return(
        <table className='mainList-stageTasksTable'>
            <thead className='mainlist-taskHeader'>
                <th>Task Items</th>
                <th>SubContractor</th>
                <th>Claimed / Cost</th>
                <th>Status</th>
            </thead>
            <tbody >
            {Object.entries(stage).map( ([key,task]) => {
                
                return (
                    <TaskDetails key={key} 
                                task={task}
                                />
                )
            })}
            </tbody>
        </table>
        
    )
}

function Stage({ stage }) {
    const [expandStages, setCollapseStages] = useState(false)
    
    function handleExpand() { setCollapseStages(!expandStages)}
    // console.log('stage: ',stage)
    return (
        <div className='mainlist-stageCard'>
            <div onClick={handleExpand} className='mainlist-stageCard-header'>
                {expandStages? <div className='arrow-down' /> : <div className='arrow-right' />}
                <h3 >{stage.name}</h3>
            </div>
            {expandStages && <Tasks stage={stage.tasks} />}
        </div>
    )
}

export default function MainList({ stages}) {
    
    // console.log('stages: ',stages)
    
    return (
            <div>
                <h2>Main List:</h2>
                
                { Object.entries(stages).map( ([key, stage]) => {
                            return <Stage key={key} stage={stage} />
                })}
            </div> 
    )
}


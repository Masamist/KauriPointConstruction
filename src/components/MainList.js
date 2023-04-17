import { useState } from 'react'
//styles
import './MainList.css'
import { ProgressBar, calculateTaskClaimed } from './ProgressBar'
import { numberWithCommas } from '../pages/project/ProjectFinancialInfo'

function Tasks ({ stage }) { 
    // console.log("STAGE:", stage)
    return(
        <table className='mainList-stageTasks'>
            <thead className='mainlist-taskHeader'>
                <th>Task Items</th>
                <th>SubContractor</th>
                <th>Claimed / Cost</th>
                <th>Status</th>
            </thead>
            <tbody >
            {Object.entries(stage).map( ([key,task]) => {
                const taskName = task.task ? task.task : ' -'
                const subContractor = task.subcontractor ? task.subcontractor : " -"
                const calculatedamount= task.calculatedamount ? numberWithCommas(parseFloat(task.calculatedamount)) : ' -'
                const status = task.status ? task.status : ' -'
                const claimed = calculateTaskClaimed(task) > 0 ? numberWithCommas(calculateTaskClaimed(task)) : '-'
                
                const percentageComplete = (calculateTaskClaimed(task) / parseFloat(task.calculatedamount)) * 100

                return (
                    <tr className='mainlist-task' key={key}>
                        <td ><div>{taskName}</div><ProgressBar progress={percentageComplete} /></td>
                        <td>{subContractor}</td>
                        <td>{claimed} / {calculatedamount}</td>
                        <td>{status}</td>
                    </tr>
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

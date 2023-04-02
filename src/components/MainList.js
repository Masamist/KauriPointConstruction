import { useState } from 'react'
//styles
import './MainList.css'

function Tasks ({ stage }) { 
    console.log("STAGE:", stage)
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
                    
                    return (
                        <tbody className='mainlist-taskBackground' key={key}>
                            <td >{taskName} </td>
                            <td>{subContractor}</td>
                            <td>{calculatedamount}</td>
                            <td>{status}</td>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

function Stage({ name, stage }) {
    const [expandStages, setCollapseStages] = useState(false)
    
    function handleExpand() { setCollapseStages(!expandStages)}
    console.log('stage: ',stage)
    return (
        <div className='mainlist-stageCard'>
            <div className='flex'>
                <h3 onClick={handleExpand}>{name}</h3>
            </div>
            <div>
                {expandStages && <Tasks stage={stage} />}
            </div>
        </div>
    )
}

export default function MainList({ stages}) {
    
    console.log('stages: ',stages)
    
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

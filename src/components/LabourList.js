import { useState } from 'react';
import './LabourList.css'

function LabourStageTask({ stage }){
    return (
        <>
            {Object.entries(stage).map( ([key, task]) => {
                return(
                    <div className='labourList-StageTask'>
                        <span>{task.name}</span>
                    </div>
                )
            })}
        </>
    )
}

function LabourStageCard({name, stage }) {
    const [expandLabourStage, setExpandLabourStage] = useState(false)
    const handleToggleStage = ()=>{setExpandLabourStage(!expandLabourStage)}

    return (
        <>
            <div onClick={handleToggleStage} className='labourList-StageHeader'>
                {name}
            </div>
            {expandLabourStage && <LabourStageTask stage={stage} />}
        </>
    )
}

export default function LabourList({ list }) {
    const labourList = list;
    

    console.log('list: ', labourList)

    return (
        <>
            <h2>LABOUR LIST</h2>
            { Object.entries( labourList ).map( ([key, stage ]) => {
                return <LabourStageCard key={key} name={key} stage={stage}/>
            })}
        </>
    )

}
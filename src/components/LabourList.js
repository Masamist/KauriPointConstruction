import React from 'react';
import { useState } from 'react';
import './LabourList.css'

export default function LabourList({ list }) {
    console.log('list: ', list)

    return (
        <React.Fragment>
            <h2>LABOUR LIST</h2>
            { Object.entries( list ).map( ([key, stage ]) => {
                return <LabourStageCard key={key} name={key} stage={stage}/>
            })}
        </React.Fragment>
    )

}

function LabourStageCard({name, stage}) {
    const [expandLabourStage, setExpandLabourStage] = useState(false)
    const handleToggleStage = ()=>{setExpandLabourStage(!expandLabourStage)}

    
    // const rollName = Object.fromEntries(Object.entries(stage).map((k,v) =>
    //     [k, Object.keys(v)[0]]))

    // const rollName = Object.entries(stage).map((key, task) =>
    // Object.entries(task.hoursPredicted).map((roll,hour) => Object.keys(roll)[0]))

    // const rollName = Object.entries(stage).map((key, task) =>
    //     Object.keys(task.hoursPredicted)
    //     )
    const rollName = Object.entries(stage).map(([key, task]) =>
            Object.keys(task.hoursPredicted)
        )

        rollName.sort()

    console.log(rollName)

    return (
        <React.Fragment key={name}>
            <div onClick={handleToggleStage} className='labourList-StageHeader'>
                {name}
                {}
                {/* <LabourStageRoll stage={stage}/> */}
            </div>
            {expandLabourStage && <LabourStageTask stage={stage} />}
        </React.Fragment>
    )
}

function LabourStageTask({ stage }){
    return (
        <>
            {Object.entries(stage).map( ([key, task]) => {
                return(
                    <div className='labourList-StageTask' key={key}>
                        <div className='task-container'>{task.name}</div>
                        <div className='hours-container'> 
                            <LabourStageHours hoursPredicted={task.hoursPredicted} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

function LabourStageHours({ hoursPredicted }){
    return (
        <>
            {Object.entries(hoursPredicted).map( ([cat, id]) => {
                    // console.log(id.hours)
                    // console.log(id.role)

                if( id.hours === "" ){
                    id.hours = "-"
                }
                return(
                    <React.Fragment key={id.role}>
                        <div>
                            <span className="alignment-right"> {id.hours} </span>
                        </div>
                        
                    </React.Fragment>
                )}   
            )}
        </>
    )
}

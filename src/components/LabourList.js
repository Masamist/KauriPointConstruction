import React from 'react';
import { useState } from 'react';
import './LabourList.css'

export default function LabourList({ list , team }) {
    console.log('list: ', list)
    console.log('team:', team)

    const staffRole = Object.entries(team).map(([i, staff]) => staff.role)


    // console.log('staffRole:', staffRole);


    return (
        <React.Fragment>
            <h2>LABOUR LIST</h2>
            { Object.entries( list ).map( ([k, id ]) => {
                return (
                    <React.Fragment key={k}>
                        {Object.entries( id ).map( ([key, stage ]) => {
                        return <LabourStageCard key={key} name={key} stage={stage} team={staffRole} />
                        })}
                    </React.Fragment>
                    )}
            )}
        </React.Fragment>
    )

}

function LabourStageCard({name, stage, team}) {
    const [expandLabourStage, setExpandLabourStage] = useState(false)
    const handleToggleStage = ()=>{setExpandLabourStage(!expandLabourStage)}

    // const [totalHours, setTotalHours] = useState([{}])
   

    const calcHours = Object.entries(stage).map(([key, task]) => (
        Object.entries(task.hoursPredicted).map(([cat, id]) =>  id.hours)
    ))

    // const roleOne = calcHours.map((role) => role.at(0))
    // const a = roleOne.reduce(setSum, 0)
    // console.log(roleOne)
    // console.log(calcHours)
    // console.log('At', a)

    let totalDyas = []

    for (let i = 0; i < team.length; i++ ){
        const hourArray = calcHours.map((role) => role.at(i))
        const hourSum = hourArray.reduce(setSum, 0)
        // console.log('for:', hourSum)
        totalDyas.push(hourSum)
        console.log('TotalSum',i, ': ',totalDyas)
    }

    function setSum(total, num){
        if (num === "") {
            num = 0
        }
        return total + parseFloat(num)
    }   

    return (
        <React.Fragment key={name}>
            <div onClick={handleToggleStage} className='stage-container'>
                
                <div className="stage-name-container">{name}</div>
                <div className="stage-role-container">
                {team.map((role) => (
                    <div>{role}</div>
                ))}
                </div>
                
            </div>
            {expandLabourStage && <LabourStageTask stage={stage} />}
            <div className='labourList-StageTask'>
                <div className='task-container'>Total Days:</div>
                <div className='hours-container'>
                    {totalDyas.map((totalDay) => <span>{totalDay}</span>)}
                </div>
            </div>
            <div className='labourList-StageTask'>
                <div>Total Amount:</div>
            </div>
            <div className='labourList-StageTask'>
                <div>Stage Total: 000days $00000</div>
            </div>
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
                        <div className="single-hour-container">
                            <span> {id.hours} </span>
                        </div>
                        
                    </React.Fragment>
                )}   
            )}
        </>
    )
}


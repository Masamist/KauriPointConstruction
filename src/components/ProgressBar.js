import React from 'react';
import './ProgressBar.css'

function ProgressBar({ initial, warning, progress }) {
    function toPercent(value){
        return value + "%"
    }

    return (
            <div className="progressbar" >
                <div className="progress-initial" style={{width: toPercent(initial)}}></div>
                <div className="progress-warning" style={{width: toPercent(warning)}}></div>
                <div className="progress-progress" style={{width: toPercent(progress)}}></div>
            </div>
    )
}

//FUNCTIONS
function calculateTaskClaimed(task){
    let totalClaimed = 0;
    //console.log('task: ', task)
    Object.entries(task.claims).map(([key, claim]) => totalClaimed += parseFloat(claim) )
    return totalClaimed 
}

//calculate stage completion
const calculateStageProgress = (stage) => { 
    let totalCost = 0;
    let totalClaimed = 0;
    stage.tasks.forEach( task => {
        //console.log('StageProgressTask: ', task)
        totalCost += parseFloat(task.calculatedamount);
        totalClaimed += parseFloat(calculateTaskClaimed(task))
    })
            

    let results = {"totalCost": totalCost, "totalClaimed": totalClaimed}

    return results
}

const calculateProjectProgress = (project) => {
    let totalClaimed = 0
    let totalCost = 0
    project.mainList.forEach( stage => {
        const stageSums = calculateStageProgress(stage)
        totalClaimed += stageSums.totalClaimed
        totalCost += stageSums.totalCost
    })    
    return { "totalClaimed": totalClaimed, "totalCost": totalCost,}    
}  

// const calculateProjectProgress = (project) => {
//     let totalClaimed = 0
//     let totalCost = 0
//     Object.entries(project.MainList).map(([key, stage]) => {
//         console.log('key: ', key)
//         return(
//             <React.Fragment key={key}>
//                 {Object.entries(stage).map( ([key, stage]) => {
//                     console.log('Stage: ', stage)
//                     let stageSums = calculateStageProgress(stage)
//                     totalClaimed += stageSums.totalClaimed
//                     totalCost += stageSums.totalCost
//                     return <></>}
//                 )}
//                 </React.Fragment>
//             )}
//         )        

//     return { "totalClaimed": totalClaimed, "totalCost": totalCost,}    
// }

export { ProgressBar, calculateTaskClaimed, calculateStageProgress, calculateProjectProgress}
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
    console.log('task: ', task)
    Object.entries(task.claims).map(([key, claim]) => totalClaimed += parseFloat(claim) )
    return totalClaimed 
}

//calculate stage completion
const calculateStageProgress = (stage) => { 
    let totalCost = 0;
    let totalComplete = 0;
    let totalClaimed = 0;
    
    Object.entries(stage).map(([key, tasks]) => {
            Object.entries(tasks).map(([key, task]) => {
                    totalCost += parseFloat(task.calculatedamount);
                    totalComplete += parseFloat(task.calculatedamount) * parseFloat(task.complete)
                    totalClaimed += parseFloat(calculateTaskClaimed(task))
                })
            })

    // let results = {"totalCost": totalCost, "totalComplete": totalComplete, "totalClaimed": totalClaimed}

    // return results
}

const calculateProjectProgress = (project) => {
    let totalClaimed = 0
    let totalCost = 0
    Object.entries(project.mainList).map(([key,stage]) => {
        console.log('Stage: ', stage)
        let stageSums = calculateStageProgress(stage)
        totalClaimed += stageSums.totalClaimed
        totalCost += stageSums.totalCost
    })

    return { "totalClaimed": totalClaimed, "totalCost": totalCost,}    
}

export { ProgressBar, calculateTaskClaimed, calculateStageProgress, calculateProjectProgress}
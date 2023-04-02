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
const calculateStageInitialProgress = (stage) => { 
    let totalCost = 0;
    let totalComplete = 0;
    let totalClaimed = 0;
    return 50
    
    //     Object.entries(stage).map( (task) =>{
    //         return (
    //             Object.entries(stage).map(([key, task]) => {
    //                 totalCost += parseFloat(task.calculatedamount);
    //                 totalComplete += parseFloat(task.calculatedamount) * parseFloat(task.complete)
    //                 totalClaimed += parseFloat(calculateTaskClaimed(task))
    //             })
    //         )
    //     })
    // )

    let results = {"totalCost": totalCost, "totalComplete": totalComplete, "totalClaimed": totalClaimed}

    return results
}

function calculateStageClaimed(stage){
    let sumClaimed = 0.00
    let totalCost = 0.00
    Object.entries(stage).map( (stage) => {
        Object.entries(stage).map( ([key, task]) => {
            sumClaimed += calculateTaskClaimed(task)
            totalCost += parseFloat(task.calculatedamount)
        })
    })
    
    let perCentClaimed =  parseInt(sumClaimed / totalCost * 100)
        //console.log('perCentClaimed: ' + perCentClaimed, ', sum: ', sumClaimed, ", cost:", totalCost)
        return perCentClaimed
}

const calculateProjectProgress = (project) => {
    let totalClaimed = 0
    let totalCost = 0
    Object.entries(project.mainList).map(([key,stage]) => {
        let stageSums = calculateStageInitialProgress(stage)
        totalClaimed += stageSums.totalClaimed
        totalCost += stageSums.totalCost
    })

    return { "totalClaimed": totalClaimed, "totalCost": totalCost,}    
}

export { ProgressBar, calculateTaskClaimed, calculateStageInitialProgress, calculateStageClaimed, calculateProjectProgress}
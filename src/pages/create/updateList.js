//TO CONVERT IMPORTED LISTS TO ARRAYS

function ConvertToList(List) {

    console.log('List: ', List)
    let newMainList = []
    Object.entries(List).map( ([key, stage]) => {
        //console.log('mod stage: ', stage);

        Object.entries(stage).map( ([key,stage]) => {
            //console.log('2nd key: ', key, '2ndStage: ', stage)
            let newStageTasks = [];

            Object.entries(stage).map( ([key, task]) => {
                //console.log('key: ', key, ' task: ', task)
                newStageTasks.push(task);
                return ;
            })
            let newStage = { name:key, tasks:newStageTasks }
            newMainList.push(newStage)
            console.log('new mainList: ', newMainList )
            return ;
        })
        
        return
    })

    console.log('New Main List:', newMainList)

    return newMainList
}

export default function modifyData(project) {
    
    project.mainList = ConvertToList(project.mainList)
    project.labourList = ConvertToList(project.labourList)

    return project
}

export { modifyData }
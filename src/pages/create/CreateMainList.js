import React,{ useState } from 'react'
import MainList_db from './MainList_db.json'
import { useFirestore } from '../../hooks/useFirestore'

export default function CreateMainList() {
  // const { addDocument, response } = useFirestore('taskLibrary')
  const { updateArrDocument, response } = useFirestore('taskLibrary')
  const [formError, setFormError] = useState(null)

  const[ DBmainList, setDBMainList ] = useState(MainList_db)
  let mainList = []
  let taskLists =[]
  
  function MainListCreator(){
    Object.entries(DBmainList).map(([key, lists]) => (
      Object.entries(lists).map(([stageName, stages]) => {
        const task =  {
              "name": stageName,
              "tasks":
              Object.entries(stages).map(([stage, tasks]) => {
                  return {
                    "code": tasks.code,
                    "task": tasks.task,
                    "details": tasks.details,
                    "subcontractedamount": tasks.subcontractedamount,
                    "calculatedamount": tasks.calculatedamount,
                    "subcontractor":tasks.subcontractor,
                    "quoteEstimateOrProvision": tasks.quote,
                    "comments": tasks.comments
                  }

                })
        
          }
        mainList.push(task)
        console.log('task',task)
        return task
        
      })
    ))  
  }  
                    
          
          


  let testArray = [1,2,3]
  console.log('testArr',testArray)
  MainListCreator()

  // taskLists = Object.entries(mainList).map(([key, stages]) => (
  //   Object.entries(stages).map(([k, taskList]) => {
  //     return taskList

  //   })
  // ))

  console.log('mainList',mainList)
  // console.log('taskList',taskLists)


  const handleSubmit = async(e) => {
    e.preventDefault()
    // setFormError(null)
    if(!mainList){
      setFormError('Please select a task group')
      return
    }

    const tasks = {
      "stages": mainList       
    }
    

    // const tasks = {
    //   "name": "Preliminary and General",
    //     "tasks":[{
    //       "code": "A-100",
    //       "task": "Site Inspections",
    //       "details": "Pre-start meetings and inspections",
    //       "subcontractedamount": "",
    //       "calculatedamount": "",
    //       "subcontractor":"0",
    //       "quoteEstimateOrProvision": "",
    //       "comments": "",
    //     },{
    //       "code":"A-110",
    //     "task/item":"Project Costing",
    //     "details":"Producing quotes, quantity surveying and obtaining sub-contractor quotes",
    //     "subcontracted amount":"",
    //     "calculated amount":"0",
    //     "subcontractor":"",
    //     "quote, estimate or  provision":"",
    //     "comments":""
    //     },
    //     {
    //       "code":"A-120",
    //     "task":"Consent Cost",
    //     "details":"Time and costs associated with obtain consents",
    //     "subcontracted amount":"",
    //     "calculated amount":"0",
    //     "subcontractor":"",
    //     "quote":"",
    //     "comments":""
    //     },
    //     {
    //       "code":"A-130",
    //     "task":"Programme",
    //     "details":"Preparing and Updating the programme",
    //     "subcontracted amount":"140",
    //     "calculated amount":"154",
    //     "subcontractor":"KPC",
    //     "quote":"Quote",
    //     "comments":""
    //     },
    //     {
    //       "code":"A-140",
    //     "task":"Insurances",
    //     "details":"Contract works and public liability",
    //     "subcontracted amount":"400",
    //     "calculated amount":"440",
    //     "subcontractor":"KPC",
    //     "quote":"Quote",
    //     "comments":""
    //     },
    //     {
    //       "code":"A-150",
    //     "task":"Site Preparation",
    //     "details":"Set out and surveys, Site investigations, CCTV existing services",
    //     "subcontracted amount":"",
    //     "calculated amount":"0",
    //     "subcontractor":"",
    //     "quote":"",
    //     "comments":""
    //     },
    //   ]
    //   }


    // console.log('updateDoc',mainList)
    // await updateArrDocument('mainList', tasks)
    await updateArrDocument('mainList', tasks)
    // await addDocument(test)
  }

  return (
    <>
      <p>Hello</p>
      <button onClick={handleSubmit}>Send Mainlist</button>
    </>
  )
   
}

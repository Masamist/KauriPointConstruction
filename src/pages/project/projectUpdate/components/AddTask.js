import { useState, useEffect } from 'react'
import { useDocument } from '../../../../hooks/useDocument'
import { ACTIONS } from '../ProjectUpdateMainList'
import { useParams } from 'react-router-dom'
import Modal from "react-overlays/Modal"
import Select from 'react-select'

export default function AddTask({stage, dispatch}) {
  //Modal
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // Firebase
  const mainList_id = 'mainList'
  const { error, document } = useDocument('taskLibrary' , mainList_id)

  // Adding a task in state (reStage)
  const [selectedTask, setSelectedTask] = useState([])
  const [options, setOptions] = useState([])
  const [stageName, setStageName] = useState('')
  const [taskList, setTaskList] = useState([])

  // const [code, setCode] =useState('')
  // const [task, setTask] =useState('')
  // const [status, setStatus] =useState('')
  // const [details, setDetails] =useState('')
  // const [comments, setComments] =useState('')
  // const [subcontractor, setSubcontractor] =useState('')
  // const [subcontractedamount, setSubcontractedamount] =useState('')
  // const [calculatedamount, setCalculatedamount] =useState('')
  // const [quoteEstimateOrProvision, setQuoteEstimateOrProvision] =useState('')

  // Modal display functions
  const handleClose = () => {
    setSelectedTask([])
    setShowModal(false)
  }
  const renderBackdrop = (props) => <div className="backdrop" {...props} />


  // Store the tasks currently in the state 
  //console.log('taskListCurrentlySelected', taskListCurrentlySelected)
  const taskListCurrentlySelected = Object.entries(stage.tasks).map(([key, stageTask])=> {
    return stageTask.task
  })


  useEffect(() => {
    if(selectedTask){
      const passTask = selectedTask.value
      const passStage = selectedTask.stageName
      setTaskList(passTask)
      setStageName(passStage)
    }
    // console.log('taskList',taskList);
    // console.log('stageName',stageName);
  }, [selectedTask])


  function createTaskOption() {
      const allTasks = Object.values(document.stages).map(libStages => {
          return { stageName: libStages.name, value: libStages.tasks }       
      })
      let stageTasks = allTasks.filter(singleStage => singleStage.stageName === stage.name)

      let selectedTasks
      Object.entries(stageTasks).map(([key, stage]) => (
        selectedTasks = Object.entries(stage.value).map(([id, taskInfo]) => {
          // console.log('stageName', stage.stageName)
          return { value: {...taskInfo}, label: taskInfo.task, stageName: stage.stageName}
        })
      ))
      const filetredTasks = selectedTasks.filter(function(selectTask) {
        return !taskListCurrentlySelected.includes(selectTask.label)
      })
      setOptions(filetredTasks)
      setShowModal(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // setFormError(null)
    dispatch({ type: ACTIONS.ADD_TASK, payload: { stageName: stageName, task: taskList} })

    handleClose()
  }

  return (
    <>
      <div>
      <button type="btn" onClick={createTaskOption}>
          + Add Task
        </button>
      </div>

      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
        >
          <div>
            <div className="modal-header">
              <div className="modal-title">
                <h2>
                  Add Task:<br /> 
                  
                </h2>
              </div>
              <div>
              <span className="close-button" onClick={handleClose}>
                x
              </span>
            </div>
          </div>
        <div className="modal-desc">


          <form onSubmit={handleSubmit}>
            <div>
              <h3>Stage: {stage.name}</h3>
            </div>
            <div>
              <label>
              <h3>Task:</h3>
                <span>Select Task from Task Library:</span>
                  <Select
                    onChange={(option) => setSelectedTask(option)}
                    options={options}
                  />
                  {/* <button className="btn" onClick={handleSet}>Set Option</button> */}
              </label>
            </div>
            {/* <br />
            <div>
            <label>
              <span>Task Name: {task}</span>
              <span>Task Code: {code}</span>
              <span>Task Details: </span>
              <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
            </label>

              <p>Subcontractor:</p>
              <p>Subcontracted Amount: </p>
              <p>Charge Amount:</p>
              <p>Unclaim Amount:</p>
              <p>Status:</p>
              <p>Complete:</p>
            </div> */}
            {/* <label>
              <span>Charge Aamount:</span>
              <input
                  type="text"
                  value="{task.calculatedamount}"
                  onChange={(e) => dispatch({ type: ACTIONS.CHANGE_STATUS,
                  payload:{ task:task.task, calculatedamount:e.target.value }
                })}
                />
            </label>
            <label>
              <span>Status:</span>
                <input
                  type="text"
                  value={task.status}
                  onChange={(e) => dispatch({ type: ACTIONS.CHANGE_STATUS,
                  payload:{ task:task.task, status:e.target.value }
                })}
                />
            </label> */}


              <div className="modal-footer">
                <div>
                  <button className="btn-cancel" onClick={handleClose}>
                    Cancel
                  </button>
                </div>

                <div>
                  <button className="btn">
                    Add Task
                  </button>
                </div>
              </div>
            {formError && <p className="error">{formError}</p>}
          </form>

          </div>
        </div>
      </Modal>

    </>
  )
}


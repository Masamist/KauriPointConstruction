import { useState, useEffect } from 'react'
import { useDocument } from '../../../../hooks/useDocument'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"
import Select from 'react-select'

export default function AddStage({stage, dispatch}) {
  //Modal
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // Firebase
  const mainList_id = 'mainList'
  const { error, document } = useDocument('taskLibrary' , mainList_id)

  // Adding a stage and task in state (reStage)
  const [taskList, setTaskList] = useState([])
  const [stageOptions, setStageOptions] = useState([])
  const [selectedStage, setSelectedStage] = useState([])
  const [taskOptions, setTaskOptions] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  const [stageName, setStageName] = useState('')



  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  
  //console.log('stageListHasSelected', stageListCurrentlySelected) // e.g, Preliminary and General
  
  // const taskListCurrentlySelected = Object.entries(stage.tasks).map(([key, stageTask])=> {
  //   console.log('stageTask.name', stageTask.name)
  //   return stageTask.task
  // })
  function createStageOption() {
    // Store the tasks currently in the state 
    const stageListCurrentlySelected = Object.entries(stage).map(([key, stageName])=> {
      return stageName.name
    })
    const allStages = Object.values(document.stages).map(libStages => {
        return { stageName: libStages.name, value: libStages.tasks }       
    })
    let stageSet = allStages.filter(singleStage => !stageListCurrentlySelected)
    setStageOptions(stageSet)
    setShowModal(true)
  }

  function createTaskOption() {
    // Store the tasks currently in the state 
    const taskListCurrentlySelected = Object.entries(stage.tasks).map(([key, task])=> {
      return task.task
    })

    const setTask = Object.values(selectedTask).map(libTasks => {
      return { taskName: libTasks.value.task, value: libTasks.value }       
    })
    let stageTasks = setTask.filter(singleTask => {
      return  taskListCurrentlySelected.forEach(crrTask => crrTask !== singleTask.taskName)
    })
    setTaskOptions(stageTasks)
  }

  
  // useEffect(() => {
  //   if(document){
  //     const options = Object.entries(document.stages).map(([index, stages]) => {
  //       // return { value: {...stage, id:project.id}, label: project.name}
  //       return { value: {...stages, id: index}, label:stages.name}
  //     })
  //     setTaskList(options)
  //   }
  // }, [document])
  // console.log(taskList)

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    // dispatch({ type: ACTIONS.UPDATE_MAINLIST })
  }

  return (
    <>
      <div>
        <button type="btn" onClick={createStageOption}>
          + Add Stage
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
                  Add New Stage<br /> 
                  
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
              <label>
              <h3>Stage List:</h3>
                <span>Select Stage from Task Library:</span>
                  <Select
                    onChange={(option) => setSelectedStage(option)}
                    options={stageOptions}
                  />
              </label>
              <label>
              <h3>Stage List:</h3>
                <span>Select Task from Task Library:</span>
                  <Select
                    onChange={(option) => setSelectedTask(option)}
                    options={taskOptions}
                  />
              </label>
              <label>
              <h3>Stage List:</h3>
                <span>Create a new stage:</span>
                  <imput />
              </label>
            </div>
            <div>
              <p>Details:</p>
              <p>Subcontractor:</p>
              <p>Subcontracted Amount: </p>
              <p>Charge Amount:</p>
              <p>Unclaim Amount:</p>
              <p>Status:</p>
              <p>Complete:</p>
            </div>
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


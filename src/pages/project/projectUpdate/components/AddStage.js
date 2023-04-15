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
  const [stageOptions, setStageOptions] = useState([])
  const [selectedStage, setSelectedStage] = useState()
  const [switchTaskOption, setSwitchTaskOption] = useState(false)
  const [taskOptions, setTaskOptions] = useState([])
  const [selectedTask, setSelectedTask] = useState()


  // Modal display functions
  const handleClose = () => {
    setSwitchTaskOption(false)
    setShowModal(false)
  }
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  function createStageOption() {
    // Store the tasks currently in the state 
    const stageListCurrentlySelected = Object.entries(stage).map(([key, stageName])=> {
      return stageName.name
    })
    // console.log('stageListHasSelected', stageListCurrentlySelected) 
    
    const allStages = Object.values(document.stages).map(libStages => {
        return { label: libStages.name, value: libStages.tasks }       
    })
    let filteredStage = allStages.filter(function(singleStage) {
      return !stageListCurrentlySelected.includes(singleStage.label)
    })     
    // console.log('allStages',allStages)
    // console.log('filteredStage',filteredStage)
    setStageOptions(filteredStage)
    setShowModal(true)
  }

  // console.log('selectedStage, outside of useEffect',selectedStage)
  function createTaskOption(option) {
    setSelectedStage(option)
    setSwitchTaskOption(true)
  }

  useEffect(() => {


      if(selectedStage){
        // Creat task options (second options) 
        // console.log('selectedStage.label', selectedStage.label)
        // console.log('selectedStage.value', selectedStage.value)
        const extractValue = selectedStage.value
        // console.log('extractValue', extractValue)

        let setTask = Object.entries(extractValue).map(([key, valueTask]) => {
          return { label: valueTask.task, value: valueTask }       
        })
        setTaskOptions(setTask)
       }
    
  }, [selectedStage])

  function handleSubmit(e) {
    e.preventDefault()
    // setFormError(null)

    // console.log('selectedTask', selectedTask)
    const extractTasksValue = selectedTask.map(tasks => {
      return tasks.value
    })
    // console.log('extractTasksValue', extractTasksValue)
    dispatch({ type: ACTIONS.ADD_STAGE, 
      payload: { stage: selectedStage.label, tasks: extractTasksValue } })
      // payload: { stageAndTask: selectedStageAndTask } })
    setSelectedStage()
    handleClose()
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
                      // onChange={(option) => setSelectedStage(option)}
                      onChange={(option) => createTaskOption(option)}
                      options={stageOptions}
                    />
                </label>
                  { switchTaskOption && 
                  <label>
                    <h3>Task List:</h3>
                      <span>Select tasks from Task Library:</span>
                        <Select
                          isMulti
                          onChange={(taskOption) => setSelectedTask(taskOption)}
                          options={taskOptions}
                        />
                  </label>
                  }
              </div>


                <div className="modal-footer">
                <div>
                  <button className="btn-cancel" onClick={handleClose}>
                    Cancel
                  </button>
                </div>

                <div>
                  <button className="btn">
                    Add Stage and Task
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


import { useState, useEffect } from 'react'
import { useDocument } from '../../../../hooks/useDocument'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"
import Select from 'react-select'
import { cleanup } from '@testing-library/react'

export default function AddStage({stage, dispatch}) {
  //Modal
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // Firebase
  const mainList_id = 'mainList'
  const { error, document } = useDocument('taskLibrary' , mainList_id)

  // Adding a stage and task in state (reStage)
  const [stageOptions, setStageOptions] = useState([])
  const [selectedStage, setSelectedStage] = useState([])
  const [taskOptions, setTaskOptions] = useState([])
  const [selectedTask, setSelectedTask] = useState([])


  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  // const taskListCurrentlySelected = Object.entries(stage.tasks).map(([key, stageTask])=> {
  //   console.log('stageTask.name', stageTask.name)
  //   return stageTask.task
  // })

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

  // function createTaskOption(option) {
  //   setSelectedStage(option)

  //   if(selectedStage){
  //     // Store the tasks currently in the state 
  //     console.log('selectedStage.label', selectedStage.label)
  //     console.log('selectedStage.value', selectedStage.value)
  //     const extractValue = selectedStage.value
  //     console.log('extractValue', extractValue)
      // let setTask = { label: extractValue.task, value: extractValue }    


      // let setTask = Object.entries(extractValue).map(([key, valueTask]) => {
      //   return { label: valueTask.task, value: valueTask }       
      // })

      // const taskListCurrentlySelected = stage.filter(function(singleStage) {
      //   return singleStage.name === selectedStage.label
      // })

      // let filteredTasks = setTask.filter(function(singleTask) {
      //   console.log('filteredTask',filteredTasks)
      //   return  !taskListCurrentlySelected.includes(singleTask.label)
      // })
      // setTaskOptions(filteredTasks)
  //     }
  // }


  useEffect(() => {
      if(selectedStage !== ""){
        console.log('hello')
        // Store the tasks currently in the state 
        // console.log('selectedStage.label', selectedStage.label)
        // console.log('selectedStage.value', selectedStage.value)
        const extractValue = selectedStage.value
        // console.log('extractValue', extractValue)
        // let setTask = { label: extractValue.task, value: extractValue }    


    //     let setTask = Object.entries(extractValue).map(([key, valueTask]) => {
    //       return { label: valueTask.task, value: valueTask }       
    //     })

    //     const taskListCurrentlySelected = stage.filter(function(singleStage) {
    //       return singleStage.name === selectedStage.label
    //     })

    //     let filteredTasks = setTask.filter(function(singleTask) {
    //       console.log('filteredTask',filteredTasks)
    //       return  !taskListCurrentlySelected.includes(singleTask.label)
    //     })
    //     setTaskOptions(filteredTasks)
       }
    
    console.log('taskOptions', taskOptions);

  }, [selectedStage])



  function handleSubmit(e) {
    e.preventDefault()
    // setFormError(null)
    dispatch({ type: ACTIONS.ADD_STAGE, 
      payload: { addStage: selectedStage, addTask:selectedTask } })
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
                    onChange={(option) => setSelectedStage(option)}
                    options={stageOptions}
                  />
              </label>
              <label>
              <h3>Stage List:</h3>
                <span>Select Task from Task Library:</span>
                  <Select
                    isMulti
                    onChange={(option) => setSelectedTask(option)}
                    options={taskOptions}
                  />
              </label>
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


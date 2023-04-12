import { useState, useEffect } from 'react'
import { useDocument } from '../../../../hooks/useDocument'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"
import Select from 'react-select'

export default function AddTask({stage, dispatch}) {
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)
  const id = 'mainList'
  const { error, document } = useDocument('taskLibrary' , id)

  const [taskList, setTaskList] = useState([])
  const [tempTask, setTempTask] = useState([])

  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  function createTaskOption() {

      console.log('document',document)

      const allTasks = Object.values(document.stages).map(libStages => {
          return  { stageName: libStages.name, value: libStages.tasks }       
      })

      console.log('allTasks', allTasks)

      let stageTasks = allTasks.filter(singleStage => singleStage.stageName === stage.name)
      console.log('stageTasks', stageTasks)

      let selectedTasks

      Object.entries(stageTasks).map(([key, stage]) => (
        selectedTasks = Object.entries(stage.value).map(([id, taskInfo]) => {
          return { value: {...taskInfo, id: id}, label: taskInfo.task}
        })
      ))
      // let selectedTasks = allTasks.filter(function(singleStage){
      //   console.log('singleStage.stageName', singleStage.stageName);
      //   return (singleStage.stageName === stage.name)
      // })
      console.log(selectedTasks)
      setTaskList(selectedTasks)
      setShowModal(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    // dispatch({ type: ACTIONS.UPDATE_MAINLIST })
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
                    onChange={(option) => setTempTask(option)}
                    options={taskList}
                  />
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


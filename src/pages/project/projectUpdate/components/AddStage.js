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

  
  useEffect(() => {
    if(document){
      const options = Object.entries(document.stages).map(([index, stages]) => {
        // return { value: {...stage, id:project.id}, label: project.name}
        return { value: {...stages, id: index}, label:stages.name}
      })
      setTaskList(options)
    }
  }, [document])
  console.log(taskList)

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    // dispatch({ type: ACTIONS.UPDATE_MAINLIST })
  }

  return (
    <>
      <div>
        <button type="btn" onClick={() => setShowModal(true)}>
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
              <h3>Add</h3>
            </div>
            <div>
              <label>
              <h3>Stage List:</h3>
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


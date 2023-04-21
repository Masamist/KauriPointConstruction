import { useState, useEffect } from 'react'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"
import Select from 'react-select'
// import { useFirestore } from '../../../../hooks/useFirestore'
// import { useParams, useHistory } from 'react-router-dom'


// styles
import '../ProjectUpdate.css'
import { CLASS_TYPES } from '@babel/types'

// export default function UpdateTaskStatus({stageKey, index, task, dispatch}) {
export default function UpdateTaskStatus({stageName, index, task, dispatch}) {
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // const { updateTaskInDocument, response } = useFirestore('projects')
  // const { id } = useParams()


  const [tempCulatedamount, setTempCulatedamount] = useState(task.calculatedamount)
  const [tempStatus, setTempStatus] = useState(task.status)
  const [statusSelected, setStatusSelected] = useState()
  
  const statusOption = [
    { label:'Open', value:'open' },
    { label:'Close', value:'close' }
  ]

  // console.log('key',key)

  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  useEffect(() => {
    if(statusSelected){
      const updateStatus = statusSelected.value
      // console.log('status change',statusSelected.value)
      return setTempStatus(updateStatus)
    } 
  }, [statusSelected])
  

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    handleClose()

    dispatch({ 
      type: ACTIONS.CHANGE_STATUS, 
      payload:{ stageName:stageName, index:index, task: task, calculatedamount:tempCulatedamount , status:tempStatus }
    })
    //console.log('task', task);
    // updateTaskInDocument(id, stageKey, index, tempCulatedamount, tempStatus)
    // dispatch({ type: ACTIONS.CHANGE_STATUS, payload:{ task: task.task }})
  }

  function handleDelete(e) {
    e.preventDefault()
    handleClose()
    dispatch({ type: ACTIONS.DELETE_TASK_ITEM, payload:{ task: task.task }})  
  }

  return (
    <>
      <div>
        <button class="btn" type="btn" onClick={() => setShowModal(true)}>
          Modify
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
                  Update Task:<br /> 
                  {task.task}
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
              <p>Details: {task.details}</p>
              <p>Subcontractor: {task.subcontractor}</p>
              <p>Subcontracted Amount: {task.subcontractedamount}</p>
              <p>Charge Amount: {task.calculatedamount}</p>
              <p>Unclaim Amount: {task.stilltoclaim}</p>
              <p>Status: {task.status}</p>
              <p>Complete: {task.complete}</p>
            </div>
            <label>
              <span>Charge amount:</span>
              <input
                  type="text"
                  value={tempCulatedamount}
                  onChange={(e) => setTempCulatedamount(e.target.value)}
                />
            </label>
            <label>
              <span>Status:</span>
                {/* <input
                  type="text"
                  value={task.status}
                  onChange={(e) => dispatch({ type: ACTIONS.CHANGE_STATUS,
                  payload:{ task:task.task, status:e.target.value }
                })}
                /> */}

                <Select
                  onChange={(option) => setStatusSelected(option)}
                  options={statusOption} 
                />

            </label>
            

              <div className="modal-footer">
                <div>
                  <button className="btn-cancel" onClick={handleClose}>
                    Cancel
                  </button>
                </div>
                <div>
                  <button 
                    class="btn" 
                    type="btn"
                    onClick= {handleDelete}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button className="btn">
                    Update Task Details
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

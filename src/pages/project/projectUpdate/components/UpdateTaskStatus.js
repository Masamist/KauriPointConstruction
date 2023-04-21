import { useState, useEffect } from 'react'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"
import Select from 'react-select'
// import { useFirestore } from '../../../../hooks/useFirestore'
// import { useParams, useHistory } from 'react-router-dom'


// styles
import '../ProjectUpdate.css'
import { CLASS_TYPES } from '@babel/types'
import { FormInput } from '../../../create/Create'

// export default function UpdateTaskStatus({stageKey, index, task, dispatch}) {
export default function UpdateTaskStatus({stageName, index, task, dispatch}) {
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // const { updateTaskInDocument, response } = useFirestore('projects')
  // const { id } = useParams()


  const [tempCulatedamount, setTempCulatedamount] = useState(task.calculatedamount)
  const [details, setDetails] = useState(task.details)
  const [subcontractor, setSubcontractor] = useState(task.subcontractor)
  const [subcontractedamount, setSubcontractedamount] = useState(task.subcontractedamount)
  const [calculatedamount, setCalculatedamount] = useState(task.calculatedamount)
  const [status, setStatus] = useState(task.status)
  const [quoteEstimateOrProvision, setQuoteEstimateOrProvision] = useState()
  
  // console.log('key',key)

  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    handleClose()

    dispatch({ 
      type: ACTIONS.CHANGE_STATUS, 
      payload:{ stageName:stageName,
                index:index,
                task: task,
                calculatedamount:tempCulatedamount,
                status: status,
              }
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
              <FormInput label='Details' 
                          value={details} 
                          onChange={setDetails} />
              <FormInput label='Subcontractor' 
                          value={subcontractor} onChange={setSubcontractor} />
              <FormInput label='Subcontracted Amount' 
                          value={subcontractedamount} 
                          onChange={setSubcontractedamount} />
              <FormInput label='Charge Amount' 
                          value={calculatedamount} 
                          onChange={setCalculatedamount} />
              <FormInput label='Status' 
                          value={status} 
                          options={['open', 'closed']}
                          onChange={setStatus} />
              <FormInput label='Details' 
                          value={details} 
                          onChange={setDetails} />
              
            </div>
            <label>
              <span>Charge amount:</span>
              <input
                  type="text"
                  value={tempCulatedamount}
                  onChange={(e) => setTempCulatedamount(e.target.value)}
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

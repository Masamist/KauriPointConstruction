import { useState } from 'react'
import { ACTIONS } from '../ProjectUpdateMainList'
import Modal from "react-overlays/Modal"

// styles
import '../ProjectUpdate.css'


// export default function UpdateTaskStatus(task, dispatch) {
export default function UpdateTaskStatus({task, dispatch}) {
  const [showModal, setShowModal] = useState(false)
  const [formError, setFormError] = useState(null)

  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)
    dispatch({ type: ACTIONS.UPDATE_MAINLIST })
  }

  return (
    <>
      <div>
        <button class="btn" type="btn" onClick={() => setShowModal(true)}>
          Update
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
                <h3>Update Project Main List: "Task Item"</h3></div>
                <div>
                  <span className="close-button" onClick={handleClose}>
                    x
                  </span>
                </div>
              </div>
              <div className="modal-desc">


                <form onSubmit={handleSubmit}>
                <div>
                  <span>Task Name: {task.task}</span>
                  <p>Subcontractor: {task.subcontractor}</p>
                  <p>Charge Amount: {task.calculatedamount}</p>
                  <p>Status: {task.status}</p>
                </div>
                <label>
                  <span>Status:</span>
                    <input
                      type="text"
                      value={task.status}
                      onChange={(e) => dispatch({ type: ACTIONS.CHANGE_STATUS,
                      payload:{ task:task.task, status:e.target.value }
                    })}
                    />
                </label>
                {/* <label>
                  <span>Culculated damount:</span>
                    <input
                      required 
                      type="date" 
                      // onChange={(e) => setStartDate(e.target.value)} 
                      value={task.culculatedamount}
                    />
                </label>
                <label>
                  <span>Still to Claim:</span>
                  <input
                    required 
                    type="text" 
                    // onChange={(e) => setGSTno(e.target.value)}
                    value={task.stilltoclaim}
                  />
                </label>
                <label>
                  <span>Status:</span>
                  <input
                    required 
                    type="number" 
                    // onChange={(e) => setSubContractFee(e.target.value)}
                    value={task.status}
                  />
                </label>

                <label>
                  <span>Task Details:</span>
                  <textarea 
                    required
                    // onChange={(e) => setDescription(e.target.value)}
                    value={task.detail} 
                  ></textarea>
                </label> */}

                  <div className="modal-footer">
                    <div>
                      <button className="btn-cancel" onClick={handleClose}>
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button className="btn">
                        Update Project Details
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

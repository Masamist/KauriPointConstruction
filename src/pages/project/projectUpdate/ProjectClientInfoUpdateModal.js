import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useFirestore } from '../../../hooks/useFirestore'

import Modal from "react-overlays/Modal"

export default function ProjectClientInfoUpdateModal({ project }) {
  const { updateDocument, response } = useFirestore('projects')
  const [formError, setFormError] = useState(null)
  const history = useHistory()
  const { id } = useParams()
  const location = useLocation()

  console.log(location.pathname)

  // const [ currentProject, setCurrentProject ] = useState('projects')
  const [ clientName, setClientName]  = useState(project.clientName)
  const [ phone, setPhone ] = useState(project.phone)
  const [ email, setEmail ] = useState(project.email)
  const [showModal, setShowModal] = useState(false)


  const handleClose = () => setShowModal(false)

  const handleSave = () => {
    console.log("success")
  }

  const renderBackdrop = (props) => <div className="backdrop" {...props} />


  const handleUpdate = async(e) => {
    e.preventDefault()
    setFormError(null)


    // const address = {
    //     line1,
    //     line2,
    //     suburb,
    //     city,   
    // }

    const updateProject = {
      clientName,
      phone,
      email,
    }

    await updateDocument(id, updateProject)

    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="project-client-info">
      <div>
        <button type="button" onClick={() => setShowModal(true)}>
          Update Customer Detail
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
                <h3>Update Client details:</h3></div>
              <div>
                <span className="close-button" onClick={handleClose}>
                  x
                </span>
              </div>
            </div>
            <div className="modal-desc">
              <p>Modal body contains text.</p>
              <form onSubmit={handleUpdate}>
    <label>
      <span>Client:</span>
      <input
        required 
        type="text" 
        key="clientName"
        onChange={(e) => setClientName(e.target.value)}
        value={clientName}
      />
    </label>
    <label>
      <span>Phone:</span>
      <input
        required 
        type="text" 
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
    </label>
    <label>
      <span>Email:</span>
      <input
        required 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </label>
    <button className="btn">Update Client Detail</button>
    {formError && <p className="error">{formError}</p>}
  </form>

              
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={handleClose}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleSave}>
                Update
              </button>
            </div>
          </div>
      </Modal>


    </div>    
  )
}
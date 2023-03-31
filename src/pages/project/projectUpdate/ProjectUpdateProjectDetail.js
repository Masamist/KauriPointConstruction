import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useFirestore } from '../../../hooks/useFirestore'
import Modal from "react-overlays/Modal"

// styles
import './ProjectUpdateClientInfoModal.css'

export default function ProjectUpdateClientInfoModal({ project }) {
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
  const [line1, setLine1] = useState(project.address.line1)
  const [line2, setLine2] = useState(project.address.line2)
  const [suburb, setSuburb] = useState(project.address.suburb)
  const [city, setCity] = useState(project.address.city)
  const [showModal, setShowModal] = useState(false)


  const handleClose = () => setShowModal(false)

  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  const handleUpdate = async(e) => {
    e.preventDefault()
    setFormError(null)

    const address = {
        line1,
        line2,
        suburb,
        city,   
    }

    const updateProject = {
      clientName,
      phone,
      email,
      address,
    }

    await updateDocument(id, updateProject)

    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="project-client-info">
      <div>
        <button type="btn" onClick={() => setShowModal(true)}>
          + Update Client Details
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
                <h3>Update Client Details:</h3></div>
              <div>
                <span className="close-button" onClick={handleClose}>
                  x
                </span>
              </div>
            </div>
            <div className="modal-desc">

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
                <label>
                  <span>Address:</span>
                  <p>Line 1</p>
                  <input
                    required 
                    type="text" 
                    onChange={(e) => setLine1(e.target.value)}
                    value={line1}
                  />
                  <p>Line 2</p>
                  <input
                    type="text" 
                    onChange={(e) => setLine2(e.target.value)}
                    value={line2}
                  />
                  <p>Suburb</p>
                  <input
                    required 
                    type="text" 
                    onChange={(e) => setSuburb(e.target.value)}
                    value={suburb}
                  />
                  <p>City</p>
                  <input
                    required 
                    type="text" 
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </label>
                <div className="modal-footer">
                  <div>
                    <button className="btn-cancel" onClick={handleClose}>
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button className="btn">
                      Update Client Detail
                    </button>
                  </div>
                </div>
              {formError && <p className="error">{formError}</p>}
            </form>


            </div>
          </div>
      </Modal>

    </div>    
  )
}
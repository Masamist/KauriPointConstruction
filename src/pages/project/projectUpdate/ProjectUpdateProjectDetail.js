import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useFirestore } from '../../../hooks/useFirestore'
import Modal from "react-overlays/Modal"

// styles
import './ProjectUpdate.css'


export default function ProjectUpdateProjectDetail({ project }) {
  const { updateDocument, response } = useFirestore('projects')
  const [formError, setFormError] = useState(null)
  const history = useHistory()
  const { id } = useParams()
  const location = useLocation()


  console.log(location.pathname)

  const [startDate, setStartDate] = useState('DATE') //(project.startDate.toDate().toISOString().substring(0, 10))
  const [GSTno, setGSTno] = useState(project.GSTno)
  const [subContractFee, setSubContractFee] = useState(project.subContractFee)
  const [description, setDescription] = useState(project.description)
  const [memberName, setMemberName ] = useState('') 
  const [memberRole, setMemberRole ] = useState('') 
  const [memberRate, setMemberRate ] = useState('') 
  const [teamList, setTeamList] = useState(project.team)

  console.log(project.team)

  const [showModal, setShowModal] = useState(false)

  // Modal display functions
  const handleClose = () => setShowModal(false)
  const renderBackdrop = (props) => <div className="backdrop" {...props} />

  // Modifing Staff Members functions
  const handleTeamAdd = () => {
    const member = {name: memberName, role: memberRole, rate: memberRate}
    setTeamList([...teamList, member])
    setMemberName('')
    setMemberRole('') 
    setMemberRate('') 
  }
  const handleTeamRemove = (index) => {
    const list = [...teamList]
    list.splice(index, 1)
    setTeamList(list)
  }


  const handleUpdate = async(e) => {
    e.preventDefault()
    setFormError(null)


    const updateProject = {
      GSTno,
      subContractFee,
      description,
      team: teamList,
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
          + Update Project Details
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
                <h3>Update Project Details:</h3></div>
                <div>
                  <span className="close-button" onClick={handleClose}>
                    x
                  </span>
                </div>
              </div>
              <div className="modal-desc">


                <form onSubmit={handleUpdate}>
                <label>
                  <span>Start date:</span>
                    <input
                      required 
                      type="date" 
                      onChange={(e) => setStartDate(e.target.value)} 
                      value={startDate}
                    />
                </label>
                <label>
                  <span>GST No:</span>
                  <input
                    required 
                    type="text" 
                    onChange={(e) => setGSTno(e.target.value)}
                    value={GSTno}
                  />
                </label>
                <label>
                  <span>Sub Contract Fee:</span>
                  <input
                    required 
                    type="number" 
                    onChange={(e) => setSubContractFee(e.target.value)}
                    value={subContractFee}
                  />
                </label>

                <label>
                  <span>Project Description:</span>
                  <textarea 
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} 
                  ></textarea>
                </label>


                {/* <div>
                  <h3>Assign Staff Members</h3>
                  {teamList ? teamList.map((singleStaff, index) => {
                    return (
                    <>
                      <div key={index}>
                        <div>
                          <span>Staff {index + 1}:</span>
                          <p><span>Staff Name: </span> {singleStaff.name}</p>
                          <p><span>Role: </span> {singleStaff.role}</p>
                          <p><span>Rate: </span> {singleStaff.rate}</p>            
                        </div>
                        <button 
                            type="button" 
                            className="btn"
                            onClick={() => handleTeamRemove(index)}
                          >
                          Remove
                        </button>
                      </div>
                    </>
                  )
                  }) : <p>No team staff assigned</p>}
                </div> */}

                <form>
                  <label>
                    <div>
                      <span>New Staff:</span>
                      <p>Staff Name</p>
                      <input 
                        name="name" 
                        type="text" 
                        id="name" 
                        required
                        value={memberName}
                        
                        onChange = {(e) => setMemberName(e.target.value)}
                      />
                      <p>Role</p>
                      <input 
                        name="role" 
                        type="text" 
                        id="role" 
                        required
                        value={memberRole}
                        onChange = {(e) => setMemberRole(e.target.value)}
                      />
                      <p>Rate</p>
                      <input 
                        name="rate" 
                        type="text" 
                        id="rate" 
                        required
                        value={memberRate}
                        onChange = {(e) => setMemberRate(e.target.value)}
                      />
                      <button className="btn" onClick={handleTeamAdd}>Add Staff</button>                     
                    </div>
                  </label>
                </form>


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

    </div>    
  )
}
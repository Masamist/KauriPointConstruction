import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDocument } from '../../hooks/useDocument'


import Modal from "react-overlays/Modal";
import Sidebar from '../../components/Sidebar'
import ProjectClientInfo from './ProjectClientInfo'
import ProjectDetail from './ProjectDetail'
import ProjectLabourList from './ProjectLabourList'

import ProjectClientInfoUpdate from './projectUpdate/ProjectClientInfoUpdate'


// styles
import './Project.css'


export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects' , id)

  const [ switchLabourList, SetSwitchLabourList ] = useState(false)
  const [ switchUpdate, setSwitchUpdate ] = useState(false)
  const [showModal, setShowModal] = useState(false);

  
  if(error) {
    return <div className="error">{error}</div>
  }
  if(!document) {
    return <div className="loading">Loading...</div>
  }

  // Switches to swap Update components
  const handleSwitchUpdate = () => {
    setSwitchUpdate(!switchUpdate)
  }

  const handleSwitchList = () => {
    SetSwitchLabourList(!switchLabourList)
  }

  const handleClose = () => setShowModal(false)

  const handleSave = () => {
    console.log("success")
  }

  const renderBackdrop = (props) => <div className="backdrop" {...props} />


  return (
    <div className='page-container'>
      <Sidebar />
      <div className='content-container'>
        <div className="project">
          {!switchUpdate && 
            <ProjectClientInfo project={document}/>
          }
          {switchUpdate && <ProjectClientInfoUpdate project={document} />}

          <div>
            <button className="btn" onClick={ handleSwitchUpdate }>+ Update Customer Detail</button>
          </div>
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
                  <div className="modal-title">Update Customers Detail</div>
                  <div>
                    <span className="close-button" onClick={handleClose}>
                      x
                    </span>
                  </div>
                </div>
                <div className="modal-desc">
                  <p>Modal body contains text.</p>
                  <form>
                  <input></input>
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
          


          <div>
            <button onClick={ handleSwitchList } className="btn" id={switchLabourList ? 'btn-disabled' : 'btn-active'}>MainList</button>
            <button onClick={ handleSwitchList } className="btn" id={!switchLabourList ? 'btn-disabled' : 'btn-active'}>LabourList</button>
          </div>       
          {!switchLabourList && <ProjectDetail project={document} />}
          {switchLabourList && <ProjectLabourList project={document} />}
        </div>
      </div>
    </div>
  )
}
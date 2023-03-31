import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useFirestore } from '../../../hooks/useFirestore'

export default function ProjectClientInfoUpdate({ project }) {
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

  // console.log('clientName',clientName)
  // console.log('id', id)

  const handleUpdate = async(e) => {
    e.preventDefault()
    setFormError(null)


    // const address = {
    //     line1,
    //     line2,
    //     suburb,
    //     city,   
    // }

    // const project = {
    //   name: project.name,
    //   clientName: clientName,
    //   phone: phone,
    //   email: email,
    //   address, 
    //   mainList: project.mainlist,
    //   labourList: project.labourList,
    //   startDate: project.labourList,
    //   GSTno: project.GSTno,
    //   subContractFee: project.subContractFee,
    //   description: project.description,
    //   team: project.team,
    // }

    const updateProject = {
      clientName,
      phone,
      email,
    }

    // console.log(id)
    // console.log('updateProject',updateProject)

    await updateDocument(id, updateProject)

    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="project-client-info">
      <h2 className="page-title">Project: {project.name}</h2> 
      <h3>Update Client details:</h3>

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
  )
}
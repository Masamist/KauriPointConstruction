import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

const taskGroupList = [
  { value: 'preliminaryAndGeneral', label: 'Preliminary And General'},
  { value: 'equipmentAndMachinery', label: 'Equipment And Machinery'},
  { value: 'siteWorks', label: 'Site Works'},
  { value: 'concreteWorks', label: 'Concrete works'},
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  // const [financialSummary, setfinancialSummary] = useState([])
  const [taskGroup, setTaskGroup] = useState('')
  const [startDate, setStartDate] = useState('')
  const [gstNo, setGstNo] = useState('')
  const [subContractFee, setSubContractFee] = useState('')
  const [description, setDescription] = useState([])
  const [staffOne, setStaffOne] = useState('')
  const [staffTwo, setStaffTwo] = useState('')
  const [staffThree, setStaffThree] = useState('')
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if(documents){
      const options = documents.map(user => {
        return { value: user, label: user.displayName}
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!taskGroup){
      setFormError('Please select a task group')
      return
    }

    const mainList = {
      taskGroup: taskGroup.value,

    }

    const staffRate = {
      staffOne,
      staffTwo,
      staffThree
    }

    const createdBy = {
      displayName:user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    
    const project = {
      name,
      client,
      phone,
      email,
      address, 
      financialSummary: [],
      mainList,
      startDate: timestamp.fromDate(new Date(startDate)),
      gstNo,
      subContractFee,
      description,
      staffRate,
      createdBy,
    }

    await addDocument(project)
    if (!response.error) {
      history.push('/')
    }
  }




  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <h3>Client details:</h3>
        <label>
          <span>Client:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setClient(e.target.value)}
            value={client}
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
          <input
            required 
            type="text" 
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        <h3>Financial Summary:</h3>
        {/* - total excluding gst
        - GST
        -Total including GST
        -Payment Claim to Due
        - Current Claim
        -Cost to Completion */}
        <label>
          <span>Total excluding GST:</span>
          {/* <input
            type="number" 
            onChange={(e) => setName(e.target.value)}
            value={address}
          /> */}
        </label>
        <h3>Main List:</h3>
        <label>
          <span>Task Group:</span>
          <Select
            onChange={(option) => setTaskGroup(option)}
            options={taskGroupList}
          
          />
        </label>
        <h3>Project Details:</h3>
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
            type="number" 
            onChange={(e) => setGstNo(e.target.value)}
            value={gstNo}
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
        <label>
          <span>Staff 1: Foreman</span>
          <input
            type="number" 
            onChange={(e) => setStaffOne(e.target.value)}
            value={staffOne}
          />
        </label>
        <label>
          <span>Staff 2: Builder</span>
          <input
            required 
            type="number" 
            onChange={(e) => setStaffTwo(e.target.value)}
            value={staffTwo}
          />
        </label>
        <label>
          <span>Staff 3: Apprentice</span>
          <input
            required 
            type="number" 
            onChange={(e) => setStaffThree(e.target.value)}
            value={staffThree}
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
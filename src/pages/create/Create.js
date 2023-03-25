import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
// import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
// import Select from 'react-select'

// styles
import './Create.css'
import Sidebar from '../../components/Sidebar'


export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('taskLibrary')
  // const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  // const [financialSummary, setfinancialSummary] = useState([])
  const [taskGroup, setTaskGroup] = useState([])
  const [tempMainList, setTempMainList] = useState([])
  // const [mainList, setMainList] = useState([])
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
      const options = documents.map(task => {
        return { value: {...task, id:task.id}, label: task.taskGroup}
      })
      setTaskGroup(options.reverse())
    }
  }, [documents])

  console.log(taskGroup)
  console.log(tempMainList)
  
  const handleChecklist = (e) => {
    const newCheck = e.target.value
    if (!tempMainList.includes(newCheck)){
        setTempMainList(    
        [...tempMainList, newCheck]   
      )
    }
    else {
      const index = tempMainList.indexOf(newCheck)
      if (index > -1) {
        tempMainList.splice(index, 1)
      }
    }
  }


  const checkbox = taskGroup.map((t) => (
    <div className="check-box" key={t.value.id} >
      <label htmlFor={t.value.id}>{t.label}</label>
      <input type="checkbox"
        onChange={handleChecklist} 
        // onChange={(e) => setTempMainList(e.target.value)}  
        id={t.value.id}
        name={t.value.id} 
        value={t.value.taskGroup} /> 
    </div>
    ))


  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!taskGroup){
      setFormError('Please select a task group')
      return
    }

    //   const mainList = taskGroup.map(t => {
      
    //   if(tempMainList.includes(t.label)){
    //      return t.value
    //     } 
    //   }
    // })

    // const mainList = taskGroup.map(t => {
      
    //   if(tempMainList.includes(t.label)){
    //      return t.value
    //     } 
    //   }
    // })



    const mainList = tempMainList.map((t) => {     
      return {
        id: t.id,
        taskGroup: t.taskGroup,
      }    
    })

    const staffRate = {
      staffOne,
      staffTwo,
      staffThree
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
    }

    await addDocument(project)

    if (!response.error) {
      history.push('/')
    }
  }


  return (
    <>
    <Sidebar />
    <div className='content-container'>
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
        <span>Task Group:</span>

        {checkbox}


          {/* <Select
            onChange={(option) => setTaskGroup(option)}
            options={taskGroup}
            isMulti
          /> */}

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
    </div>
    </>
  )
}
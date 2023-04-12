import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
// import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

// styles
import './Create.css'
import Sidebar from '../../components/Sidebar'


export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('projects')
  // const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [suburb, setSuburb] = useState('')
  const [city, setCity] = useState('')
  
  // const [financialSummary, setfinancialSummary] = useState([])
  const [projectList, setProjectList] = useState([])
  const [tempMain, setTempMain] = useState([])
  const [tempLabourList, setTempLabourList] = useState([])

  const [startDate, setStartDate] = useState('')
  const [GSTno, setGSTno] = useState('')
  const [subContractFee, setSubContractFee] = useState('')
  const [description, setDescription] = useState([])
  const [memberName, setMemberName ] = useState('') 
  const [memberRole, setMemberRole ] = useState('') 
  const [memberRate, setMemberRate ] = useState('') 
  const [teamList, setTeamList] = useState([])

  // console.log(teamList)

  const [formError, setFormError] = useState(null)

  // console.log(startDate)
  useEffect(() => {
    if(documents){
      const options = documents.map(project => {
        return { value: {...project, id:project.id}, label: project.name}
      })
      setProjectList(options)
    }
  }, [documents])

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

  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!projectList){
      setFormError('Please select a task group')
      return
    }

    const address = {
        line1,
        line2,
        suburb,
        city,   
    }

    let project = {
      name,
      clientName,
      phone,
      email,
      address, 
      mainList: tempMain.value.mainList,
      labourList: tempLabourList.value.labourList,
      startDate: timestamp.fromDate(new Date(startDate)),
      GSTno,
      subContractFee,
      description,
      team: teamList,
    }

    await addDocument(project)

    if (!response.error) {
      history.push('/')
    }
  }


  return (
    <div className='page-container'>
    <Sidebar />
    <div className='content-container'>
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <div className='content-section'>
          <label>
            <span>Project name:</span>
            <input
              required 
              type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
        </div>
        <h3>Client details</h3>
        <div className='content-section'>
          <label>
            <span>Client:</span>
            <input
              required 
              type="text" 
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
        </div>

        
        <h3>Project Details</h3>
        <div className='content-section'>
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
        </div>


        <h3>Lists Templates</h3>
        <div className='content-section'>
          <label>
            <span>Main List:</span>
              <Select
                onChange={(option) => setTempMain(option)}
                options={projectList}
              />
          </label>
          
          
          <label>
          <span>Labour List:</span>
            <Select
              onChange={(option) => setTempLabourList(option)}
              options={projectList}
            />
            <br />
            {/* <input
              type="number" 
              onChange={(e) => setName(e.target.value)}
              value={address}
            /> */}
          </label>
        </div>

        <h3>Assign Staff Members</h3>
        <div className='content-section'>
          <div className='assigned-staff'>
          {teamList.map((singleStaff, index) => {
            const name = singleStaff.name ? singleStaff.name : '-no-name-'
            const role = singleStaff.role ? singleStaff.role : '-no-roll-'
            const rate = singleStaff.rate ? singleStaff.rate : '-no-rate-'
            return (
                <div key={index}>
                  <div className='staffMember'>
                    <span>Staff {index + 1}:</span>
                    <p>{name}</p>
                    <p>{role}</p>
                    <p>{rate}</p>  
                    <button 
                      type="button" 
                      className="btn-red"
                      onClick={() => handleTeamRemove(index)}
                      >
                      Remove
                    </button>          
                  </div>
                  
                </div>
            )})}
          </div>
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
        </div>

        {/* <label>
          <span>Staff 1:</span>
          <p>Name</p>
          <input
            type="text" 
            onChange={(e) => setStaffName(e.target.value)}
            value={staffName}
          />
          <p>Role</p>
          <Select
            onChange={(option) => setStaffRole(option)}
            options={staffRoleOption}
          />
          <p>Rate</p>
          <input
            type="number" 
            onChange={(e) => setStaffRate(e.target.value)}
            value={staffRate}
          />
        </label> */}
        <div className='align-btn'>
          <button className="btn add-btn">Add Project</button>
        </div>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    </div>
    </div>
  )
}
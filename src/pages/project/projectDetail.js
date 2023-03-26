import { format } from "path"
import './ProjectDetail.css'

export default function ProjectDetail({project}) {

    const name = project.name
    const startDate = project.startDate ? Object.entries(project.startDate).map( ([key,value]) => {return key + ': ' + value / 60 / 60 / 24 / 365 }) : "undefined"
    const clientName = project.clientName
    const phone = project.phone ? project.phone : '-'
    const email = project.email ? project.email : '-'
    const address = Object.entries(project.address).map( ([key,value]) => { return (key + ': ' + value + ', ') })
    const details = project.description ? project.description : '-' 
    const subContractFee = project.subContractFee ? project.subContractFee * 100 + '%' : '-'

  return (
    <div className="project-detail">
      <div className="project-summary">
        <h2 className="page-title">Project: {name}</h2>
        <p>Phone: {phone}</p>
        <p>Client Name: {clientName}</p>
        <p>Email: {email}</p>
        <p>Address: {address.line1}</p>
        {/* {!address && address.map((add) => (
          <>{add.line1}</>
        ))}
        <p>{address.line1}</p> */}
        

        {/* Financial details */}
        <div>
            <p><span>Total excluding GST:</span>$00.00</p>
            <p><span>GST:</span>$00.00</p>
            <p><span>Total including GST:</span>$00.00</p>
            <p><span>Payment Claim to Date excluding GST:</span>$00.00</p>
            <p><span>Current Claim excluding GST:</span>$00.00</p>
            <p><span>Cost to Completion excluding GST:</span>$00.00</p>
        </div>
        
        <MainList mainList={project.mainList} />

        <h3>Project Detail</h3>
        <p className="due-date">
          Start date:
        </p>
        <p>GST NO: {project.GSTno}</p>
        <p>Sub Contract Fee: {subContractFee}</p>
        <p className="details">{details}</p>
        <p>Staff Rate:</p>
        <table class="team-table">
          <tr>
            <th>Staff</th>
            <th>Rate</th>
            <th>9.5H</th>
            <th>Week</th>
            <th>Month</th>
          </tr>
        {project.team.map((t) => (
          <tr>
            <td>{t.staff}</td>
            <td>{t.role}</td>
            <td>{t.rate}</td>
            <td>{t.rate}</td>
            <td>{t.rate}</td>
            <td></td>
          </tr>
        ))}
          
        </table>
                {/* <h4>Staff Rate:</h4>
        {project.staffRate.map(staff => (
          <div key={staff.name}>{staff.name} {staff.rate}</div>
        ))} */}
      </div>
    </div>
  )
}

function MainList({ mainList }) {
  return (
    <>
      {Object.entries(mainList).map( ([key, tasks]) => { return ( 
        <div key={key}>
          <strong>{key}</strong>
          <MainListTask tasks={tasks}/>
        </div> 
    )})}
    </>
  )
}

function MainListTask( {tasks} ) {
  return (
    <>
      {Object.entries(tasks).map( ([key, task]) => {
        const name = task.task
        return (
          <div key={key}>
            <span>{name}</span>
          </div>
        )
      })}
    </>
  )
}
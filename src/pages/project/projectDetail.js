//import { format } from "path"

export default function ProjectDetail({project}) {

    const name = project.name
    //const startDate = project.startDate ? Object.entries(project.startDate).map( ([key,value]) => {return key + ': ' + value / 60 / 60 / 24 / 365 }) : "undefined"
    const clientName = project.clientName
    const phone = project.phone ? project.phone : '-'
    const email = project.email ? project.email : '-'
    const address = Object.entries(project.address).map( ([key,value]) => { return (key + ': ' + value + ', ') })
    const details = project.description ? project.description : '-' 
    //const subContractFee = project.subContractFee ? project.subContractFee * 100 + '%' : '-'

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">Project: {name}</h2>
        <p>Client Name: {clientName}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>

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
        <p>GST NO: {project.gstNo}</p>
        <p>Sub Contract Fee: {project.gstNo}%</p>
        <p className="details">{details}</p>
        <p>Staff Rate:</p>

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
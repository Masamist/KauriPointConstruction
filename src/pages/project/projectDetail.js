
export default function projectDetail({project}) {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">Project: {project.name}</h2>
        <p>Client Name: {project.client}</p>
        <p>Phone: {project.phone}</p>
        <p>Email: {project.email}</p>
        <p>Address: {project.address}</p>

        {/* Financial details */}
        <div>
            <p><span>Total excluding GST:</span>$00.00</p>
            <p><span>GST:</span>$00.00</p>
            <p><span>Total including GST:</span>$00.00</p>
            <p><span>Payment Claim to Date excluding GST:</span>$00.00</p>
            <p><span>Current Claim excluding GST:</span>$00.00</p>
            <p><span>Cost to Completion excluding GST:</span>$00.00</p>
        </div>
        

        {/* Main List */}
        <h3>Main LIst</h3>
        <p>Task Group</p>
        <p>{project.taskGroup}</p>

        
        <h3>Project Detail</h3>
        <p className="due-date">
          Start date: {project.startDate}
        </p>
        <p>GST NO: {project.gstNo}</p>
        <p>Sub Contract Fee: {project.gstNo}%</p>
        <p className="details">{project.discription}</p>
        <p>Staff Rate:</p>

        {/* <h4>Staff Rate:</h4>
        {project.staffRate.map(staff => (
          <div key={staff.name}>{staff.name} {staff.rate}</div>
        ))} */}
      </div>
    </div>
  )
}

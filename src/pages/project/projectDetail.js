
export default function projectDetail({project}) {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">Project: {project.name}</h2>
        <p>Client Name: {project.client}</p>
        <p>Phone: {project.phone}</p>
        <p>Email: {project.email}</p>
        <p>Address: {Object.entries(project.address).map( ([key,value]) => { return (key + ': ' + value + ', ') })}</p>
        <h4>Task Group</h4>
        <p>{project.taskGroup}</p>
        
        <h4>Project Detail</h4>
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

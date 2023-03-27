export function ProjectClientInfo({ project }) {
  const name = project.name
  const clientName = project.clientName
  const phone = project.phone ? project.phone : '-'
  const email = project.email ? project.email : '-'

  return (
    <>
      <h2 className="page-title">Project: {name}</h2>       
        <p>Client Name: {clientName}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Address: 
          <span> {project.address.line1}, </span>
          <span>{(!project.address.line2) && (!project.address.line2 === "") && `${project.address.line2},`} </span>
          <span>{project.address.suburb}, </span>
          <span>{project.address.city}</span>
        </p>
    </>
  )
}
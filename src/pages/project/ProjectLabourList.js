
export default function ProjectLabourList({project}) {

    // const startDate = project.startDate ? Object.entries(project.startDate).map( ([key,value]) => {return key + ': ' + value / 60 / 60 / 24 / 365 }) : "undefined"
    const startdate = project.startDate.toDate().toDateString()
    // const address = Object.entries(project.address).map( ([key,value]) => { return (key + ': ' + value + ', ') })
    const details = project.description ? project.description : '-' 
    const subContractFee = project.subContractFee ? project.subContractFee * 100 + '%' : '-'

  return (
    <div className="project-detail">
      <div className="project-summary">
        <h3>Labour Const Breakdown by Stage</h3>
        <p>Table here</p>
        
      </div>
    </div>
  )
}

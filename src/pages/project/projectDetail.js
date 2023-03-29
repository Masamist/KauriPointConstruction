import React from "react"
import MainList from "../../components/MainList"

// styles
import './ProjectDetail.css'

export default function ProjectDetail({project}) {

    const startDate = project.startDate ? Object.entries(project.startDate).map( ([key,value]) => {return key + ': ' + value / 60 / 60 / 24 / 365 }) : "undefined"
    const details = project.description ? project.description : '-' 
    const subContractFee = project.subContractFee ? project.subContractFee * 100 + '%' : '-'

  return (
    <div className="project-detail">
      <div className="project-summary">

        {/* Financial details */}
        <div>
            <p><span>Total excluding GST:</span>$00.00</p>
            <p><span>GST:</span>$00.00</p>
            <p><span>Total including GST:</span>$00.00</p>
            <p><span>Payment Claim to Date excluding GST:</span>$00.00</p>
            <p><span>Current Claim excluding GST:</span>$00.00</p>
            <p><span>Cost to Completion excluding GST:</span>$00.00</p>
        </div>
        
        <MainList stages={project.mainList} />

        <h3>Project Detail</h3>
        <p className="due-date">
          Start date: {startDate}
        </p>
        <p>GST NO: {project.GSTno}</p>
        <p>Sub Contract Fee: {subContractFee}</p>
        <p>Descriptions:</p>
        <p className="details">{details}</p>
        
        <p>Staff Rate:</p>
        <table className="team-table">
          <tr>
            <th>Staff</th>
            <th>Role</th>
            <th>Rate</th>
            <th>9.5H</th>
            <th>Week</th>
            <th>Month</th>
          </tr>
        {Object.entries(project.team).map( ([key, member]) => {
          return (
            (member.name &&
            <React.Fragment key={key}>
                <tr>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>$ {member.rate}</td>
                    <td>$ {parseFloat(member.rate) * 9.5 }</td>
                    <td>$ {parseFloat(member.rate) * 45 }</td>
                    <td>$ {parseFloat(member.rate) * 180 }</td>
                </tr>
            </React.Fragment>
            )
          )
          })}   
        </table>
      </div>
    </div>
  )
}
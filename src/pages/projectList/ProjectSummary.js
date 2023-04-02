import { stringify } from 'json5';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import { ProgressBar, calculateProjectProgress } from '../../components/ProgressBar'
// styles
import './ProjectSummary.css'
import { useState } from 'react';


export default function ProjectSummary({ projects, handleSetProject }) {

  return (
    <div className="project-summary">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => {
        const results = calculateProjectProgress(project);
        const claimed = (results.totalClaimed / results.totalCost) * 100

        return (
          <ProjectListCard key={project.id} project={project} claimed={claimed} handleSetProject={handleSetProject}/>
      )})}
    </div>
  )
}

function ProjectListCard({project, claimed, handleSetProject}) {
  const [expandProjectListCard, setExpandProjectListCard] = useState(false) 

  const handleExpandProjectListCard = () => {
    setExpandProjectListCard(!expandProjectListCard)
  }

  const handleEnterProject = () => {
    handleSetProject(project)
  }
//<p>{dayjs(project.startDate.toDate()).format('DD/MMM')}</p>
  return (
    <>
    <div className='projectListCard'>
      <div className='title'>
        <div className='arrow-right' onClick={handleExpandProjectListCard}/>
        
          <h4 onClick={handleEnterProject}>{project.name}</h4>
       
      </div>
        <ProgressBar initial={claimed} warning={claimed} progress={claimed}/>
        
    </div>
    {expandProjectListCard && <CardStages />}
    </>
  )
}

function CardStages() {
  return (
    <div className='cardStages'>Stages</div>
  )
}
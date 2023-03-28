import './team.css'

export default function Team() {
    return (
        <div>
            <TeamPoster />
            <ManagerCard />
        </div>
    )   
}

function TeamPoster() {
    return (
        <div className='teamposter'>
            <div className='teamBackingImage'></div>
            <h1>Kauri Point Construction</h1>
            <p>
                Lorem Ipsum
            </p>

        </div>
    )
}

function ManagerCard() {
    
    return (
        <div className='managerCard'>
            <div className='text'>
                <h3>Manager</h3>
                <h1>Simon Cattley</h1>
                <div className='greenLine'></div>
                <p>Lorem Ipsum</p>
            </div>
            <img className='photo-right' alt='team member'></img>
        </div>
    )
}
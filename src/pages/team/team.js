import './team.css'
//mugshot photos
import mugshotSimon from '../../assets/team/Simon.jpg'
import mugshotCam from '../../assets/team/Cam.jpg'
import mugshotCTroy from '../../assets/team/Troy.jpg'
import mugshotChaz from '../../assets/team/Chaz.jpg'
import mugshotIsaac from '../../assets/team/Isaac.jpg'
import mugshotLudo from '../../assets/team/Ludo.jpg'
import postFoundations from '../../assets/team/postFoundations.JPG'
import Footer from '../../components/Footer'

export default function Team() {
    return (
        <div>
            <TeamPoster />
            <div className='mugShots'>
                <ManagerCard />

                <TeamMemberCard 
                    name='Cam' 
                    position='Carpenter' 
                    mugshot={mugshotCam}
                    />
                <TeamMemberCard 
                    name='Troy' 
                    position='Carpenter' 
                    mugshot={mugshotCTroy}
                    />
                <TeamMemberCard 
                    name='Chaz' 
                    position='Apprentice' 
                    mugshot={mugshotChaz}
                    />
                <TeamMemberCard 
                    name='Isaac' 
                    position='Apprentice' 
                    mugshot={mugshotIsaac}
                    />
                <TeamMemberCard 
                    name='Ludo' 
                    position='Carpenter' 
                    mugshot={mugshotLudo}
                    />
            </div>
            <Brag />
            <Footer />
        </div>
    )   
}

function TeamPoster() {
    return (
        <div className='teamposter'>
            <div className='teamBackingImage'></div>
            <h1>Kauri Point Construction</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                liqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore 
                    magna liqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequa
                </p>
            </div>
            <img className='photo-right' src={mugshotSimon}  alt='team member'></img>
        </div>
    )
}

function TeamMemberCard({name, position, text, mugshot}) {
    return (
        <div className='teamMemberCard'>
            <img className='photo-right' src={mugshot}  alt='team member'></img>
            <div className='text'>
                <h3>{position}</h3>
                <h1>{name}</h1>
                <div className='greenLine'></div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore 
                    magna liqua.
                </p>
            </div>
            
        </div>
        )
}

function Brag () {
    return (
        <div className='brag'>
            <img className='bragImage' src={postFoundations} alt='pouring foundations'></img>
            <div className='bragText'>
                <h1>We are experienced and skilled at all building work</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna liqua
                </p>
                <div className='btn-white'>Plan your project with us</div>
            </div>
        </div>
    )
}
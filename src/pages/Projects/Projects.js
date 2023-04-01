import './Projects.css'
import FrontDoor from '../../assets/projects/FrontDoor.JPG'

import bathroomLedMirror from '../../assets/projects/example_bathroomLedMirror.JPG'
import doubleGarage from '../../assets/projects/example_doubleGarage.png'
import benchTop from '../../assets/projects/example_benchtop.jpg'

export default function Projects() {
    return (
        <>
            <ShowcasePoster />
            <CompletedProjects />
            <SkillsPoster />
        </>
    )
}

function ShowcasePoster() {
    return (
        <div className='showcasePoster'>
            <div className='text'>
                <h1>Showcasing our creativity and Excellence</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna 
                    liqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <img className='showcaseImage' src={FrontDoor} alt='Front Door'></img>
        </div>
    )
}
function CompletedProjects(){
    return(
        <div className='completedProjects'>
            <h1>Our Completed Projects</h1>
            <Project 
                imageUrl={benchTop} 
                title='Kitchen Renovation' 
                subTitle='Sarah & Harry House in 2020'
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                liqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
            />
            <Project 
                imageUrl={doubleGarage} 
                title='Shed Construction' 
                subTitle='Sarah & Harry House in 2020'
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                liqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
            />
            <Project 
                imageUrl={bathroomLedMirror} 
                title='Bathroom Renovation' 
                subTitle='Sarah & Harry House in 2020'
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna 
                liqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
            />
        </div>
    )
}

function Project ({imageUrl, title, subTitle, text}) {
    return (
        <>
            <div className='projectCard'>
                <div  className='text'>
                    <h2>{title}</h2>
                    <p>{subTitle}</p>
                    <p>
                    {text}
                    </p>
                </div>
                <img src={imageUrl} alt='previous work example'></img>
            </div>
        </>
    )
}

function SkillsPoster() {
    return (
        <div className='skillsPoster'>
            <div className='text'>
                <h1>We make it happen</h1>
                <h1>Multi-skilled in all aspects of construction.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna 
                    liqua.
                </p>
            </div>
            <ul>
                <li>Construction</li>
                <li>Renovations</li>
                <li>Extensions</li>
                <li>Fencing & Decking</li>
                <li>Demolition</li>
                <li>House Removal</li>
            </ul>
            <div className='btn-white'>Contact us</div>
        </div>
    )
}
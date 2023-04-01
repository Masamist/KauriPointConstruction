import './Projects.css'
import FrontDoor from '../../assets/projects/FrontDoor.JPG'

export default function Projects() {
    return (
        <>
            <ShowcasePoster />
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
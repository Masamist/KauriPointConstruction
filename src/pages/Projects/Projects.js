import './Projects.css'
import { Link } from 'react-router-dom'
import FrontDoor from '../../assets/projects/FrontDoor.JPG'

import bathroom from '../../assets/projects/bathroom.JPG'
import cedar_reclad from '../../assets/projects/cedarReclad.JPG'
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
                <h1>Showcasing our creativity and excellence</h1>
                <p>
                Every project we take on, big or small, recieves the same level of attention. We are always aiming to create lasting relationships with our clients 
                </p>
            </div>
            <img className='showcaseImage' src={FrontDoor} alt='Front Door'></img>
        </div>
    )
}
function CompletedProjects(){
    return(
        <div className='completedProjects'>
            <h1>Recent highlights</h1>
            <Project 
                imageUrl={benchTop} 
                title='Beach house kitchen' 
                text='With a  recycled timber island top (built on site) serving as the center piece, this kitchen is one of a kind.' 
            />
            <Project 
                imageUrl={cedar_reclad} 
                title='Cedar Reclad' 
                text='An exterior refresh in Freemans Bay. A good opportunity to showcase our craftsmanship.' 
            />
            <Project 
                imageUrl={bathroom} 
                title='St Heliers Bathroom' 
                text='With clean finishing lines and great selections. This bathroom was finished to the highest level.' 
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
                <h1>We make it happen.</h1>
                <h1>Multi-skilled in all aspects of construction.</h1>
                
            </div>
            <div className='skillsList'>
                <ul>
                    <li>Construction</li>
                    <li>Renovations</li>
                    <li>Extensions</li>
                </ul>
                <ul>
                    <li>Fencing & Decking</li>
                    <li>Maintanence and repair</li>
                    <li>Bespoke carpentry</li>
                </ul>
            </div>
            <Link to="/contact"><div className='btn-white'>Contact us</div></Link>
        </div>
    )
}
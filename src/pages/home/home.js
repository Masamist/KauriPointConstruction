import './home.css'
import { Link } from 'react-router-dom'
import renovation from '../../assets/renovation.jpg'
import cedarExterior from '../../assets/cedarExterior.JPG'
import customJoinery from '../../assets/customJoinery.jpg'

import hallway from '../../assets/hallway.jpg'
import garageFraming from '../../assets/service_construction.JPG'


export default function Home() {
    return (
        <>
            <Poster />
            <Services />
            <Testimonial />
            <Sustainability />
        </>
    )
}

function Poster() {
    return (
        <div className='poster'>
            <div className='backingImage'></div>
            <div className='backingTint'></div>
            <h2 className='poster-header'>
                Talented Craftsmen<br/>
                Superior Service
            </h2>
            <div className='poster-text'>
            Our team of experienced builders will guide you through 
            the entire process from design right through to completion 
            </div>
        </div>

    )
}

function Services () {
    return(
        <div className='pad'>
            <h1>Kauri Point Construction Services</h1>
            <div className='services'>
                <Service 
                    title='New builds' 
                    text='Across our team, we have decades of building project experience from 
                    luxury upscale builds, challenging access sites, and architecturally ambitious houses. 
                    Our team brings this hands-on experience to support your project right from inception.'
                    imageURL={garageFraming}
                />
                <Service 
                    title='Renovation' 
                    text='We are passionate about bringing your ideas to life, from bathroom or kitchen 
                    remodels, sympathetic heritage upgrades, or any other internal enhancements. 
                    Along with our amazing network of suppliers and subcontractors, we can help you 
                    achieve your ideal home.'
                    imageURL={renovation}

                />
                <Service 
                    title='Exterior' 
                    text='Our team provides the complete construction package, indoor and out. We can 
                    support you for any external residential construction including decking, fencing 
                    and any other external outdoor construction needs..'
                    imageURL={cedarExterior}
                />
                <Service 
                    title='Custom support and bespoke carpentry' 
                    text='Our talented craftsmen have the skills to support small and large projects; 
                    our team is detail oriented and has a wide range of knowledge on products, 
                    materials and systems. Let us help you support, protect or upgrade your assets'
                    imageURL={customJoinery}
                />
                
                </div>
        </div>
    )
}

function Service({ title, text, imageURL }) {
    return (
        <div className='service'>
            <img className='service-image' src={imageURL} alt='service'/>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

function Testimonial() {
    return (
        <div className='testimonial'>
            <div className='testimonial-text'>
                <h2>
                    <i>"Thanks to Simon and the KPC team. Stunning results and great communication."</i>
                </h2>
                <p>We hired Kauri Point in 2022 to renovate our Ponsonby Villa. 
                    Simon was a dream to work with. Not only is he an excellent builder, 
                    but is a wonderful communicator and was quick to complete the timeline of work. 
                    Nothing was ever a problem, and he guided us through the whole process. Simon 
                    liaised with our other tradespersons, such as our painter, electrician, plumber etc. 
                    to make sure everything was running smoothly during the renovation. 
                    Simon is both professional and personable and I would absolutely recommend to anyone 
                    considering a new build or renovation.
                </p>
                <h3>Anna Miles</h3>
            </div>
            <img className='testimonial-image' src={hallway} alt='previous clients'></img>
        </div>
    )
}

function Sustainability () {
    return (
        <div className='sustainability'>
            <div className='sustainabilityImage'> </div>
            <div className='sustainability-text'>
                <h1>Supporting local communitites <br/>with sustainable practices.</h1>
                <h2>
                    Kauri Point Construction has a key focus on the environment. 
                    It's part of everything we do.
                </h2>
                <Link to="/contact"><button className='btn-green'>Plan your project <br/> with us</button></Link>
            </div>
        </div>
    )
}
import './home.css'
import Service_DoubleGarage from '../../assets/service_doubleGarage.png'
import Service_Renovation from '../../assets/service_renovation.jpg'
import Service_fencingDecking from '../../assets/service_fencingDecking.JPG'
import Service_demolition from '../../assets/service_demolition.JPG'
import Service_houseRemoval from '../../assets/service_houseRemoval.JPG'
import Service_extension from '../../assets/service_extension.JPG'
import testimonial from '../../assets/testimonial.jpg'
import Logo from '../../assets/logo.png'

import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'



export default function Home() {
    return (
        <>
            <Poster />
            <Services />
            <Testimonial />
            <Sustainability />
            <Footer />
        </>
    )
}

function Poster() {
    return (
        <div className='poster'>
            <div className='backingImage'></div>
            <div className='backingTint'></div>
            <h2 className='poster-header'>Bringing our ideas to life.<br/>
                Through our expertise.
            </h2>
            <div className='poster-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua.
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
                    title='Construction' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_DoubleGarage}
                />
                <Service 
                    title='Renovation' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_Renovation}

                />
                <Service 
                    title='Extension' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_extension}
                />
                <Service 
                    title='Fencing and Decking' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_fencingDecking}
                />
                <Service 
                    title='Demolition' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_demolition}
                />
                <Service 
                    title='House Removal' 
                    text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.'
                    imageURL={Service_houseRemoval}
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
                   Thanks to Simon and the KPC team. Stunning results and great communication.
                </h2>
                <h3>John and Ann Smith</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <img className='testimonial-image' src={testimonial} alt='previous clients'></img>
        </div>
    )
}

function Sustainability () {
    return (
        <div className='sustainability'>
            <div className='sustainabilityImage'> </div>
            <div className='sustainability-text'>
                <h1>Supporting Local communitites with sustainable practices.</h1>
                <h2>
                    Kauri Point Construction has a key focus on the environment, 
                    it's part of everything we do.
                </h2>
                <button className='btn-green'>Plan your project with us</button>
            </div>
        </div>
    )
}
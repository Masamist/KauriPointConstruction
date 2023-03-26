import './home.css'
import Service_DoubleGarage from '../../assets/service_doubleGarage.png'
import Service_Renovation from '../../assets/service_renovation.jpg'
import Service_fencingDecking from '../../assets/service_fencingDecking.JPG'
import Service_demolition from '../../assets/service_demolition.JPG'
import Service_houseRemoval from '../../assets/service_houseRemoval.JPG'
import Service_extension from '../../assets/service_extension.JPG'



export default function Home() {
    return (
        <div>
            <Poster />
            <Services />
        </div>
    )
}

function Poster() {
    return (
        <div className='poster'>
            <div className='backingImage'></div>
            <h2 className='poster-header'>Bringing our Ideas to Life.<br/>
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
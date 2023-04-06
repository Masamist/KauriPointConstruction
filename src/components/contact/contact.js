import './contact.css'
import { projectFirestore } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'

export default function ContactUs() {

const { addContact, response } = useFirestore('contacts')

    handleSubmit = async(e) => {
        e.preventDefault()

        const message = {
            
        }

        await addContact(message)
    }
}

    return (
        <div className='contactUs'>
            <ContactHeader />
            <div className='contact-container'> 
                <ContactInfo />
                <form className='contactForm'>
                    <h1 >Contact Form</h1>

                    <label>nName</label>
                    <input placeholder='name'></input>

                    <label>Email</label>
                    <input placeholder='email'></input>

                    <label>Message</label>
                    <textarea placeholder='message...'></textarea>

                    <button className='btn-green' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

const ContactHeader = () => {return <h1 className='contactHeader'>Contact us</h1>}

const ContactInfo = () => {
    return (
        <div className='contactInfo'>
        <div>
            <h1 >We'd love to hear from you!</h1>
            <p>
                Ready to help you, for More information about our services, 
                please call or message us. We will get in touch as soon as possible.
            </p>
        </div>
        <ContactPhone />
        <ContactEmail />
        </div>
    )
}

const ContactPhone = () => {
    return (
        <div>
            <h3>Phone Number</h3>
            <p> 09 234 5678</p>
        </div>
    )
}
const ContactEmail = () => {
    return (
        <div>
            <h3>Email</h3>
            <p> simon@kauripointconstruction.co.nz</p>
        </div>
    )
}
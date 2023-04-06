import './contact.css'
import { projectFirestore } from '../../firebase/config'
import { useState } from 'react'

export default function ContactUs() {
//     const history = useHistory()
// const { addContact, response } = useFirestore('contacts')

  // form field values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        const contactMessage = {
            name,
            email,
            message
        }

        projectFirestore.collection('contacts').add(contactMessage)
            .then( ()=> {
                alert('Message has been submnitted')
            })
            .catch((error) => {
                alert(error.message);
            })

        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div className='contactUs'>
            <ContactHeader />
            <div className='contact-container'> 
                <ContactInfo />
                <form className='contactForm'>
                    <h1 >Contact Form</h1>

                    <div>
                    {name && <label>name</label>}
                    <input placeholder='name'
                        value={name}
                        onChange={ (e)=>setName(e.target.value) }></input>
                    </div>

                    <div>
                    {email && <label>email</label>}
                    <input placeholder='email'
                        value={email}
                        onChange={ (e)=>setEmail(e.target.value) }></input>
                    </div>

                    <div>
                    {message && <label>message</label>}
                    <textarea placeholder='message...'
                        value={message}
                        onChange={ (e)=>setMessage(e.target.value) }></textarea>
                    </div>

                    <button className='btn-green' type='submit' onClick={handleSubmit}>Submit</button>
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
        <div className='contactCard'>
            <h3>Phone Number</h3>
            <p className='number'> 09 234 5678</p>
        </div>
    )
}
const ContactEmail = () => {
    return (
        <div className='contactCard'>
            <h3>Email</h3>
            <p> simon@kauripointconstruction.co.nz</p>
        </div>
    )
}
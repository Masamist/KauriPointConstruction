import './contact.css'
import { projectFirestore } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

import phone from '../../assets/icons/phone.png'
import email from '../../assets/icons/email.png'

export default function ContactUs() {
    const history = useHistory()
    const { addDocument, response } = useFirestore('contactMessage')

  // form field values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [formError, setFormError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormError(null)
        if(!name){
            setFormError('please select a name') 
            return
        }
        if(!email){
            setFormError('please enter an email') 
            return
        }
        if(!message){
            setFormError('please enter a message') 
            return
        }


        let contactMessage = {
            name,
            email,
            message
        }

        //projectFirestore.collection('contactMessage').add(contactMessage)
        await addDocument(contactMessage)
            .then( ()=> {
                alert('Message has been submitted')
            })
            .catch((error) => {
                alert(error.message);
            })

        if (!response.error) {
            setName('');
            setEmail('');
            setMessage('');

            //history.push('/')
          }


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
                    {formError && <p className="error">{formError}</p>}
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
            </div >
            <div className='contact-cards'>
                <ContactPhone />
                <ContactEmail />
            </div>
        </div>
    )
}

const ContactPhone = () => {
    return (
        <div className='contactCard'>
            <img src={phone} alt='phone'></img>
            <h3>Phone Number</h3>
            <p className='number'> 09 234 5678</p>
        </div>
    )
}
const ContactEmail = () => {
    return (
        <div className='contactCard'>
            <img src={email} alt='email'></img>
            <h3>Email</h3>
            <p> simon@kauripointconstruction.co.nz</p>
        </div>
    )
}
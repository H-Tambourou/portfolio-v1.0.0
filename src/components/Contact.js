import React, { useRef, useState } from "react";
import { MailOutline } from "@material-ui/icons";
import emailjs from 'emailjs-com';

function Contact() {
    const [sent, setSent] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const formStyle = {
        margin:"30px auto", 
        border:"none", 
        borderBottom:"1px solid #ccc", 
        borderRadius:"0px", 
        backgroundColor:"transparent",
        color:"white"
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        const userId = process.env.REACT_APP_USER_ID;
        
        const from_name = nameRef.current.value;
        const reply_to = emailRef.current.value;
        const message = messageRef.current.value

        const templateParams={
            from_name,
            reply_to,
            message
        }
        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(response => {
                if(response){
                    nameRef.current.value = null;
                    emailRef.current.value = null;
                    messageRef.current.value = null;
                    setSent(true);
                }
            })
            .then(error => console.log(error));
    }

    return(
        <section id ="contact" style={{width:"100%", minHeight:"100vh", position:"relative", paddingTop:"65px"}}>
            <div className="contactWrapper"  >
                <div className="contactInfo">
                    <h1 className="hStyle" style={{margin:"auto"}}>Contact me</h1>
                    <li style={{listStyle:"none"}}><MailOutline/><span>h.tambourou@gmail.com</span></li>
                </div>
                <form className="contactForm" onSubmit={handleSubmit}>
                        <input placeholder="Name" type="text" required ref={nameRef} style={formStyle}/>
                        <input placeholder="Email" type="email" required ref={emailRef} style={formStyle}/>
                        <textarea placeholder="Message" required ref={messageRef} style={formStyle}/>
                        <button type="submit" value="Submit" style={{cursor:"pointer", padding:".3em", border:"none", backgroundColor:"#e4e6e7", marginBottom:"8px"}}>Send Message</button>
                        <span className={`transmit ${sent? 'active': null}`} >Message sent!</span>
                </form>
                
            </div>
        </section>
    )
}
export default Contact;
import { motion } from "framer-motion"
import { useState } from "react"
import { userAction } from '../store'


function RegistrationForm (props) {
    const [userFirstName, setUserFirstName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPhoneNumber, setUserphoneNumber] = useState('')
    const sign = userAction((state) => state.sign)
    
    return (
        <motion.div initial={{x:500, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.4}}  className="form-image-wrapper">
            <div className="action-block-wrapper">
                <div className="form-wrapper">
                    <div className="log-text-wrapper">
                        <div className="log-title"><>Registration</></div>
                        <div className="ask-account-text">Already have account? <span onClick={() => (props.setSignIn(!props.signIn))} className='create-account-text'>Enter now! </span></div>
                    </div>
                    <form className='form-block' action="">
                        <div className="register-input-wrapper">
                            <div className="register-label">FIRST NAME</div>
                            <input className='register-form-input' onChange={(e) => {setUserFirstName(e.target.value)}} type="text"/>
                        </div>
                            <div className="register-input-wrapper">
                                <div className="register-label">LAST NAME</div>
                                <input className='register-form-input' onChange={(e) => {setUserLastName(e.target.value)}} type="text"/>
                            </div>
                        <div className="register-input-wrapper">
                            <div className="register-label">PASSWORD</div>
                            <input className='register-form-input' onChange={(e) => {setUserPassword(e.target.value)}} type="password"/>
                        </div>
                            <div className="register-input-wrapper">
                                <div className="register-label">EMAIL</div>
                                <input className='register-form-input' onChange={(e) => {setUserEmail(e.target.value)}} type="email"/>
                            </div>
                            <div className="register-input-wrapper">
                                <div className="register-label">PHONE NUMBER</div>
                                <input className='register-form-input' type="number" onChange={(e) => {setUserphoneNumber(e.target.value)}}/>
                            </div>
                    </form>
                    <button className='register-btn'><span className='register-btn-text' onClick={() => (sign(userFirstName, userPassword, userLastName, userPhoneNumber, userEmail,'up'))}>Registration</span></button>
                </div>
            </div>
        </motion.div>
    )
}

export default RegistrationForm
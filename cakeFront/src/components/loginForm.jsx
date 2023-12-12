
import { motion } from "framer-motion"
import { useState } from "react"
import { userAction } from '../store'

function LoginForm (props) {


    const [userFirstName, setUserFirstName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const sign = userAction((state) => state.sign)

    return (
        <motion.div  initial={{x:-200, opacity : 0}} animate={{x:375, opacity:1}} transition={{duration: 0.4}} className="action-block-wrapper login">
                <div className="form-wrapper">
                    <div className="log-text-wrapper">
                        <div className="log-title"><>Login</></div>
                        <div className="ask-account-text">Don`t have an account? <span onClick={() => (props.setSignIn(!props.signIn))} className='create-account-text'>Create now</span>! it takes less than a minute </div>
                    </div>
                    <form className='form-block' action="">
                        <div className="register-input-wrapper">
                            <div className="register-label">FIRST NAME</div>
                            <input className='register-form-input' onChange={(e) => {setUserFirstName(e.target.value)}} type="text"/>
                        </div>
                        <div className="register-input-wrapper">
                            <div className="register-label">PASSWORD</div>
                            <input className='register-form-input' onChange={(e) => {setUserPassword(e.target.value)}} type="password "/>
                        </div>
                    </form>
                <button onClick={() => (sign(userFirstName, userPassword, '','','', 'in'))} className='register-btn'><span className='register-btn-text'>Login</span></button>
            </div>
        </motion.div>
    )
}

export default LoginForm
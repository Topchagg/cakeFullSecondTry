import { useState } from 'react'
import { userAction } from '../store'

import { motion } from 'framer-motion'
import RegistrationForm from '../components/registrationForm'
import LoginForm from '../components/loginForm'
import IsLoading from '../components/isLoading'


// import { useActionData } from 'react-router-dom'

import '/src/styles/logInLogOutPage.css'

function LogInLogOutPage() {
    const [signIn, setSignIn] = useState(false)


    const isLogged = userAction((state) => state.isLogged)
    const isAdmin = userAction((state) => state.isAdmin)
    const logOut = userAction((state) => state.logOut)
    const isLoading = userAction((state) => state.isLoading)
    const isCreated = userAction((state) => state.isCreated)
  
    if(isLogged){
        return <>U are logged! <button onClick={() => (logOut())}>Logout</button></>
    }

    return (
        <div className="form-image-wrapper">
            {isCreated && <>U are created an account</>}
            {isLoading && <IsLoading/>}
            <div className="registr-form-wrapper">{signIn || <RegistrationForm setSignIn={setSignIn} signIn={signIn} />}</div>
            <div className="login-form-wrapper">{signIn && <LoginForm setSignIn={setSignIn} signIn={signIn} />}</div>
            {signIn || <>
                <motion.div initial={{x:-930, opacity:0}} animate={{x:-420, opacity:1}} transition={{duration: 0.4}} className="img-wrapper">
                    <img src="regimg.png" alt="" />
                </motion.div>
            </>}
            {signIn && <>
                <motion.div initial={{x:0, opacity:0}} animate={{x:-630, opacity:1}} transition={{duration:0.4}} className="img-wrapper">
                    <img src="logimg.png" alt="" />
                </motion.div>
            </>}
        </div>
    )
}
export default LogInLogOutPage
import { useEffect, useState } from 'react'
import { userAction } from '../store'


import { useActionData } from 'react-router-dom'


function LogInLogOutPage() {
    const [signIn, setSignIn] = useState(true)
    const [userFirstName, setUserFirstName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPhoneNumber, setUserphoneNumber] = useState('')

    const sign = userAction((state) => state.sign)
    const isLogged = userAction((state) => state.isLogged)
    const isAdmin = userAction((state) => state.isAdmin)
    const logOut = userAction((state) => state.logOut)
    const isLoading = userAction((state) => state.isLoading)
    const isCreated = userAction((state) => state.isCreated)
  

    return (
        <div className="main-section">
            {isLoading && <><h1>Loading... Please wait.</h1></>}
            {isCreated && <h1>Ur account is created</h1>}
            {isLogged || 
            <>
           <div className="sign-section">
            <div className="tittle-sign-in">
                {signIn && <><h1>Sign in</h1></>}
                {signIn || <><h1>Sign up</h1></>}
            </div>
            <div className="form-wrapper">
            <p className='check-user-account' onClick={() => {setSignIn(!signIn)}} >press to change Sign-in/Sign-up</p>
            <form action="">
                <label className='form-label'  htmlFor="">First name</label>
                <input onChange={(e) => {setUserFirstName(e.target.value)}} className='form-input' type="text" placeholder='Write here'/>
                {signIn || <>
                    <label className='form-label'  htmlFor="">Last name</label>
                    <input onChange={(e) => {setUserLastName(e.target.value)}} className='form-input' type="text" placeholder='Write here'/>
                </>}
                <label className='form-label'  htmlFor="">Password</label>
                <input onChange={(e) => {setUserPassword(e.target.value)}} className='form-input' type="password" placeholder='Write here' />
                {signIn || <>
                    <label className='form-label'  htmlFor="">Email</label>
                    <input onChange={(e) => {setUserEmail(e.target.value)}} className='form-input' type="email" placeholder='Write here'/>
                    <label className='form-label'  htmlFor="">Phone number</label>
                    <input onChange={(e) => {setUserphoneNumber(e.target.value)}} className='form-input' type="tel" placeholder='Write here'/>
                    </>}
                <div className="btn-wrapper">
                {signIn && 
                <>
                <div onClick={() => (sign(userFirstName, userPassword, '','','', 'in'))} className='submit-btn'>Sign in</div>
                </>}
                {signIn ||
                <>
                <div onClick={() => (sign(userFirstName, userPassword, userLastName, userPhoneNumber, userEmail,'up'))} className='submit-btn'>Sign up</div>
                </>
                }
                </div>
            </form>
            </div>
           </div></>}
           {isLogged &&<><h1>U already logged  {isAdmin &&<>U are an admin</>}</h1> <br /> <button onClick={() => {logOut()}} className='logout-btn'>Log out</button> </>}
        </div>
    )
}

export default LogInLogOutPage
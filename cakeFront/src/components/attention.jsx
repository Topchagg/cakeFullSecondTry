import { userAction } from '../store'
import { motion, AnimatePresence } from 'framer-motion'

import '/src/styles/attention.css'
import { useEffect } from 'react'

function Attention (props) {

    const deleteObject = userAction((state) => state.deleteObject)
    const isAction = userAction((state) => state.isAction)

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="wrapper-attention">
            <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{duration:0.35}} className="wrapper-attention-block">
                <div className='logout-wrapper'>
                        <div className="logout-icon-wrapper"><img src="/Union.png" alt="" /></div>
                        <div className="logout-title">Delete category</div>
                        <div className="logout-greating">Hi</div>
                        <div className="logout-text">U`ll delete all items that connected to this category, are u sure?</div>
                        <div className="buttons-wrapper">
                            <button className="logout-btn" onClick={props.decline}>Decline</button>
                            <button className="logout-btn" type='button'onClick={() => (deleteObject(props.id, "category", props.img, props.setFuncShow))}>Delete</button>
                        </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Attention


// import { userAction } from '../store'

// import '/src/styles/attention.css'

// function Attention (props) {

//     const deleteObject = userAction((state) => state.deleteObject)

//     return (
//         <div className="wrapper-attention">
//             <div className="attention-message-wrapper">
//                 <h1>{props.message}</h1>
//                 <button className="delete-btn" onClick={() => (deleteObject(props.id, "category", props.img))}>Delete!</button> <button  className="update-btn" onClick={props.decline}>Decline!</button>
//             </div>
//         </div>
//     )
// }

// export default Attention
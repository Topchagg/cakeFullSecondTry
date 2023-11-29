
import '/src/styles/isLoading.css'

import { motion } from 'framer-motion'

function IsLoading () {
    return (
        <div className="wrapper-is-loading">
            <motion.img className='loader' animate={{rotate:360}} transition={{ repeat:Infinity, repeatType: 'loop', duration:1.5}} src="/loader.png" alt=""/>
        </div>
    )
}

export default IsLoading
import LinkButton from '../components/linkButton'

import { motion } from 'framer-motion'

function HomeOpenSection () {
    return (
        <div className="home-open-section">
            <div className="home-open-text-wrapper">
                <motion.div initial={{x:-900, opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.3}} className="large-text">DELICIOUS CAKES TO ORDER !</motion.div>
                <motion.div initial={{x:-900, opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5}} className="small-text">Unique handmade cakes and cookies</motion.div>
                <div className="home-open-button-wrapper">
                   <motion.div initial={{y:400, opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.4}} className="wrapper-link-btn"> <LinkButton  link={'/cakefront/catalog'} text={'Catalog'} ></LinkButton></motion.div>
                </div>
            </div>  
            <div className="home-open-img-wrapper">
                <img src="Mask group.png" alt="" />
            </div>
        </div>
    )
}
export default HomeOpenSection
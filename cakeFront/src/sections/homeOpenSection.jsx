import {Link} from 'react-router-dom'



import '../styles/HomeOpenSection.css'

import LinkButton from '../components/linkButton'

function HomeOpenSection () {
    return (
        <div className="home-open-section">
            <div className="home-open-text-wrapper">
                <div className="large-text">DELICIOUS CAKES TO ORDER !</div>
                <div className="small-text">Unique handmade cakes and cookies</div>
                <div className="home-open-button-wrapper">
                    <LinkButton link={'/catalog'} text={'Catalog'} ></LinkButton>
                </div>
            </div>  
            <div className="home-open-img-wrapper">
                <img src="Mask group.png" alt="" />
            </div>
        </div>
    )
}
export default HomeOpenSection
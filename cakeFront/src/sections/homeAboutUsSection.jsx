

import LinkButton from '../components/linkButton'


function HomeAboutUsSection () {
    return (
        <div className="home-about-us-section">
            <div className="home-about-us-img-wrapper">
                <img src="about.png" alt="" />
            </div>
            <div className="home-about-us-text-wrapper">
                <div className="large-text">About us</div>
                <div className="small-text home-about-small-text">A small cozy pastry shop that will make your sweet dream come true. All products are selected for high quality and freshness. We prepare traditional pastries, as well as individual ones according to the wishes of the client</div>
                <div className="small-text home-about-small-text ">We think over the all details of the cake, design, the color scheme and decor.</div>
                <LinkButton link={'/About'} text={'About us'} />
            </div>
        </div>
    )
}

export default HomeAboutUsSection
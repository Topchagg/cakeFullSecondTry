import {Link} from 'react-router-dom'



function Footer ()  {
    return (
        <footer className="footer">
            <div className="nav-menu-footer-wrapper">

                <div className="logo-media-wrapper">
                    <div className="logo-wrapper">
                       <div className="large-text">Dorty</div>
                    </div>
                    <div className="media-wrapper">
                    </div>
                </div>

            <div className="info-wrapper">
                <div className="info-block Information">
                    <div className="title-info-block">
                        Information
                    </div>

                    <div className="nav-items-wrapper">
                        <Link to={'/About'} className='nav-item-footer'>About us</Link>
                        <Link to={'/Catalog'} className='nav-item-footer'>Catalog</Link>
                        <Link to={'/Delivery'} className='nav-item-footer'>Delivery</Link>
                        <Link to={'/Contact'} className='nav-item-footer'>Contact us</Link>
                    </div>
                </div>
                <div className="info-block Address">
                    <div className="title-info-block">
                        Address
                    </div>
                    <div className="nav-item-wrapper">
                        <div className="nav-item-footer">Ukraine, Dnipro</div>
                        <div className="nav-item-footer">887-549-00-15</div>
                        <div className="nav-item-footer">887-549-00-14</div>
                    </div>
                </div>
                <div className="info-block get-in-touch">
                <div className="title-info-block">
                        Get in touch
                    </div>
                    <div className="nav-item-wrapper">
                        <div className="nav-item-footer">
                            Subsribe to our newsletter and stay up to date with all the news
                        </div>
                        <form action="">
                            <label htmlFor="">Enter your email</label>
                            <input className='email-input-footer' type="email" />
                            <button className='accept-btn' type='button'>Subsribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="privace-policy">
            <div className="company-data-set">
                <div className="data-item">Privacy Policy</div>
                <div className="data-item">Company Data</div>
                <div className="data-item">All cookies</div>
                <div className="data-item">Rules</div>
            </div>
            <div className="rights-reserved">
                <div className="small-text text-reserved">© 2022 All rights reserved.</div>
            </div>
        </div>
        </footer>
    )
}

export default Footer
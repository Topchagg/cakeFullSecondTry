import '../styles/homeIndividualOrderSection.css'


function HomeIndividualOrderSection() {

    return (
        <div className="individual-order-section">
            <div className="individual-order-form-wrapper">
                <div className="individual-order-title">
                    <div className="large-text">INDIVIDUAL ORDER</div>
                </div>
                <form className='individual-order-form' action="">
                    <div className="label-input-wrapper">
                        <label className='form-label' htmlFor="">Your name</label> <input className='form-input' type="text" />
                    </div>
                    <div className="label-input-wrapper">
                        <label className='form-label' htmlFor="">Phone number</label> <input className='form-input' type='phone-number' />
                    </div>
                    <div className="label-input-wrapper">
                        <label className='form-label' htmlFor="">Email</label> <input className='form-input' type="email" />
                    </div>
                    <div className="label-input-wrapper">
                        <label className='form-label' htmlFor="">Leave your comment</label> <input className='form-input' type="text" />
                    </div>
                    <input type="file" id='img' className='attach-photo-inv' />
                    <label for="img">
                        <div className="attach-btn">
                            <img className='pin' src="/raphael_clip.png" />
                            <div className="attach-btn-text">
                                Or attach photo
                            </div>
                        </div>
                    </label>

                    <button className="submit-btn" type='button'>Send an aplication</button>
                </form>
               <div className="small-text attach-small-text" >Our manager will contact you within 15 minutes to clarify ORDER </div>
            </div>
        </div>
    )

}

export default HomeIndividualOrderSection
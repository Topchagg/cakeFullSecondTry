

function UpdateProductShow(props) {
    return (
        <div className="update-product-show">
                 <form className='update-form' action="">
                    <div className="input-wrapper">
                        <input onChange={(e) => (props.setNameFunc(e.target.value))} className='register-form-input' type="text" defaultValue={props.name} />
                    </div>
                    <div className="input-wrapper">
                        <input onChange={(e) => (props.setPriceFunc(e.target.value))} className='register-form-input' type="number" defaultValue={props.price} />
                    </div>
                        <div>
                            Bestseller? <input onClick={(e) => (props.setBestsellerFunc(!props.bestseller))} className='form-input' type="checkbox" checked={props.bestseller} />
                        </div>
                     <div className="input-file-btn">
                    <label className='update-img' htmlFor="update-img">
                        <div className="update-img-btn-wrapper">
                            <div className="update-img-text-wrapper">update photo</div>
                            <div className="update-img-wrapper"><img src="/upload.png" alt="" /></div>
                        </div>
                    </label>
                    <input id="update-img" className='input-file' onChange={(e) => (props.handleImage(e))} type="file" />
                    </div>
                </form>
        </div>
    )
}

export default UpdateProductShow
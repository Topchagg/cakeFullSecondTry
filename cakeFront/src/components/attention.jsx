import { userAction } from '../store'

import '../styles/attention.css'


function Attention (props) {

    const deleteObject = userAction((state) => state.deleteObject)

    return (
        <div className="wrapper-attention">
            <div className="attention-message-wrapper">
                <h1>{props.message}</h1>
                <button className="delete-btn" onClick={() => (deleteObject(props.id, "category", props.img))}>Delete!</button> <button  className="update-btn" onClick={props.decline}>Decline!</button>
            </div>
        </div>
    )
}

export default Attention
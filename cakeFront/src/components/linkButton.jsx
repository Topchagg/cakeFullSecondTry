
import '../styles/componentsLinkButton.css'
import {Link} from 'react-router-dom'


function LinkButton (props) {
    return (
        <Link to={props.link}><button className="linkButton" type="button" >{props.text}</button></Link>
    )
}

export default LinkButton
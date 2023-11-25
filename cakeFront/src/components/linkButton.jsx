
import {Link} from 'react-router-dom'

import '/src/styles/componentsLinkButton.css'

function LinkButton (props) {
    return (
        <Link to={props.link}><button className="linkButton" type="button" >{props.text}</button></Link>
    )
}

export default LinkButton
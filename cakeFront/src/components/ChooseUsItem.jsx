
import '/src/styles/chooseUsItem.css'

function ChooseUsItem (props) {
    return (
        <div className="wrapper-of-item">
            <div className="wrapper-img-item"><img src="arcticons_cake.png" alt="" /></div>
            <div className="wrapper-text-item">
                <div className="big-text">{props.bigtext}</div>
                <div className="small-text-wrapper">
                    <div className="small-text">{props.smalltext}</div>
                </div>
            </div>
        </div>
    )
}
export default ChooseUsItem
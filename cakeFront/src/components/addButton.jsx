
function AddButton(props) {

    return (
        <button className='add-button' type='button'onClick={() => {props.func(props.fullItem)}}><img className='add-button-pic' src="Vector(2).png" alt="" /></button>
    )
}

export default AddButton

function AddButton(props) {

    return (
        <button className='add-button' type='button'onClick={() => {props.func(props.fullItem)}}><img className='add-button-pic' src="https://firebasestorage.googleapis.com/v0/b/cake-shop-2c6c5.appspot.com/o/imagesFproject%2Fic_baseline-plus.png?alt=media&token=ed04c5b7-76ef-41ed-8257-8d534cf932b4" alt="" /></button>
    )
}

export default AddButton

import ChooseUsItem from '../components/ChooseUsItem'

function HomeChooseUsSection () {
    return (
        <>
        <div className="home-choose-us-section">
            <div className="large-text">WHY CHOOSE US</div>
            <div className="items-wrapper">
                <ChooseUsItem bigtext={'DELICIOUS DESSERTS'} smalltext={'Desserts prepared with the best technology'}/>
                <ChooseUsItem bigtext={'NATURAL INGREDIENTS'} smalltext={'Only natural ingredients from trusted suppliers'}/>
                <ChooseUsItem bigtext={'AVAILABLE SERVICE'} smalltext={'Reasonable prices and convenient delivery around the city'}/>
            </div>
        </div>

        <div className="banner-wrapper">
        </div>
        </>
    )
}

export default HomeChooseUsSection
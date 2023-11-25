import HomeOpenSection from "../sections/homeOpenSection"
import HomeAboutUsSection from "../sections/homeAboutUsSection"
import HomeChooseUsSection from "../sections/homeChooseUsSection"
import HomeCatalogSection from "../sections/homeCatalogSection"
import HomeCommentsSection from "../sections/homeCommentsSection"
import HomeBestsellerSection from "../sections/homeBestsellerSection"
import HomeIndividualOrderSection from '../sections/homeIndividualOrderSection'

import '/src/styles/homeAboutUsSection.css'
import '/src/styles/homeBestsellerSection.css'
import '/src/styles/homeCatalogSection.css'
import '/src/styles/homeChooseUsSection.css'
import '/src/styles/homeCommentsSection.css'
import '/src/styles/homeIndividualOrderSection.css'
import '/src/styles/homeOpenSection.css'



function HomePage () {



    return (
        <>
            <HomeOpenSection/>
            <HomeAboutUsSection/>
            <HomeChooseUsSection/>
            <HomeCatalogSection/>
            <HomeCommentsSection/>
            <HomeBestsellerSection/>
            <HomeIndividualOrderSection/>
        </>
    )
}

export default HomePage
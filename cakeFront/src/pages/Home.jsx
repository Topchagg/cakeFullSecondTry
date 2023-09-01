import '../styles/default.css'
import '../styles/texts.css'

import HomeOpenSection from "../sections/homeOpenSection"
import HomeAboutUsSection from "../sections/homeAboutUsSection"
import HomeChooseUsSection from "../sections/homeChooseUsSection"
import HomeCatalogSection from "../sections/homeCatalogSection"
import HomeCommentsSection from "../sections/homeCommentsSection"
import HomeBestsellerSection from "../sections/homeBestsellerSection"


function Home () {
    return (
        <>
            <HomeOpenSection/>
            <HomeAboutUsSection/>
            <HomeChooseUsSection/>
            <HomeCatalogSection/>
            <HomeCommentsSection/>
            <HomeBestsellerSection/>
        </>
    )
}

export default Home
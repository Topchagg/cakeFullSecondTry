import {Outlet} from 'react-router-dom'

import Header from '../sections/layoutHeaderSection'
import Footer from '../sections/layoutFooterSection'

function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
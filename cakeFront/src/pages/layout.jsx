import {Outlet} from 'react-router-dom'

import Header from '../sections/layoutHeaderSection'

function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Layout
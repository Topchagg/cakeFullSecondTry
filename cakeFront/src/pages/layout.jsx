import {Outlet} from 'react-router-dom'
import { useEffect } from 'react'
import { cart, userAction } from '../store'

import Header from '../sections/layoutHeaderSection'
import Footer from '../sections/layoutFooterSection'
import Cart from "./cart"







function Layout() {
    const userAuth = userAction((state) => state.userAuth)
    const showCart = cart((state) => state.showCart)
    useEffect(() => {
        userAuth()
    },[])

    return (
        <>
            {showCart && <Cart/>}
            <Header/>
                <div className="outlet-section">
                <Outlet/>   
                </div>
            <Footer/>
        </>
    )
}

export default Layout
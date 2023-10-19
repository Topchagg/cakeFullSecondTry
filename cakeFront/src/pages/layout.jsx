import {Outlet} from 'react-router-dom'

import Header from '../sections/layoutHeaderSection'
import Footer from '../sections/layoutFooterSection'

import Cart from "./cart"
import { cart } from '../store'

import '../styles/cart.css'


function Layout() {

    const showCart = cart((state) => state.showCart)

    return (
        <>
            {showCart && <Cart/>}
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
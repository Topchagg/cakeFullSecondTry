import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { cart, userAction } from '../store'


function Header () {
    
    const [isSearch, setIsSearch] = useState(false)
    const [searchText, setSearchText] = useState('')

    const toggleShowCart = cart((state) => state.toggleShowCart)
    const Amount = cart((state) => state.Amount)
    const setLocalItemsData = cart((state) => state.setLocalItemsData)
    const isAdmin = userAction((state) => state.isAdmin)

    
    useEffect(() => {
        const parsedLocalItems = JSON.parse(localStorage.getItem("bigItems"))
        setLocalItemsData(parsedLocalItems)
        
    },[])

    const [showHeader, setShowHeader] = useState(true);
  const [prevScrolLY, setPrevScrollY] = useState(0)
  const [scrollY, setScrollY] = useState(0); 


  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []); 

  useEffect(() => {
    setPrevScrollY(scrollY)
    if(prevScrolLY >= scrollY){
        setPrevScrollY(scrollY)
        setShowHeader(true)
    }
    else {
        setShowHeader(false)
    }
  },[scrollY])


    return (

        <>
        <AnimatePresence>
        {showHeader && <motion.header initial={{y:-60, opacity:0}} animate={{y:0, opacity:1}} exit={{y:-60, opacity:0}} transition={{duration:0.4}} className="header">
            <div className="logo-wrapper">
                <Link to='/cakefront'><div className="logo">Dorty</div></Link>
            </div>
            <div className="nav-menu-wrapper">
                <Link to='about'><div className="nav-menu__item">About us</div></Link>
                <Link to='catalog'><div className="nav-menu__item">Catalog</div></Link>
                <Link to='delivery'><div className="nav-menu__item">Delivery</div></Link>
                {isAdmin && <Link to='orders'><div className="nav-menu__item">User orders</div></Link>}
                {isAdmin || <Link to='user-orders'><div className="nav-menu__item">You`re orders</div></Link>}
                <Link to='sign-in'><div className="nav-menu__item">Log in/Log out</div></Link>
            </div>
            <div className="icons-wrapper">
                <img className='header__icon' src='carbon_search.svg' alt="" onClick={() => (setIsSearch(!isSearch))} />
                <img className='header__icon' src='heroicons_shopping-bag.svg' alt="" onClick={() => (toggleShowCart())}/>
                <div className="header__icon amount">
                    <div className="amount-num">{Amount}</div>
                </div>
                {isSearch && <><form action=""><input className='header__search' type="text" placeholder='Write here'  onChange={(e) => (setSearchText(e.target.value))}/></form></>}
            </div>
        </motion.header>}
        </AnimatePresence>
        </>

    )
}

export default Header
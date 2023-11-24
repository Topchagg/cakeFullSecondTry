import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import CatalogPage from './pages/Catalog'
import DeliveryPage from './pages/Delivery'
import LogInLogOutPage from './pages/logInPage'
import ItemsWrapper from './sections/catalogItemsWrapper'


import OrderPage from './pages/Order'
import UserOrders from './pages/userOrders'
import OrderWrapper from './components/orderWrapper'


import Layout from './pages/layout'


function App() {


  return (
    <>
    <Routes>
        <Route path='/cakefront' element={<Layout/>} > 
          <Route index element={<HomePage/>}></Route>
          <Route path='about' element={<AboutPage/>} ></Route>
          <Route path='catalog' element={<CatalogPage/>} ></Route>
          <Route path="delivery" element={<DeliveryPage/>} ></Route>
          <Route path='sign-in' element={<LogInLogOutPage/>}></Route>
          <Route path='orders' element={<OrderPage/>}></Route>


          <Route path="catalog/:category" element={<ItemsWrapper/>}></Route>

          <Route path="orders" element={<OrderPage/>} ></Route>
          <Route path="orders/:id"  element={<OrderWrapper/>}></Route>
          <Route path="user-orders" element={<UserOrders/>}></Route>
          <Route path="user-orders/:id" element={<OrderWrapper/>}></Route>

        </Route>
    </Routes>
    </>
  )
}

export default App

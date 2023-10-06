import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import CatalogPage from './pages/Catalog'
import DeliveryPage from './pages/Delivery'
import ContactPage from './pages/Contact'
import ItemsWrapper from './sections/catalogItemsWrapper'

import OrderPage from './pages/Order'
import OrderWrapper from './components/orderWrapper'

import Layout from './pages/layout'


function App() {


  return (
    <>
    <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<HomePage/>} ></Route>
          <Route path='About' element={<AboutPage/>} ></Route>
          <Route path='Catalog' element={<CatalogPage/>} ></Route>
          <Route path="Delivery" element={<DeliveryPage/>} ></Route>
          <Route path='Contact' element={<ContactPage/>}></Route>


          <Route path="Catalog/:category" element={<ItemsWrapper/>}></Route>

          <Route path="Orders" element={<OrderPage/>} ></Route>
          <Route path="Orders/:id"  element={<OrderWrapper/>}></Route>

        </Route>
    </Routes>
    </>
  )
}

export default App

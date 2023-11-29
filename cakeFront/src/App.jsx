import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Delivery from './pages/Delivery'
import Contact from './pages/Contact'
import ItemsWrapper from './sections/catalogItemsWrapper'
import Layout from './pages/layout'

function App() {


  return (
    <>
    <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} ></Route>
          <Route path='About' element={<About/>} ></Route>
          <Route path='Catalog' element={<Catalog/>} ></Route>
          <Route path="Delivery" element={<Delivery/>} ></Route>
          <Route path='Contact' element={<Contact/>}></Route>


          <Route path="Catalog/:slug" element={<ItemsWrapper/>}></Route>
        </Route>
    </Routes>
    </>
  )
}

export default App

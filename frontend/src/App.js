import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from './component/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import './App.css'


const App = () => {
  return (
       <>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='about' element={<About/>} />
            <Route path='contactus' element={<ContactUs/>
          } />
          </Route>
          </Routes>
        </BrowserRouter>
    
      </>
  )
}

export default App
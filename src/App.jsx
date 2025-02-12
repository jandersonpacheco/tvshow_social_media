import {RouterProvider} from 'react-router-dom'
import router from './Router.jsx'
import { Outlet } from 'react-router-dom'
import Header from './Components/Pages/Header/Header.jsx'
import Footer from './Components/Pages/Footer/Footer.jsx'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState ('')

    const handleSearch = (value) => {
      setSearch(value)
    }

  return (
    <>
      <Header search={search} onSearch={handleSearch}/>
      <RouterProvider router = {router}/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App

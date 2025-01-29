import {RouterProvider} from 'react-router-dom'
import router from './Router.jsx'
import { Outlet } from 'react-router-dom'
import Header from './Components/Pages/Header/Header.jsx'
import Footer from './Components/Pages/Footer/Footer.jsx'

function App() {

  return (
    <>
      <RouterProvider router = {router}/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App

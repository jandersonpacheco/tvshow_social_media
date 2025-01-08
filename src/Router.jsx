import { createBrowserRouter } from "react-router-dom"
import Home from './Components/Pages/Home/Home.jsx'
import Login from './Components/Pages/Login/Login.jsx'

const router = createBrowserRouter ([
    {   path: '/home',
        element: <Home/>
    },
    {   path: '/',
        element: <Login/>
    }
])

export default router
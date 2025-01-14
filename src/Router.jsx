import { createBrowserRouter } from "react-router-dom"
import Profile from './Components/Pages/Profile/Profile.jsx'
import Login from './Components/Pages/Login/Login.jsx'
import Home from './Components/Pages/Home/Home.jsx'

const router = createBrowserRouter ([
    {   path: '/profile/',
        element: <Profile/>
    },
    {   path: '/',
        element: <Login/>
    },
    {   path: '/home',
        element: <Home/>
    }
])

export default router
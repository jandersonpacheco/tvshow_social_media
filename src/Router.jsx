import { createBrowserRouter, Outlet } from "react-router-dom"
import Profile from './Components/Pages/Profile/Profile.jsx'
import Login from './Components/Pages/Login/Login.jsx'
import Home from './Components/Pages/Home/Home.jsx'
import Show from './Components/Pages/Show/Show.jsx'
import Header from './Components/Pages/Header/Header.jsx'
import Footer from './Components/Pages/Footer/Footer.jsx'

const router = createBrowserRouter ([
    {  
        path: '/profile/',
        element: <Profile />
    },
    {   
        path: '/',
        element: <Login />
    },
    {   
        path: '/home',
        element: <Outlet />,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: '/home/:id',
                element: <Show />
            }
        ]
    }
])

export default router

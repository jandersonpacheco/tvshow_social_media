import { createBrowserRouter } from "react-router-dom"
import Profile from './Components/Pages/Profile/Profile.jsx'
import Login from './Components/Pages/Login/Login.jsx'
import Home from './Components/Pages/Home/Home.jsx'
import Show from './Components/Pages/Show/Show.jsx'
import RandomSeries from './Components/Pages/RandomSeries/RandomSeries.jsx'

import MainLayout from "./Components/Pages/Layout/Layout.jsx"

const router = createBrowserRouter ([

    {   
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: '/:id',
                element: <Show />
            },
            {
                path:'/random-series',
                element: <RandomSeries />
            }
        ]
    },
    {  
        path: '/profile/',
        element: <Profile />
    },

    {   
        path: '/login',
        element: <Login />
    }
])

export default router

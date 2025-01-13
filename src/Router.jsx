<<<<<<< HEAD
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

=======
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

>>>>>>> 3b8cc7fcfd1f858b34eb0327eb0fe1fc9eb567c4
export default router
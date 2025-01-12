import { createBrowserRouter } from "react-router-dom"
import Profile from './Components/Pages/Profile/Profile.jsx'
import Login from './Components/Pages/Login/Login.jsx'

const router = createBrowserRouter ([
    {   path: '/profile/:userId',
        element: <Profile/>
    },
    {   path: '/',
        element: <Login/>
    }
])

export default router
import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"
import AppLayout from "./AppLayout"
import About from "./features/layout/About"
import NotFound from "./features/layout/NotFound"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><AppLayout /></Protected>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "interview/:interviewId",
                element: <Interview />
            },
            {
                path: "about",
                element: <About />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])
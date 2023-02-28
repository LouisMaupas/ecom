import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'flowbite';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// @ts-ignore
import Header from "./components/Header/Header";
// @ts-ignore

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    // {
    //     path: "/back",
    //     element: < />,
    // },
    // {
    //     path: "/about-us",
    //     element: < />,
    // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
            <Header/>
            <RouterProvider router={router}/>
    </React.StrictMode>,
)

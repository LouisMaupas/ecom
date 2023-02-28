import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'flowbite';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// @ts-ignore
import Header from "../front/components/Header/Header";

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
        <Header />
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

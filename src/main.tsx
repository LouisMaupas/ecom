import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from '../back/pages/Dashboard/Dashboard';
import './index.css'
import 'flowbite';
import StoreProvider from "../src/utils/Store"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFound from "../front/pages/NotFound";
import Cart from "../front/pages/Cart";
import dotenv from 'dotenv';

dotenv.config();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    // {
    //     path: "/about-us",
    //     element: < />,
    // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <RouterProvider router={router}/>
    </ StoreProvider>
)

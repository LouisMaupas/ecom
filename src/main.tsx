import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'flowbite';
import StoreProvider from "../src/utils/Store"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NotFound from "../front/pages/NotFound";
import Cart from "../front/pages/Cart";


// @ts-ignore
import Header from "./components/Header/Header";
// @ts-ignore

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
    <StoreProvider>
        <RouterProvider router={router}/>
    </ StoreProvider>
)

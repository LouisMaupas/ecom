import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from '../back/pages/Dashboard/Dashboard';
import './index.css'
import 'flowbite';
import StoreProvider from "../src/utils/Store"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// @ts-ignore
import Header from "./components/Header/Header";
// @ts-ignore

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
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
    <React.StrictMode>
        <StoreProvider>
            <Header/>
            <RouterProvider router={router}/>
        </ StoreProvider>
    </React.StrictMode>,
)

import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import ContactUs from "./components/Contact";
import About from "./components/About";
import Error from "./components/Error";
import {createBrowserRouter, Link, RouterProvider, Outlet} from "react-router";
import { Route } from "react-router";       
import {lazy, Suspense} from "react";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";

// const Grocery = lazy(()=>import("./components/Grocery"));

const AppLayout = ()=>{
    return (
        <Provider store={appStore}>
             <div className="app">
            <Header/>
            {/* <Body/> */}
            <Outlet/>
        </div>
        </Provider>
       
    );
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        Component: AppLayout,
        children:[
            {
                path:"/",
                Component : Body
            },
            // {
            //     path:"/queue",
            //     element: <Suspense fallback={<div>Loading...</div>}><Grocery/></Suspense>
            // }
        ],
        errorElement: <Error/>
    },
    {
        path:"/contact",
        Component : ContactUs
    }
])

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={appRouter}/>);

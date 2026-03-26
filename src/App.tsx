import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";

import ContactUs from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import AppContainer from "./components/layout/AppContainer"
import Callback from "./pages/Callback";

// const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout: React.FC = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-bg-base min-h-screen" >
        <Header />
        {/* <Body/> */}
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: AppContainer,
      },
      {
        path:"/callback",
        element: <Suspense fallback={<div>Loading...</div>}><Callback/></Suspense>
      }
      // {
      //     path:"/queue",
      //     element: <Suspense fallback={<div>Loading...</div>}><Grocery/></Suspense>
      // }
    ],
    errorElement: <Error />,
  },
  {
    path: "/contact",
    Component: ContactUs,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={appRouter} />);

// TODO:
// - debounce search
// - websdk for player
// - queue
// - authentication
// - server setup
// - queue page
// - cards UI
// - theming component design
// - music visualizer
// - lyric player
// - UI dialog component

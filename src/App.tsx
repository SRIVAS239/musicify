import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import ContactUs from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout: React.FC = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
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
        Component: Body,
      },
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

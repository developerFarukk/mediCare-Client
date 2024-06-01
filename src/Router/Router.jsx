import { createBrowserRouter } from "react-router-dom";
import HomeRoot from "./HomeRoot";
import Home from "../Components/Pages/HomePage/Home";
import LogIn from "../Authenication/LogIn/LogIn";
import Register from "../Authenication/Registation/Register";
import Shop from "../Components/Pages/Shop/Shop";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <HomeRoot></HomeRoot>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "login",
            element: <LogIn></LogIn>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
            path: "shop",
            element: <Shop></Shop>
        }
      ]
    },
  ]);

export default Router;
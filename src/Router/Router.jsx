import { createBrowserRouter } from "react-router-dom";
import HomeRoot from "./HomeRoot";



const Router = createBrowserRouter([
    {
      path: "/",
      element: <HomeRoot></HomeRoot>,
      children: [
        {
            path: "/",
        }
      ]
    },
  ]);

export default Router;
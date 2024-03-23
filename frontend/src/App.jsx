import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home"
import MainLayout from "./Pages/More/MainLayout"
// import Adoption from "./Pages/Adoption/Adoption"

export default function App(){
    const router = createBrowserRouter([
        {
          path:"/",
          element:<MainLayout/>,
          children:[
            {
              path: "/",
              element: <Home/>,
            },
            // {
            //   path: "/adoption",
            //   element: <Adoption/>,
            // },
            // {
            //   path: "/login",
            //   element: <login/>,
            // },
            
         
          ]
        },
      ]);
      return (
        <div className="App">
          <RouterProvider router={router}/>
        </div>
      )
}
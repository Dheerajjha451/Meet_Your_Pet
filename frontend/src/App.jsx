import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
// import Adoption from "./Pages/Adoption/AdoptionCenter";
// import Login from "./Pages/Login/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: "/adoption",
    //   element: <Adoption />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

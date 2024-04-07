import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Adoption from "./Pages/Adoption/AdoptionCenter";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/adoption",
      element: <Adoption />,
    },
   
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

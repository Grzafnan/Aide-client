import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <h1 style={{ fontSize: '40px', color: 'red', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Error 404!</h1>,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])
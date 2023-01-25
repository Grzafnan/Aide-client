import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../Pages/Authentication/Login/Login";
import Cart from "../Pages/Cart/Cart";
import AddProduct from "../Pages/Dashboard//AddProduct/AddProduct";
import AddUser from "../Pages/Dashboard/AddUser/AddUser";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import EditUser from "../Pages/Dashboard/EditUser/EditUser";
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
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/my-cart',
        element: <Cart />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <h1 style={{ fontSize: '40px', color: 'red', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Error 404!</h1>,
    children: [
      {
        path: '',
        element: <AllUsers />
      },
      {
        path: 'add-user',
        element: <AddUser />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'edit/:id',
        element: <EditUser />
      }
    ]
  }
])
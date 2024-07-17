import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import AdminHome from "./components/AdminHome";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";
import Login from "./components/Login";
import { currentAuthenticatedUser, currentAuthenticatedAdminUser } from "./auth/authLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: currentAuthenticatedUser
  },
  {
    path: "/admin/product",
    element: <AdminHome />,
    loader: currentAuthenticatedAdminUser
  },
  {
    path: "/admin/product/:id",
    element: <EditProduct />,
    loader: currentAuthenticatedAdminUser
  },
  {
    path: "/admin/product/create",
    element: <CreateProduct />,
    loader: currentAuthenticatedAdminUser
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import DataManagement from "./pages/Data Management/Data";
import { Overview, DataTable, Login } from "./constants";
import LoginPage from "./pages/Login/LoginPage";

const router = createBrowserRouter([
  {
    path: Overview,
    element: <Home />,
  },
  {
    path: DataTable,
    element: <DataManagement />,
  },
  {
    path: Login,
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

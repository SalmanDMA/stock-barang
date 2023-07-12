import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { DataTable, Login, Overview } from './helper/constants';
import Home from './components/Home/Home';
import LoginPage from './components/Login/LoginPage';
import Product from './components/products/products';

const router = createBrowserRouter([
 {
  path: Overview,
  element: <Home />,
 },
 {
  path: DataTable,
  element: <Product />,
 },
 {
  path: Login,
  element: <LoginPage />,
 },
]);

function App() {
 return (
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
 );
}

export default App;

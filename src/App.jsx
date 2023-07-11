import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Product from './components/products/products';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './components/Home';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Product />,
 },
 {
  path: '/home',
  element: <Home />,
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

import './Layout.css';
import Sidebar from './sidebar/Sidebar';

export default function Layout({ children }) {
 return (
  <div className='layout-container'>
   <Sidebar />
   <div className='container-fluid px-5'>{children} </div>
  </div>
 );
}

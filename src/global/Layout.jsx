import Sidebar from "./components/Sidebar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="child">{children} </div>
    </div>
  );
}

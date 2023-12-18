import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";


// Outlet - как children (для больших приложений)
export function MainLayouts () {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}
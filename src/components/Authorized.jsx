import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"


export const Authorized = () => {
  if (localStorage.getItem("rater_token")) {
    return <>
      <NavBar />
      <main style={{ paddingTop: "60px", paddingLeft: "1rem", paddingRight: "1rem" }}>
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}

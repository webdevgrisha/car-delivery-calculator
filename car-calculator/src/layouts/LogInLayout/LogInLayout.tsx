import { Outlet } from "react-router-dom"

export default function LogInLayout() {
  return (
    <main className="login-layout">      
      <Outlet />
    </main>
  )
}
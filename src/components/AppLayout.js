import { Outlet } from "react-router-dom"
import Header from "./Header/Header"

function AppLayout() {
    return (
        <div className="container">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

import { Outlet } from "react-router-dom"
import Header from "./Header/Header"
import SidebarNav from "./Header/SidebarNav"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import SearchBox from "./Header/SearchBox";
import { useMediaQuery } from "react-responsive";

function AppLayout() {
    const {isSidebarOpen} = useSelector((store) => store.cartStates);
    const isMobile = useMediaQuery({maxWidth: 1023});

    useEffect(() => {
        if(isSidebarOpen){
            document.body.classList.add("no-scroll");
        }else{
            document.body.classList.remove("no-scroll");
        }
    }, [isSidebarOpen])

    return (
        <div className="container">
            {isMobile && <SidebarNav />}
            <Header />
            <main>
                {isMobile && <div className="mobile-search-box">
                    <SearchBox />
                </div>}
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout

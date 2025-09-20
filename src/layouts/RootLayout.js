import { Outlet } from "react-router-dom"
import SidebarNav from "../components/Header/SidebarNav"
import { useSelector } from "react-redux"
import { useEffect } from "react";

import SearchBox from "../components/Header/SearchBox";
import { useResponsiveQuery } from "../context/MediaQueryContextApi";
import Header from "../components/Header/Header";

function RootLayout() {
    const {isSidebarOpen} = useSelector((store) => store.cartStates);
    const {isMobile} = useResponsiveQuery();

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
                {isMobile && 
                    <div className="mobile-search-box">
                        <SearchBox />
                    </div>
                }
                <Outlet />
            </main>
        </div>
    )
}

export default RootLayout;

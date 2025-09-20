import NavBar from "./NavBar"
import "../Header/Header.css"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import SidebarNav from "./SidebarNav";
import SearchBox from "./SearchBox";
import { useResponsiveQuery } from "../../context/MediaQueryContextApi";

function Header() {
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
        <div className="header-container">
            {isMobile && <SidebarNav />}
            <header className="header">            
                <NavBar />
            </header>
            
        </div>
    )
}

export default Header

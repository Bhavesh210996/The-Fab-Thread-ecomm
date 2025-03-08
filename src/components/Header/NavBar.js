
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useResponsiveQuery } from "../../context/MediaQueryContextApi";

function NavBar() {
  const {isMobile} = useResponsiveQuery();
  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </>
  )
}

export default NavBar
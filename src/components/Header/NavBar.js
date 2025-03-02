
// import { useCartCount } from "../../context/CartEntryCountContextApi";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

function NavBar() {
  const isMobile = useMediaQuery({maxWidth: 1023});

    return (
      <>
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </>
    )
}

export default NavBar
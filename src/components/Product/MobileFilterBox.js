import { HiMiniXMark } from "react-icons/hi2"
import FilterBox from "../ui/FilterBox"
import { useDispatch, useSelector } from "react-redux"
import { toggleFilterSideBar } from "../../context/CartSlice";

function MobileFilterBox() {
    const {isFilterBarOpen} = useSelector((store) => store.cartStates);
    const dispatch = useDispatch();
    
    return (
        <div className={`mobile-filter-container ${isFilterBarOpen ? "filter-visible" : ""}`}>
            <div className="app-filter">
                <div className="filterContent">
                    <div className="mobile-filter-section">
                        <FilterBox />
                        <div className="filter-section-close">
                            <button type="button" className="filter-close-btn" onClick={() => dispatch(toggleFilterSideBar(false))}>
                                <HiMiniXMark />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileFilterBox

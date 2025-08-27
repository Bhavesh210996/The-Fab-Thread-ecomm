import { useDispatch, useSelector } from "react-redux"
import { setFilterSearchQuery } from "../../context/ProductsSlice";

export const SearchFilter = () => {
const {filterSearchQuery} = useSelector((store) => store.products);
const dispatch = useDispatch();

    return(
        <input
            type="text"
            placeholder="Filter products..."
            value={filterSearchQuery}
            onChange={(e) => dispatch(setFilterSearchQuery(e.target.value))}
        />
    )
}
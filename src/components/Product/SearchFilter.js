import { useDispatch } from "react-redux"
import { setFilterSearchQuery } from "../../context/ProductsSlice";
import { useEffect, useState } from "react";

export const SearchFilter = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setFilterSearchQuery(query));
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch, query]);

    return(
        <input
            type="text"
            placeholder="Filter products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}
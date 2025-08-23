import { useState } from "react";
import { useSearchQuery } from "../../context/SearchProductContextApi"
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBox() {
  const [query, setQuery] = useState();
  const {setSearchQuery} = useSearchQuery()
  const navigate = useNavigate();

    function handleSearch(e){
      e.preventDefault();
      
      const filteredQuery = query?.replace(/\bt\s?shirts\b/g, 't-shirt');     
      setSearchQuery(filteredQuery)

      if(query){
        navigate(`/${query.replace(/ /g, '-')}`)
        setQuery("")
      }
      
    }
    return (
      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          className="search__field"
          placeholder="Search for products"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn search__btn" type="submit" aria-label="Search">
          <HiMagnifyingGlass/>
          {/* <span>Search</span> */}
        </button>
      </form>
    )
}

export default SearchBox

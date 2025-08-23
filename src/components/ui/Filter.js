import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

const Filter = React.memo(function Filter({filterData, type, filterField, products = []}) {
    const [searchParams, setSearchParams] = useSearchParams();

    //to remove the params if any checkbox is not checked
    useEffect(() => {
        const checkboxs = document.querySelectorAll(".filter-checkbox");
        const anyChecked = Array.from(checkboxs).some((checkbox) => checkbox.checked);

        if(!anyChecked){
            searchParams.delete(filterField);
        }
        setSearchParams(searchParams);
    }, [searchParams])
    function handleCheckbox(e) {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;
    
        const existingValue = searchParams.get(filterField) || "";
        const newValue = existingValue ? existingValue.split("%") : [];
    
        if (isChecked) {
            if(!newValue.includes(checkboxValue))
            newValue.push(checkboxValue);
        } else {
            const index = newValue.indexOf(checkboxValue);
            if (index > -1) {
                newValue.splice(index, 1);
            }
        }
        if (newValue.length === 0) {
            searchParams.delete(filterField);
        } else {
            const updateParamValues = newValue.join("%");
            searchParams.set(filterField, updateParamValues);
        }
        setSearchParams(searchParams);
    }

    return (
        <div className={`filter ${type ? `filter-${type}`  : ""}`} data-testid={type}>
            <span className="filter-title">{type}</span>
            <div className="filter-box">
                {filterData?.map((value, index) => 
                    (<div key={index} className="brand-checkbox">
                        <input type="checkbox"
                            className="filter-checkbox" 
                            value={value} 
                            checked={searchParams.get(filterField) ? searchParams.get(filterField).includes(value) : false} 
                            onChange={handleCheckbox} aria-label={value} /> 
                            <span className="filter-value">{value}</span>
                            <span className="filter-qty">({products.filter((item) => item[filterField] === value).length})</span>
                    </div>)

                )}
            </div>
        </div>
    )
})

export default Filter

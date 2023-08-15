import React from "react";

const SearchBox = (props) => {
    return ( 
        <div className="search-box col col-sm4">
            <input  className ="search-box-input " 
            size= "500"
            value={props.value}
            onChange={(event)=> props.setSearchValue(event.target.value)}
            type="text" 
            placeholder="Search Movies..." />
        </div>
     );
}
 
export default SearchBox;
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')

  const handleSearchBar = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue)
  };

  return (
    <div className="container mt-5 ">
       <div className="input-group input-group-lg mx-auto" style={{ maxWidth: '500px' }}>
        <span className="input-group-text">
          <CiSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by country..."
          value={inputValue} 
          onChange={handleSearchBar}
        />
      </div>
    </div>
  )
};

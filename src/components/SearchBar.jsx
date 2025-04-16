import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    navigate(`/countries/${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div
        className="input-group input-group-lg mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <button type="submit" className="input-group-text">
          <CiSearch />
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search by country..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </form>
  );
};

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ variant = "home" }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    navigate(`/countries/${inputValue}`);
  };

  const inputGroupStyle = {
    maxWidth: variant === "nav" ? "250px" : "350px",
    height: variant === "nav" ? "38px" : "auto",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "nav"
          ? "d-flex align-items-center m-0"
          : "container mt-0 d-flex justify-content-center"
      }
    >
      <div className="input-group" style={inputGroupStyle}>
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

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getCountryByName } from "../api";

export const SearchBar = () => {
   const navigate = useNavigate();
   const [inputValue, setInputValue] = useState("");
   const [error, setError] = useState(false);

   const handleSubmit = (event) => {
      event.preventDefault();

      if (inputValue === "") {
        return;
      }

      const lowercase = inputValue.toLowerCase();
      const normalisedInput = lowercase.replace(lowercase[0], lowercase[0].toUpperCase());
      getCountryByName(normalisedInput)
         .then(({ countryName }) => {
            console.log(countryName);
            navigate(`/countries/${countryName}`);
            setInputValue("");
         })
         .catch((err) => {
            setError(true);
            setInputValue("");
            setTimeout(() => {
               setError(false);
            }, 3000);
         });
   };

   const inputGroupStyle = {
      maxWidth: "250px",
      height: "38px",
   };

   return (
      <form onSubmit={handleSubmit} className="d-flex align-items-center m-0">
         <div className="input-group" style={inputGroupStyle}>
            <button type="submit" className="input-group-text">
               <CiSearch />
            </button>
            <input
               type="text"
               className="form-control no-focus"
               placeholder={
                  error ? "Could not find country!" : "Search by country..."
               }
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
            />
         </div>
      </form>
   );
};

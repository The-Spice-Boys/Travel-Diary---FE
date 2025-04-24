import { GlobeSearch } from './GlobeSearch.jsx';
import { SearchBar } from './SearchBar.jsx';

export const HomePage = () => {
  return (
    <div className="position-relative text-center">
      <h1 className="hero-heading">THE TRAVEL DIARY</h1>
      <h4 className='sub-heading'>Your one stop travel itinerary app, see where life takes you...</h4>
      <div className="d-flex justify-content-center position-relative">
        <GlobeSearch />
      </div>
    </div>
  );
};

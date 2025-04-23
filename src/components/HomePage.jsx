import { GlobeSearch } from './GlobeSearch.jsx';
import { SearchBar } from './SearchBar.jsx';

export const HomePage = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <GlobeSearch />
      </div>

      <SearchBar variant="home" />
    </div>
  );
};

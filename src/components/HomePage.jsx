import { GlobeSearch } from './GlobeSearch.jsx';
import { SearchBar } from './SearchBar.jsx';

export const HomePage = () => {

  return (
    <div>
      <GlobeSearch />
      <div className="my-2">
        <SearchBar variant="home" />
      </div>
    </div>
  );
};

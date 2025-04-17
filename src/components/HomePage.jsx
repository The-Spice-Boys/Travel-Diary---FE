import { GlobeSearch } from './GlobeSearch.jsx';
import { SearchBar } from './SearchBar.jsx';

export const HomePage = () => {

  return (
    <div>
      <div className="my-5">
        <SearchBar variant="home" />
      </div>
      <GlobeSearch />
    </div>
  );
};

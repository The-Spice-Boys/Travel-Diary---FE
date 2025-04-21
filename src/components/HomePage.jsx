import { GlobeSearch } from './GlobeSearch.jsx';
import { SearchBar } from './SearchBar.jsx';

export const HomePage = () => {

  return (
    <div className='flex flex-col gap-0'>
      <GlobeSearch />
        <SearchBar variant="home" />
    </div>
  );
};

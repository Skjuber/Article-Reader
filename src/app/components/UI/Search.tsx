import React, { useCallback } from "react";
import _ from "lodash";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      onSearch(query);
    }, 200),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    debouncedSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search articles"
      onChange={handleSearchChange}
    />
  );
};

export default Search;

import React from "react";
import Search from "./Search";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div>
      <h1>Article-reader</h1>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default Header;

import React from "react";
import Search from "./Search";
import "./Header.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <div className="header">
      <h1>Article-reader</h1>
      <Search onSearch={onSearch} />
    </div>
  );
};

export default Header;

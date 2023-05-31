import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../utils/types";

import LatestNews from "../UI/LatestNews";
import Header from "./Header";
import ArticlesList from "./ArticlesList";
import "./Homepage.scss";

interface HomepageProps {
  favorites: Article[];
  articlesByCategory: { [key: string]: Article[] };
  displayedArticles: Article[];
  handleSearch: (query: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({
  favorites,
  articlesByCategory,
  displayedArticles,
  handleSearch,
}) => {
  return (
    <div>
      <Header onSearch={handleSearch} />
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <ul>
          <li>You do not have any bookmarked articles!</li>
        </ul>
      ) : (
        <ArticlesList articles={favorites} />
      )}
      <h1>Articles by category</h1>
      {Object.entries(articlesByCategory).map(([category, articles], index) => (
        <div key={index}>
          <h2>
            <Link to={`/${category}`}>{category}</Link>
          </h2>
          <ArticlesList articles={articles} />
        </div>
      ))}
      <LatestNews allArticles={displayedArticles} />
    </div>
  );
};

export default Homepage;

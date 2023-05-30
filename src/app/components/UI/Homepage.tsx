import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../../App";
import ArticleActions from "../store/reducers/ArticleActions";
import LatestNews from "../UI/LatestNews";
import Header from "./Header";
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
        <ul>
          {favorites.map((article, index) => (
            <li key={index}>
              <div className="article-header">
                <h3>{article.title}</h3>
                <ArticleActions article={article} />
              </div>
              <p>{article.publishedAt.toString()}</p>
            </li>
          ))}
        </ul>
      )}
      <h1>Articles by category</h1>
      {Object.entries(articlesByCategory).map(([category, articles], index) => (
        <div key={index}>
          <h2>
            <Link to={`/${category}`}>{category}</Link>
          </h2>
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                <div className="article-header">
                  <h3>{article.title}</h3>
                  <ArticleActions article={article} />
                </div>
                <p>{article.publishedAt.toString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <LatestNews allArticles={displayedArticles} />
    </div>
  );
};

export default Homepage;

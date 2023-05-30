import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Category from "./components/UI/Category";
import LatestNews from "./components/UI/LatestNews";
import {
  addArticle,
  removeArticle,
} from "./components/store/reducers/FavoriteArticlesSlice";
import { RootState } from "./components/store/store";
import Search from "./Search";
import "./App.scss";
import { FiBookmark, FiMinus } from "react-icons/fi";

export interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

const ArticleActions: React.FC<{ article: Article }> = ({ article }) => {
  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!favorites.some((favorite) => favorite.title === article.title)) {
      dispatch(addArticle(article));
    } else {
      dispatch(removeArticle(article));
    }
  };

  const isFavorite = favorites.some(
    (favorite) => favorite.title === article.title
  );

  return (
    <button
      onClick={handleClick}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      className="article-action"
    >
      {isFavorite ? <FiMinus /> : <FiBookmark />}
    </button>
  );
};

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);

  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7hEQKkyr9wQu1oS7rhrDLPG7psTxzfGQ`;

    axios
      .get(url)
      .then((response) => {
        let articles = response.data.response.docs.map((doc: any) => ({
          title: doc.headline.main,
          category: doc.section_name,
          publishedAt: new Date(doc.pub_date),
        }));

        // Sorting articles in descending order (most recent first)
        articles = articles.sort(
          (a: Article, b: Article) =>
            b.publishedAt.getTime() - a.publishedAt.getTime()
        );

        setArticles(articles);
        setDisplayedArticles(articles.slice(0, 10));
        setRemainingArticles(articles.slice(10));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const articlesByCategory = filteredArticles.reduce<{
    [key: string]: Article[];
  }>((groups, article) => {
    const category = article.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(article);
    return groups;
  }, {});

  const handleSearch = (query: string) => {
    // Update the search query and filter the articles
    setSearchQuery(query);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (remainingArticles.length > 0) {
        setDisplayedArticles((prevDisplayedArticles) => {
          const moreArticles = remainingArticles.slice(0, 10);
          return [...prevDisplayedArticles, ...moreArticles];
        });
        setRemainingArticles((prevRemainingArticles) =>
          prevRemainingArticles.slice(10)
        );
      }
    }
  };

  const handleScrollRef = useRef(handleScroll); // Create a ref to the handleScroll function

  useEffect(() => {
    window.addEventListener("scroll", handleScrollRef.current); // Use the ref to attach the event listener
    return () => {
      window.removeEventListener("scroll", handleScrollRef.current); // Use the ref to remove the event listener
    };
  }, []);

  return (
    <div>
      <h1>Newsy</h1>
      <Search onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
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
              {Object.entries(articlesByCategory).map(
                ([category, articles], index) => (
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
                )
              )}
              <LatestNews allArticles={displayedArticles} />
            </div>
          }
        />
        <Route
          path="/:category"
          element={<Category articlesByCategory={articlesByCategory} />}
        />
      </Routes>
    </div>
  );
};

export default App;

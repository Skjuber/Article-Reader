import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import LatestNews from "./LatestNews";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";
import { RootState } from "./store";
import _ from "lodash";

export interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);

  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=cb1423ece681450bb3f49a1d996b915f`;

    axios
      .get(url)
      .then((response) => {
        const articles = response.data.articles.map((article: any) => ({
          title: article.title,
          category: article.source.name,
          publishedAt: new Date(article.publishedAt),
        }));

        setArticles(articles);
        setDisplayedArticles(articles.slice(0, 10));
        setRemainingArticles(articles.slice(10));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleClick = (article: Article) => {
    dispatch(addArticle(article));
  };

  const handleRemove = (article: Article) => {
    dispatch(removeArticle(article));
  };

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

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      console.log(2);
      setSearchQuery(query);
    }, 200),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    console.log(1);

    debouncedSearch(event.target.value);
  };

  // Load more articles when user scrolls to bottom
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      if (remainingArticles.length > 0) {
        const moreArticles = remainingArticles.slice(0, 10);
        setDisplayedArticles([...displayedArticles, ...moreArticles]);
        setRemainingArticles(remainingArticles.slice(10));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedArticles, remainingArticles]);

  return (
    <div>
      <h1>Newsy</h1>
      <input
        type="text"
        placeholder="Search articles"
        onChange={handleSearchChange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Favorites</h2>
              <ul>
                {favorites.map((article, index) => (
                  <li key={index}>
                    <h3>{article.title}</h3>
                    <p>{article.publishedAt.toString()}</p>
                    <button onClick={() => handleRemove(article)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              {Object.entries(articlesByCategory).map(
                ([category, articles], index) => (
                  <div key={index}>
                    <h2>
                      <Link to={`/${category}`}>{category}</Link>
                    </h2>
                    <ul>
                      {articles.map((article, index) => (
                        <li key={index}>
                          <h3>{article.title}</h3>
                          <p>{article.publishedAt.toString()}</p>
                          {favorites.includes(article) ? (
                            <button onClick={() => handleRemove(article)}>
                              Remove
                            </button>
                          ) : (
                            <button onClick={() => handleClick(article)}>
                              Bookmark
                            </button>
                          )}
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

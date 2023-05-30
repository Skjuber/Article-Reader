import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import LatestNews from "./LatestNews";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";
import { RootState } from "./store";
import _ from "lodash";
import "./App.scss";

export interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

const ArticleActions = ({ article }: { article: Article }) => {
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

  return (
    <button onClick={handleClick}>
      {favorites.some((favorite) => favorite.title === article.title)
        ? "Remove from Favorites"
        : "Add to Favorites"}
    </button>
  );
};

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

  const handleClick = (article: Article) => {
    if (!favorites.some((favorite) => favorite.title === article.title)) {
      dispatch(addArticle(article));
    }
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
      setSearchQuery(query);
    }, 200),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    debouncedSearch(event.target.value);
  };

  const handleScroll = useCallback(() => {
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
  }, [remainingArticles]);

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
                          <ArticleActions article={article} />
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

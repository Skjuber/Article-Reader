import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Category from "./Category";

export interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [favorites, setFavorites] = useState<Article[]>([]);

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
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleClick = (article: Article) => {
    setFavorites([...favorites, article]);
  };

  const articlesByCategory = articles.reduce<{
    [key: string]: Article[];
  }>((groups, article) => {
    const category = article.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(article);
    return groups;
  }, {});

  return (
    <div>
      <h1>Newsy</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div>
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
                          <button onClick={() => handleClick(article)}>
                            Bookmark
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
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

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./components/store/store";
import Category from "./components/UI/Category";
import Homepage from "./components/UI/Homepage";
import { Article } from "./types";

import "./App.scss";

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);

  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );

  useEffect(() => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7hEQKkyr9wQu1oS7rhrDLPG7psTxzfGQ`;

    axios
      .get(url)
      .then((response) => {
        let articles = response.data.response.docs
          // Filter if there is no Category.title present in api
          .filter((doc: any) => doc.section_name)
          .map((doc: any) => ({
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
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            favorites={favorites}
            articlesByCategory={articlesByCategory}
            displayedArticles={displayedArticles}
            handleSearch={handleSearch}
          />
        }
      />
      <Route
        path="/:category"
        element={<Category articlesByCategory={articlesByCategory} />}
      />
    </Routes>
  );
};

export default App;

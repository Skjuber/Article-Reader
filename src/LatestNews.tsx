import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Article } from "./App";

interface LatestNewsProps {
  allArticles: Article[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ allArticles }) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);

  const favoriteArticles = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );

  useEffect(() => {
    setDisplayedArticles(allArticles.slice(0, 10));
    setRemainingArticles(allArticles.slice(10));
  }, [allArticles]);

  useEffect(() => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedArticles, remainingArticles]);

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {displayedArticles.map((article: Article, index: number) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.publishedAt.toString()}</p>
            <button
              onClick={() => {
                // Add the article to favorites
                // You can dispatch an action to your favoriteArticlesSlice here
              }}
            >
              Add to Favorites
            </button>
          </li>
        ))}
      </ul>
      <p>Loading...</p>
    </div>
  );
};

export default LatestNews;

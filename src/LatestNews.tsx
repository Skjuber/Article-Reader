import React, { useState, useEffect } from "react";
import { Article } from "./App";

interface LatestNewsProps {
  allArticles: Article[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ allArticles }) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [remainingArticles, setRemainingArticles] = useState<Article[]>([]);

  // Split your articles into displayed and remaining on initial render
  useEffect(() => {
    setDisplayedArticles(allArticles.slice(0, 10));
    setRemainingArticles(allArticles.slice(10));
  }, [allArticles]);

  // TODO: Add scroll event listener to load more articles

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {displayedArticles.map((article: Article, index: number) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.publishedAt.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNews;

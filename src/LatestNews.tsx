import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Article } from "./App";

interface LatestNewsProps {
  allArticles: Article[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ allArticles }) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    let startIndex = displayedArticles.length % allArticles.length;
    let endIndex = startIndex + 10;
    const moreArticles = allArticles.slice(startIndex, endIndex);
    setDisplayedArticles([...displayedArticles, ...moreArticles]);
  };

  return (
    <div>
      <h1>Latest News</h1>
      <InfiniteScroll
        dataLength={displayedArticles.length} // This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <ul>
          {displayedArticles.map((article: Article, index: number) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.publishedAt.toString()}</p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default LatestNews;

import React from "react";
import { Article } from "../utils/types";

import ArticleActions from "../store/reducers/ArticleActions";

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  return (
    <ul className="articles-list">
      {articles.map((article: Article, index: number) => (
        <li key={index}>
          <div className="article-header">
            <h3>{article.title}</h3>
            <ArticleActions article={article} />
          </div>
          <p>{article.publishedAt.toString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;

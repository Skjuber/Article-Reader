import React from "react";
import { useParams } from "react-router-dom";
import { Article } from "./App";

interface CategoryProps {
  articlesByCategory: { [key: string]: Article[] };
}

const Category: React.FC<CategoryProps> = ({ articlesByCategory }) => {
  const { category } = useParams<{ category?: string }>();

  // Add a check for undefined category
  if (!category) {
    return <p>No category selected.</p>;
  }

  const articles = articlesByCategory[category];

  // Check for undefined articles
  if (!articles) {
    return <p>No articles found for category {category}.</p>;
  }

  return (
    <div>
      <h1>{category}</h1>
      <ul>
        {articles.map((article: Article, index: number) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.publishedAt.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

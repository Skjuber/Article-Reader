import React from "react";
import { useParams, Link } from "react-router-dom";
import { Article } from "../utils/types";

import ArticlesList from "./ArticlesList";
import "./Category.scss";

interface CategoryProps {
  articlesByCategory: { [key: string]: Article[] };
}

const Category: React.FC<CategoryProps> = ({ articlesByCategory }) => {
  const { category } = useParams<{ category?: string }>();

  if (!category) {
    return <p>No category selected.</p>;
  }

  const articles = articlesByCategory[category];

  if (!articles) {
    return <p>No articles found for category {category}.</p>;
  }

  return (
    <div>
      <h1 className="categories-heading">{category}</h1>
      <ArticlesList articles={articles} />
      <Link to="/" className="return-home-button">
        Return to Home
      </Link>
    </div>
  );
};

export default Category;

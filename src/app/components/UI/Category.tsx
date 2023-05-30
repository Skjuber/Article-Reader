import React from "react";
import { useParams, Link } from "react-router-dom";
import { Article } from "../../App";
import ArticleActions from "../store/reducers/ArticleActions";
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
      <ul>
        {articles.map((article: Article, index: number) => (
          <li key={index}>
            <div className="article-header categories">
              <div className="title categories">
                <h3>{article.title}</h3>
                <div className="bookmark-button categories">
                  <ArticleActions article={article} />
                </div>
              </div>
            </div>
            <p>{article.publishedAt.toString()}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Category;

import React from "react";
import { useParams, Link } from "react-router-dom";
import { Article } from "../App";
import { addArticle, removeArticle } from "./store/FavoriteArticlesSlice";
import { RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import ArticleActions from "./store/ArticleActions";

interface CategoryProps {
  articlesByCategory: { [key: string]: Article[] };
}

const Category: React.FC<CategoryProps> = ({ articlesByCategory }) => {
  const { category } = useParams<{ category?: string }>();

  const favorites = useSelector(
    (state: RootState) => state.favoriteArticles.value
  );
  const dispatch = useDispatch();

  const handleClick = (article: Article) => {
    dispatch(addArticle(article));
  };

  const handleRemove = (article: Article) => {
    dispatch(removeArticle(article));
  };

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
            <ArticleActions article={article} />
          </li>
        ))}
      </ul>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Category;

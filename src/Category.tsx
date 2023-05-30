import React from "react";
import { useParams } from "react-router-dom";
import { Article } from "./App";
import { addArticle, removeArticle } from "./FavoriteArticlesSlice";
import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
            {favorites.some((favorite) => favorite.title === article.title) ? (
              <button onClick={() => handleRemove(article)}>Remove</button>
            ) : (
              <button onClick={() => handleClick(article)}>Bookmark</button>
            )}
          </li>
        ))}
      </ul>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Category;

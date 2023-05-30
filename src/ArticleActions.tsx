import React, { useState } from "react";
import { Article } from "./App";

interface ArticleActionsProps {
  article: Article;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({ article }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default ArticleActions;

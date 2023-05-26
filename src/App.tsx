import React, { Component } from "react";
import ReactDOM from "react-dom";

interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

class App extends Component {
  state = {
    articles: [
      {
        title: "Article 1",
        category: "Technology",
        publishedAt: new Date(),
      },
      {
        title: "Article 2",
        category: "Business",
        publishedAt: new Date(),
      },
      {
        title: "Article 3",
        category: "Sports",
        publishedAt: new Date(),
      },
    ],
    favorites: [],
  };

  handleClick = (article: Article) => {
    this.setState({
      favorites: [...this.state.favorites, article],
    });
  };

  render() {
    const articlesByCategory = this.state.articles.reduce<{
      [key: string]: Article[];
    }>((groups, article) => {
      const category = article.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(article);
      return groups;
    }, {});

    return (
      <div>
        <h1>Newsy</h1>
        {Object.entries(articlesByCategory).map(
          ([category, articles], index) => (
            <div key={index}>
              <h2>{category}</h2>
              <ul>
                {(articles as Article[]).map((article, index) => (
                  <li key={index}>
                    <h3>{article.title}</h3>
                    <p>{article.publishedAt.toString()}</p>
                    <button onClick={() => this.handleClick(article)}>
                      Bookmark
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    );
  }
}

export default App;

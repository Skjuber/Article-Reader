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
    return (
      <div>
        <h1>Newsy</h1>
        <div>
          <ul>
            {this.state.articles.map((article, index) => (
              <li key={index}>
                <h2>{article.title}</h2>
                <p>{article.category}</p>
                <p>{article.publishedAt.toString()}</p>
                <button onClick={() => this.handleClick(article)}>
                  Bookmark
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

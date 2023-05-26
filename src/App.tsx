import React, { Component } from "react";
import axios from "axios";

interface Article {
  title: string;
  category: string;
  publishedAt: Date;
}

class App extends Component<{}, { articles: Article[]; favorites: Article[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      articles: [],
      favorites: [],
    };
  }

  componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=cb1423ece681450bb3f49a1d996b915f`;

    axios
      .get(url)
      .then((response) => {
        const articles = response.data.articles.map((article: any) => ({
          title: article.title,
          category: article.source.name,
          publishedAt: new Date(article.publishedAt),
        }));

        this.setState({ articles });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

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

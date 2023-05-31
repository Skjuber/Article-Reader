# Article-Reader

Article-Reader is is a simple and user-friendly frontend application built using React and Sass/SCSS. It is designed to aggregate and display articles in an organized, categorized, and chronological order. You can browse, search, bookmark your favorite articles, and view them by category.

Article-Reader employs the power of the New York Times API to fetch real-time and authentic articles, providing you with a reliable and current newsfeed.

In addition to its features mentioned above, Article-Reader also leverages the capabilities of the browser's Local Storage to enhance the user experience. The application utilizes Local Storage for storing the state of bookmarked articles.

When a user bookmarks an article, the relevant data is saved to the Local Storage, allowing the application to remember the user's preferences even after closing and reopening the browser. This ensures that the bookmarked articles remain accessible and can be easily retrieved by the user whenever needed.

## Deployment

Deployment of the application is avaiable on the following link: https://article-reader.vercel.app/

## Features

- Homepage: Displays all articles grouped by categories and sorted chronologically.
- Latest news widget: Features infinite scroll functionality for seamless browsing.
- Category page: Every category is clickable, leading to a page displaying all articles from that specific category.
- Search filter: Allows users to search for articles by name.
- Bookmarking: Users can bookmark their favorite articles. This data is stored in the app state/browser storage.
- Favorites category: Bookmarking an article will add it to the 'Favorites' category on the homepage.

# Installation

Clone the repository:

### `git clone https://github.com/yourusername/NewsFolio.git`

### `cd NewsFolio`

Install the dependencies:

### `npm install`

Start the app

### `npm start`

Visit http://localhost:3000 in your browser to view the application.

# API Key

To fetch articles from the New York Times API, you'll need to include your API Key. Create a `.env` file in the root directory and add your key:

### `REACT_APP_NYT_API_KEY=yourapikey`

Replace 'yourapikey' with your actual API key from the New York Times.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

# Contact

Ante Šimac- ante.frontend@gmail.com

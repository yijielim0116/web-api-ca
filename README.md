# Assignment 2 - Web API

Name: Yi Jie Lim

A full-stack movies app: a Node.js/Express **Movies API** backed by MongoDB, and the React movies app reworked to use it. The API proxies TMDB, and stores users, favourites, watchlists and reviews in MongoDB, with JWT authentication.

Web App Development 2 · South East Technological University (SETU)

## Movies API (`movies-api`)

| Route | What it does |
|---|---|
| `POST /api/users` | Register (`?action=register`) or log in, returning a JWT. Passwords must be 8+ characters with a letter, a number and a symbol, and are hashed with bcrypt. |
| `GET /api/movies/discover`, `/popular`, `/topRated`, `/nowPlaying`, `/upcoming`, `/trending` | Movie lists from TMDB |
| `GET /api/movies/:id`, `/:id/credits`, `/:id/images`, `/:id/similar`, `/:id/recommendations` | Movie details |
| `GET /api/movies/search`, `/genres`, `/collection/:id` | Search, genres and collections |
| `GET /api/movies/person/:id`, `/person/:id/combined_credits` | Actor details and films |
| `GET/POST/DELETE /api/movies/favourites` and `/watchlist` | The logged-in user's favourites and watchlist (MongoDB) |
| `GET/POST/DELETE /api/reviews` | The user's reviews (MongoDB, login required) |

## React app (`react-movies`)

The movies app from the React assignment, now calling the Movies API instead of TMDB directly. It adds sign-up, login and profile pages, and keeps each user's favourites, watchlist and reviews in the database.

## Running it

1. Create `movies-api/.env`:

   ```
   NODE_ENV=development
   PORT=8080
   MONGO_DB=your_mongodb_connection_string
   SECRET=your_jwt_secret
   TMDB_KEY=your_tmdb_api_key
   ```

2. Start the API:

   ```bash
   cd movies-api
   npm install
   npm run dev
   ```

3. Start the React app (it expects the API on port 8080):

   ```bash
   cd react-movies
   npm install
   npm run dev
   ```

## Tools

JavaScript · Node.js · Express · MongoDB · Mongoose · JWT · bcrypt · React · Vite · Material UI · TanStack Query · TMDB API

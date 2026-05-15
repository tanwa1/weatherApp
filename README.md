# Weather App

A modern weather dashboard web application that allows users to search for any city and view current weather conditions, 15-day forecasts, and key statistics like humidity, wind speed, UV index, and more. Built with vanilla JavaScript, SCSS, and Webpack.

## Features

- **City Search:** Enter any city to fetch and display real-time weather data.
- **Current Weather:** View temperature, feels-like, max/min temperatures, and weather conditions.
- **15-Day Forecast:** See an extended forecast with weather icons and details.
- **Weather Stats:** Visual bars for humidity, wind speed, UV index, and visibility.
- **Sunrise/Sunset & Precipitation:** Get sunrise/sunset times and precipitation info.
- **Loading Spinner:** Responsive spinner during data fetches for better UX.
- **Mobile Responsive:** Optimized for both desktop and mobile screens.
- **Data Caching:** Last searched city is cached in localStorage and auto-loaded on refresh.

## Tech Stack

- **JavaScript (ES6+)**
- **SCSS** (with mobile-first responsive design)
- **Webpack** (modular bundling, dev server, asset management)
- **date-fns** (date formatting)
- **spin.js** (loading spinner)

## Project Structure

```
src/
	index.html           # Main HTML file
	index.js             # App entry point
	assets/              # Weather icons (GIFs)
	controllers/
		controller.js      # Handles user input and app logic
	models/
		fetchData.js       # Fetches weather data from API
		storage.js         # LocalStorage caching
	styles/
		index.scss         # Main styles
		mobileUI.scss      # Mobile responsiveness
	views/
		render.js          # UI rendering functions
		spinner.js         # Loading spinner logic
```

## Architecture: MVC Pattern

This project follows the **Model-View-Controller (MVC)** architectural pattern for clear separation of concerns:

- **Model:**
  - `models/fetchData.js`: Handles fetching weather data from the API.
  - `models/storage.js`: Manages localStorage caching and retrieval.
- **View:**
  - `views/render.js`: Renders UI components and updates the DOM with weather data.
  - `views/spinner.js`: Manages the loading spinner UI.
- **Controller:**
  - `controllers/controller.js`: Handles user interactions (search input, button clicks), coordinates data fetching, and updates the view.

This structure makes the codebase modular, maintainable, and easy to extend.

## Getting Started

1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Run in development mode:**
	 ```bash
	 npm start
	 ```
	 This will launch the app at `http://localhost:8080` (or another port if 8080 is busy).
3. **Build for production:**
	 ```bash
	 npm run build
	 ```

## API

- Uses [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) (API key required, see `src/controllers/controller.js`).

## Customization

- **Weather Icons:** Add or replace GIFs in `src/assets/` and update `src/assets/index.js` as needed.
- **Styling:** Modify SCSS files in `src/styles/` for custom themes or layouts.



# Cloudify

Cloudify is a React and TypeScript-based weather application that provides real-time weather data for cities around the world. The app uses the OpenWeather API to fetch and display weather information. The background image is dynamic.

## Features

- **Search Functionality:**
  Users can search for a city by typing its name. On pressing enter, the weather data for the entered city is displayed.

- **Predefined City Buttons:**
  Some buttons for predefined cities are provided on the right-hand side of the interface. Clicking on these buttons fetches and displays weather data for the respective city.

- **Dynamic Backgrounds:**
  - Displays a night-themed background if it is nighttime in the selected city.
  - Displays a day-themed background if it is daytime in the selected city.

## Technologies Used

- **React**
- **TypeScript**
- **OpenWeather API**
- **CSS**

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/pragya-celestial-systems/cloudify.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd cloudify
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Create an `.env` File:**
   Add your OpenWeather API key in a `.env` file at the root of your project:
   ```plaintext
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. **Run the Application:**
   ```bash
   npm start
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Search for a City:**
   - Enter the name of the city in the search bar and press `Enter`.
   - The weather details of the city will be displayed.

2. **Use Predefined Buttons:**
   - Click on any of the predefined city buttons to quickly view weather data for that city.

3. **Observe Background Changes:**
   - The background will change dynamically based on the time of day (day/night) in the selected city.

## API Integration

Cloudify uses the [OpenWeather API](https://openweathermap.org/api) to fetch weather data. Ensure you have a valid API key to use this application.


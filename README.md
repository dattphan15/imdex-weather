# Project Title

Imdex Weather is a single-page weather app built with React and ExpressJS.

## Description
Using the **<a href="https://openweathermap.org/api">OpenWeather API</a>**, the Imdex Weather app allows users to search over 200,000 cities to see what the weather is like for the city being searched. Users can view details such as the Temperature, Humidity, and Description of the weather (Sunny, Cloudy, Rain, etc.)

## Getting Started

### Dependencies

* Node v14.19.2^
* ReactJS
* ExpressJS
* Axios
* PostgreSQL

### Installing

1. Create an <code> .env </code> in the **/backend** directory where you'll be providing the required API Keys. 

2. Obtain the Current Weather API key from **<a href="https://openweathermap.org/api">OpenWeather API</a>**. Place the API key in the ```.env ``` file you created in the backend. 

### Executing program

1. Install all frontend dependencies while in the main **/frontend** directory.
```
npm install
```

2. Open another terminal and install all backend dependencies while in the main **/backend** directory.

```
npm install
```

4. Launch the frontend client and backend server with the two terminals open.
```
npm start
```

5. Lastly, visit the website on your localhost.
```
http://localhost:3001/
```

## Authors

[Kevin Phan](https://www.linkedin.com/in/kevinphan15/)

## Version History

* 0.2
    * Setup JWT Auth / Users model
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release without JWT Auth / Users

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

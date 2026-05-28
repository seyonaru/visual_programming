import axios from 'axios';
import type { WeatherData, ForecastData, AirPollutionData, GeocodingData } from '../types/weather';


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_URL;

export const weatherApi = {
    getCurrentWeather: async (city: string): Promise<WeatherData> => {
        console.log('Запрос погоды:', `${BASE_URL}/weather?q=${city}`);

        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'ru'
            },
            timeout: 10000, 
        });

        return response.data;
    },

    getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
        console.log('Запрос прогноза:', `${BASE_URL}/forecast?lat=${lat}&lon=${lon}`);

        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
                lang: 'ru'
            },
            timeout: 10000,
        });

        return response.data;
    },

    getAirPollution: async (lat: number, lon: number): Promise<AirPollutionData> => {
        console.log('Запрос загрязнения:', `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}`);

        const response = await axios.get(`${BASE_URL}/air_pollution`, {
            params: {
                lat,
                lon,
                appid: API_KEY
            },
            timeout: 10000,
        });

        return response.data;
    },

    searchCity: async (cityName: string): Promise<GeocodingData[]> => {
        console.log('Поиск города:', `${GEO_URL}/direct?q=${cityName}`);

        const response = await axios.get(`${GEO_URL}/direct`, {
            params: {
                q: cityName,
                limit: 5,
                appid: API_KEY
            },
            timeout: 10000,
        });

        return response.data;
    },
};
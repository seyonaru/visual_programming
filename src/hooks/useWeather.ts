import { useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import type { WeatherData, ForecastData, AirPollutionData } from '../types/weather';

const MOCK_WEATHER: WeatherData = {
    coord: { lon: 37.61, lat: 55.75 },
    weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }],
    main: {
        temp: 27,
        feels_like: 26,
        temp_min: 25,
        temp_max: 28,
        pressure: 756,
        humidity: 80,
    },
    wind: { speed: 5 },
    dt: Date.now() / 1000,
    name: 'Moscow',
};

const MOCK_FORECAST: ForecastData = {
    list: Array.from({ length: 40 }, (_, i) => ({
        dt: Date.now() / 1000 + i * 3600,
        main: {
            temp: 26 + Math.random() * 2,
            feels_like: 25,
            temp_min: 25,
            temp_max: 27,
            pressure: 756,
            humidity: 78,
        },
        weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }],
        wind: { speed: 3 },
        dt_txt: new Date(Date.now() + i * 3600 * 1000).toISOString(),
    })),
    city: {
        name: 'Moscow',
        country: 'RU',
    },
};

const MOCK_POLLUTION: AirPollutionData = {
    list: [
        {
            main: { aqi: 2 },
            components: {
                co: 230.31,
                no: 0.42,
                no2: 8.43,
                o3: 89.25,
                so2: 1.58,
                pm2_5: 4.12,
                pm10: 5.67,
            },
        },
    ],
};

interface UseWeatherReturn {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    airPollution: AirPollutionData | null;
    loading: boolean;
    error: string | null;
    loadWeather: (city: string) => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadWeather = useCallback(async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            console.log('🔄 Загружаем погоду для:', city);

            const weatherData = await weatherApi.getCurrentWeather(city);
            console.log('✅ Погода получена:', weatherData);

            setWeather(weatherData);

            const forecastData = await weatherApi.getForecast(
                weatherData.coord.lat,
                weatherData.coord.lon
            );
            console.log('✅ Прогноз получен:', forecastData);

            setForecast(forecastData);

            const pollutionData = await weatherApi.getAirPollution(
                weatherData.coord.lat,
                weatherData.coord.lon
            );
            console.log('✅ Загрязнение получено:', pollutionData);

            setAirPollution(pollutionData);

        } catch (err) {
            console.error('❌ Ошибка API, используем моки:', err);

            setWeather(MOCK_WEATHER);
            setForecast(MOCK_FORECAST);
            setAirPollution(MOCK_POLLUTION);

            setError('Не удалось загрузить данные с сервера. Показываем тестовые данные.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { weather, forecast, airPollution, loading, error, loadWeather };
};
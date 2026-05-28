import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { Forecast } from './components/Forecast/Forecast';
import { CitySearch } from './components/CitySearch/CitySearch';
import { AirPollution } from './components/AirPollution/AirPollution';
import styles from './App.module.css';

function App() {
  const { weather, forecast, airPollution, loading, error, loadWeather } = useWeather();

  useEffect(() => {
    loadWeather('Moscow');

    const interval = setInterval(() => {
      if (weather?.name) {
        loadWeather(weather.name);
      }
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCitySelect = (city: string) => {
    loadWeather(city);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Погода</h1>

      <CitySearch onCitySelect={handleCitySelect} />

      {weather && <WeatherCard weather={weather} />}

      {forecast && <Forecast forecast={forecast} />}

      {airPollution && <AirPollution pollution={airPollution} />}
    </div>
  );
}

export default App;
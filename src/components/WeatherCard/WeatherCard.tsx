import React from 'react';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
    weather: any;
    isNight?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isNight = false }) => {
    if (!weather) return null;

    const date = new Date(weather.dt * 1000);
    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric' });
    const currentTime = date.getHours();
    const isNightTime = currentTime < 6 || currentTime > 21;

    return (
        <div className={`${styles.card} ${isNight || isNightTime ? styles.night : styles.day}`}>
            <div className={styles.header}>
                <span className={styles.date}>{dayName}</span>
                <h2 className={styles.city}>{weather.name}</h2>
            </div>

            <div className={styles.main}>
                <span className={styles.temperature}>
                    {Math.round(weather.main.temp)}°
                </span>
                <WeatherIcon iconId={weather.weather[0].id} className={styles.icon} />
            </div>

            <div className={styles.description}>
                {weather.weather[0].description}
            </div>

            <div className={styles.details}>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>Влажность</span>
                    <span className={styles.detailValue}>{weather.main.humidity}%</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>Ветер</span>
                    <span className={styles.detailValue}>{weather.wind.speed} м/с</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>Давление</span>
                    <span className={styles.detailValue}>{weather.main.pressure} мм рт.ст.</span>
                </div>
                <div className={styles.detail}>
                    <span className={styles.detailLabel}>Ощущается</span>
                    <span className={styles.detailValue}>{Math.round(weather.main.feels_like)}°</span>
                </div>
            </div>
        </div>
    );
};
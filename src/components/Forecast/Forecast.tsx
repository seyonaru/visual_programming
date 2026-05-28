import React from 'react';
import {WeatherIcon} from '../WeatherIcon/WeatherIcon';
import styles from './Forecast.module.css';

interface ForecastProps {
    forecast: any;
}

export const Forecast: React.FC<ForecastProps> = ({forecast}) => {
    if(!forecast) return null;
    const dailyForecast = forecast.list.reduce((acc: any, item: any) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric'});

        if(!acc[day]) {
            acc[day] = {
                temps: [],
                weather: item.weather[0],
            };
        }
        acc[day].temps.push(item.main.temp);
        return acc;
    }, {});

    const days = Object.entries(dailyForecast).slice(0,7);

    return ( 
        <div className = {styles.container}>
            <h3 className = {styles.title}>Прогноз на неделю</h3>

            <div className = {styles.list}>
                {days.map(([day, data]: [string, any]) => {
                    const minTemp = Math.round(Math.min(...data.temps));
                    const maxTemp = Math.round(Math.max(...data.temps));

                    return (
                        <div key = {day} className = {styles.day}>
                            <span className = {styles.dayName}>{day}</span>
                            <WeatherIcon iconId = {data.weather.id} className = {styles.icon} />
                            <div className = {styles.temps}>
                                <span className = {styles.maxTemp}>+{maxTemp}°</span>
                                <span className = {styles.minTemp}>+{minTemp}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
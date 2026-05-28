import React from 'react';
import styles from './WeatherIcon.module.css';

interface WeatherIconProps {
    iconId: number;
    className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({iconId, className = ''}) => {
    const getIconEmoji = (id: number): string => {
        if(id >= 200 && id < 300) {
            if (id === 211 || id === 212 || id === 231 || id === 232) return '⛈️';
            return '🌩️';
        }

        if (id >= 300 && id < 400) return '🌦️';

        if(id >= 500 && id < 600) {
            if (id === 511 || id === 520 || id === 521 || id === 522) return '🌧️';
            return '🌧️';;
        }

        if(id >= 600 && id < 700) { 
            if (id === 602 || id === 622) return '❄️';
            return '🌨️';
        }

        if(id >= 700 && id < 800) return '🌫️';

        if (id === 800) return '☀️';

        if (id === 801) return '🌤️';
        
        if (id === 802) return '⛅';
        
        if (id >= 803 && id <= 804) return '☁️';

        return '🌡️';
    };

    return (
        <span className={`${styles.icon} ${className}`} role = 'img' aria-label = 'weather icon'>
            {getIconEmoji(iconId)}
        </span>
    );
};
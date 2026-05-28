import React from 'react';
import styles from './AirPollution.module.css';

interface AirPollutionProps {
    pollution: any;
}

export const AirPollution: React.FC<AirPollutionProps> = ({ pollution }) => {
    if (!pollution || !pollution.list || pollution.list.length === 0) {
        return null;
    }

    const data = pollution.list[0];
    const aqi = data.main.aqi;

    // Определяем качество воздуха по индексу AQI
    const getAQILabel = (aqi: number): string => {
        switch (aqi) {
            case 1: return 'Отличное';
            case 2: return 'Хорошее';
            case 3: return 'Удовлетворительное';
            case 4: return 'Плохое';
            case 5: return 'Очень плохое';
            default: return 'Неизвестно';
        }
    };

    const getAQIColor = (aqi: number): string => {
        switch (aqi) {
            case 1: return '#4CAF50'; // зеленый
            case 2: return '#8BC34A'; // светло-зеленый
            case 3: return '#FFC107'; // желтый
            case 4: return '#FF9800'; // оранжевый
            case 5: return '#F44336'; // красный
            default: return '#9E9E9E'; // серый
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Качество воздуха</h3>

            <div className={styles.aqiBlock}>
                <div className={styles.aqiValue} style={{ color: getAQIColor(aqi) }}>
                    {aqi}
                </div>
                <div className={styles.aqiLabel}>
                    {getAQILabel(aqi)}
                </div>
            </div>

            <div className={styles.components}>
                <div className={styles.component}>
                    <span className={styles.componentName}>PM2.5</span>
                    <span className={styles.componentValue}>{data.components.pm2_5.toFixed(2)} μg/m³</span>
                </div>
                <div className={styles.component}>
                    <span className={styles.componentName}>PM10</span>
                    <span className={styles.componentValue}>{data.components.pm10.toFixed(2)} μg/m³</span>
                </div>
                <div className={styles.component}>
                    <span className={styles.componentName}>O₃ (Озон)</span>
                    <span className={styles.componentValue}>{data.components.o3.toFixed(2)} μg/m³</span>
                </div>
                <div className={styles.component}>
                    <span className={styles.componentName}>NO₂</span>
                    <span className={styles.componentValue}>{data.components.no2.toFixed(2)} μg/m³</span>
                </div>
                <div className={styles.component}>
                    <span className={styles.componentName}>CO</span>
                    <span className={styles.componentValue}>{data.components.co.toFixed(2)} μg/m³</span>
                </div>
                <div className={styles.component}>
                    <span className={styles.componentName}>SO₂</span>
                    <span className={styles.componentValue}>{data.components.so2.toFixed(2)} μg/m³</span>
                </div>
            </div>
        </div>
    );
};
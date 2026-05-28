import React, { useState } from 'react';
import { weatherApi } from '../../services/weatherApi';
import styles from './CitySearch.module.css';

interface CitySearchProps {
    onCitySelect: (city: string) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = async (value: string) => {
        setQuery(value);

        if (value.length >= 2) {
            try {
                const results = await weatherApi.searchCity(value);
                setSuggestions(results);
                setShowSuggestions(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (cityName: string) => {
        setQuery(cityName);
        setShowSuggestions(false);
        setSuggestions([]);
        onCitySelect(cityName);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Введите название города..."
                className={styles.input}
            />

            {showSuggestions && suggestions.length > 0 && (
                <div className={styles.suggestions}>
                    {suggestions.map((city, index) => (
                        <div
                            key={index}
                            className={styles.suggestion}
                            onClick={() => handleSelect(city.name)}
                        >
                            {city.name}, {city.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
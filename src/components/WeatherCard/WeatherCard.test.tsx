import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from './WeatherCard';

describe('WeatherCard', () => {
    const mockWeather = {
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

    it('shows city name', () => {
        render(<WeatherCard weather={mockWeather} />);
        expect(screen.getByText('Moscow')).toBeInTheDocument();
    });

    it('shows temperature', () => {
        render(<WeatherCard weather={mockWeather} />);
        // Ищем элемент содержащий текст "27"
        expect(screen.getByText(/27/)).toBeInTheDocument();
    });

    it('shows humidity', () => {
        render(<WeatherCard weather={mockWeather} />);
        // Ищем "80" вместо "80%" так как текст разбит
        expect(screen.getByText('80')).toBeInTheDocument();
    });

    it('shows wind speed', () => {
        render(<WeatherCard weather={mockWeather} />);
        // Ищем текст содержащий "5" 
        expect(screen.getByText(/\b5\b/)).toBeInTheDocument();
    });

    it('applies night class when isNight=true', () => {
        const { container } = render(<WeatherCard weather={mockWeather} isNight={true} />);
        // Проверяем что есть класс содержащий "night"
        expect(container.firstChild).toHaveClass(/.*night.*/);
    });
});
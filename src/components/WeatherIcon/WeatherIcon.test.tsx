import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherIcon } from './WeatherIcon';

describe('WeatherIcon', () => {
    it('отображает иконку ясной погоды (id: 800)', () => {
        render(<WeatherIcon iconId={ 800} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('☀️');
    });

    it('отображает иконку небольшой облачности (id: 801)', () => {
        render(<WeatherIcon iconId={ 801} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌤️');
    });

    it('отображает иконку облачности (id: 802)', () => {
        render(<WeatherIcon iconId={ 802} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('⛅');
    });

    it('отображает иконку пасмурно (id: 803)', () => {
        render(<WeatherIcon iconId={ 803} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('☁️');
    });

    it('отображает иконку пасмурно (id: 804)', () => {
        render(<WeatherIcon iconId={ 804} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('☁️');
    });

    it('отображает иконку дождя (id: 500)', () => {
        render(<WeatherIcon iconId={ 500} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌧️');
    });

    it('отображает иконку сильного дождя (id: 502)', () => {
        render(<WeatherIcon iconId={ 502} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌧️');
    });

    it('отображает иконку снега (id: 600)', () => {
        render(<WeatherIcon iconId={ 600} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌨️');
    });

    it('отображает иконку сильного снега (id: 602)', () => {
        render(<WeatherIcon iconId={ 602} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('❄️');
    });

    it('отображает иконку грозы (id: 200)', () => {
        render(<WeatherIcon iconId={ 200} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌩️');
    });

    it('отображает иконку сильной грозы (id: 212)', () => {
        render(<WeatherIcon iconId={ 212} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('⛈️');
    });

    it('отображает иконку мороси (id: 300)', () => {
        render(<WeatherIcon iconId={ 300} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌦️');
    });

    it('отображает иконку тумана (id: 701)', () => {
        render(<WeatherIcon iconId={ 701} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌫️');
    });

    it('добавляет className если передан', () => {
        const { container } = render(<WeatherIcon iconId={ 800} className = "test-class" />);
        expect(container.firstChild).toHaveClass('test-class');
    });

    it('имеет атрибут role="img"', () => {
        render(<WeatherIcon iconId={ 800} />);
        const icon = screen.getByRole('img');
        expect(icon).toBeInTheDocument();
    });

    it('отображает иконку по умолчанию для неизвестного id', () => {
        render(<WeatherIcon iconId={ 9999} />);
        const icon = screen.getByRole('img');
        expect(icon.textContent).toBe('🌡️');
    });
});
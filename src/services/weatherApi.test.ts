import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import axios from 'axios';
import {weatherApi} from './weatherApi';

const axiosGetMock = vi.fn();

vi.mock('axios', () => ({
    default: {
        get: (...args: any[]) => axiosGetMock(...args),
    },
}));

describe('weatherApi', () => {    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getCurrentWeather', () => {
        it('supposed to get current data by city', async () => {
            const mockData = {
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

            axiosGetMock.mockResolvedValueOnce({data: mockData});

            const result = await weatherApi.getCurrentWeather('Moscow');

            expect(axiosGetMock).toHaveBeenCalled();
            expect(result).toEqual(mockData);
            //expect(result.name).toBe('Moscow');
        });

        it('supposed to throw error with wrong request', async () => {
            axiosGetMock.mockRejectedValueOnce(new Error('Network Error'));

            await expect(weatherApi.getCurrentWeather('Moscow')).rejects.toThrow('Network Error');
        });
    });

    describe('getForecast', () => {
        it('suppsoed to get weather forecast', async () => {
            const mockData = {
                list: [
                    {
                        dt: Date.now() / 1000,
                        main: {
                            temp: 26,
                            feels_like: 25,
                            temp_min: 25,
                            temp_max: 27,
                            pressure: 756,
                            humidity: 78,
                        },
                        weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }],
                        wind: { speed: 3 },
                        dt_txt: '2024-01-01 12:00:00',
                    },
                ],
                city: {
                    name: 'Moscow',
                    country: 'RU',
                },
            };

            axiosGetMock.mockResolvedValueOnce({data: mockData});

            const result = await weatherApi.getForecast(55.75, 37.61);

            expect(axiosGetMock).toHaveBeenCalled();
            expect(result).toEqual(mockData);
            //expect(result.city.name).toBe('Moscow');
        });
    });

    describe('getAirPollution', () => {
        it('supposed to get air pollution data', async () => {
            const mockData = {
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

            axiosGetMock.mockResolvedValueOnce({data: mockData});

            const result = await weatherApi.getAirPollution(55.75, 37.61);

            expect(axiosGetMock).toHaveBeenCalled();
            expect(result).toEqual(mockData);
            //expect(result.list[0].main.aqi).toBe(2);
        });
    });   
    
    describe('searchCity', () => {
        it('supposed to serch city by name', async () => {
            const mockData = [
                {
                    name: 'Moscow',
                    lat: 55.75,
                    lon: 37.61,
                    country: 'RU',
                    state: 'Moscow',
                },
            ];

            axiosGetMock.mockResolvedValueOnce({data:  mockData});

            const result = await weatherApi.searchCity('Moscow');

            expect(axiosGetMock).toHaveBeenCalled();
            expect(result).toEqual(mockData);
            //expect(result[0].name).toBe('Moscow');
        });
    });
})

import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        return HttpResponse.json({
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
        });
    }),

    http.get('https://api.openweathermap.org/data/2.5/forecast', () => {
        return HttpResponse.json({
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
                dt_txt: new Date(Date.now() + i * 3600).toISOString(),
            })),
            city: {
                name: 'Moscow',
                country: 'RU',
            },
        });
    }),

    http.get('https://api.openweathermap.org/data/2.5/air_pollution', () => {
        return HttpResponse.json({
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
        });
    }),
];
# Лабораторная работа 7 ![CI Status](https://github.com/seyonaru/visual_programming/actions/workflows/ci.yml/badge.svg?branch=lab7) 

[![Возврат на master ветку](https://img.shields.io/badge/Возврат_на_master_ветку-Blue?style=for-the-badge)](https://github.com/seyonaru/visual_programming/tree/master)

*Выполнил студент группы ИП-412*

*Ларина Валентина*
## Задания 
- Написать компонент React *BookCard* с информацией о книге (обложка, название, авторы).
- Использовать формат BLOB для изображений.
- Реализовать приложение на React.
- Использовать API для получения всей необходимой информации. 

## Основные моменты выполнения лабораторной работы
- Правильно использовать асинхронные функции.
- Корректно обрабатывать получаемые запросы от сайтов.
- Правильно настроить CSS для отображения на странице приложения.

## Структура проекта в ветке
````
visual_programming/
├── .github/
│   └── workflows/        # GitHub Actions workflow для CI/CD: автоматический запуск тестов
├── node_modules/         # Зависимости проекта, установленные через npm (не комитятся в git)
├── public/               # Статические файлы, которые копируются в сборку без изменений
├── src/
│   ├── assets/           # Ассеты (изображения, иконки, шрифты)
│   │   ├── hero.png      # Изображение для hero-секции
│   │   ├── react.svg     # Логотип React
│   │   └── vite.svg      # Логотип Vite
│   ├── components/       # React компоненты
│   │   └── BookCard.tsx  # Компонент карточки книги
│   ├── App.css           # Стили для компонента App
│   ├── App.tsx           # Главный компонент приложения
│   ├── index.css         # Глобальные стили
│   └── main.tsx          # Точка входа в React приложение
├── .gitignore            # Список файлов и папок, которые git должен игнорировать
├── eslint.config.js      # Конфигурация линтера ESLint
├── index.html            # HTML шаблон приложения
├── package-lock.json     # Автоматически генерируемый файл с точными версиями всех зависимостей
├── package.json          # Конфигурация проекта: зависимости, скрипты (test, build), метаданные
├── README.md             # Документация проекта
├── tsconfig.app.json     # Конфигурация TypeScript для приложения
├── tsconfig.json         # Основная конфигурация TypeScript компилятора
├── tsconfig.node.json    # Конфигурация TypeScript для Node.js (vite config)
└── vite.config.ts        # Конфигурация сборщика Vite (плагины, алиасы, настройки сервера)
````


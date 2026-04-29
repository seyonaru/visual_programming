# Лабораторная работа 6 ![CI Status](https://github.com/seyonaru/visual_programming/actions/workflows/ci.yml/badge.svg?branch=lab6) 

[![Возврат на master ветку](https://img.shields.io/badge/Возврат_на_master_ветку-Blue?style=for-the-badge)](https://github.com/seyonaru/visual_programming/tree/master)

*Выполнил студент группы ИП-412*

*Ларина Валентина*
## Задания 
- написать утилитарные типы для чтения, для выбора по определенному типу, для генерирования обработчиков;
- написать тесты для этих типов при помощи *expectTypeOf*.

## Основные моменты выполнения лабораторной работы
- важно определить как передавать информацию для утилитарных типов;
- точно определить формат возвращаемых данных функцией *expectTypeOf*.

## Структура проекта в ветке
````
visual_programming/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions workflow для CI/CD: автоматический запуск тестов
├── dist/                       # Скомпилированные JavaScript файлы (результат работы TypeScript)
├── node_modules/               # Зависимости проекта, установленные через npm (не коммитятся в git)
├── src/
│   ├── main/
│   │   └── util_types.ts       # Определение всех утилитарных типов 
│   └── test/
│       └── util_types.test.ts  # Модульные тесты для утилитарных типов на Vitest
├── .gitignore                  # Список файлов и папок, которые git должен игнорировать (не отслеживать)
├── package-lock.json           # Автоматически генерируемый файл с точными версиями всех зависимостей
├── package.json                # Конфигурация проекта: зависимости, скрипты (test, build), метаданные
├── tsconfig.json               # Конфигурация TypeScript компилятора (target, module, strict mode)
└── vitest.config.ts            # Конфигурация тестового фреймворка Vitest (настройки запуска тестов)
````

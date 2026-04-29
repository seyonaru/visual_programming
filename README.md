# Лабораторная работа 5 ![CI Status](https://github.com/seyonaru/visual_programming/actions/workflows/ci.yml/badge.svg?branch=lab5) 

[![Возврат на master ветку](https://img.shields.io/badge/Возврат_на_master_ветку-Blue?style=for-the-badge)](https://github.com/seyonaru/visual_programming/tree/master)

*Выполнил студент группы ИП-412*

*Ларина Валентина*
## Задания 
- обновить типобезопасный конвейер преобразований над массивами объектов TypeScript на основе решения из лаборатоной 4
- описать порядок следования типов
- реализовать на основе предыдущего пункта новую функцию
- написать модульные тесты

## Основные моменты выполнения лабораторной работы
- для корректной организации порядка следования вызовов нужно создать точную проверку порядка т
- при передаче шагов в *query* должен проверяться порядок и выводиться ошибка, если он нарушен
- обязательно проверять иерархию всех скобок

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
│   │   ├── pipeline.ts         # Основная логика приложения: реализация where, sort, groupBy, having, query
│   │   ├── pipelineOp.ts       # Основная логика приложения: реализация where, sort, groupBy, having, query
│   │   └── types.ts            # Определения всех типов для конвейера преобразований
│   └── test/
│       ├── pipelineOp.test.ts  # Модульные тесты для конвейера на Vitest
│       └── pipeline.test.ts    # Модульные тесты для конвейера на Vitest
├── .gitignore                  # Список файлов и папок, которые git должен игнорировать (не отслеживать)
├── package-lock.json           # Автоматически генерируемый файл с точными версиями всех зависимостей
├── package.json                # Конфигурация проекта: зависимости, скрипты (test, build), метаданные
├── tsconfig.json               # Конфигурация TypeScript компилятора (target, module, strict mode)
└── vitest.config.ts            # Конфигурация тестового фреймворка Vitest (настройки запуска тестов)
````

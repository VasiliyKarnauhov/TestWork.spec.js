# UI-тесты для https://www.saucedemo.com

Автоматизация E2E тестов с использованием Playwright и паттерна Page Object.


## Требования

- Node.js версии 16+ (рекомендуется последняя LTS)
- npm или yarn


## Установка

1. Клонируйте репозиторий:
   ```bash
   git clone <URL-репозитория>
   cd <имя-папки-с-проектом>
   
Установите зависимости:
npm install

Структура проекта
tests/ — папка с тестами
tests/pages/ — Page Object классы (LoginPage, CheckoutPage и др.)

Запуск тестов
Запустить все тесты:
npx playwright test

Запустить конкретный файл с тестами:
npx playwright test tests/TestWork.spec.js

Запустить тесты с открытием браузера (для отладки):
npx playwright test --headed

Дополнительно
Таймауты и ожидания в тестах можно регулировать в файлах тестов по необходимости (например, page.waitForTimeout(...))

Используется Page Object подход для удобства поддержки и масштабирования тестов

Результаты
По умолчанию Playwright выводит подробный отчет в консоли

Для генерации HTML-отчёта используйте:
npx playwright show-report
# Vaulty — Инвентаризатор коллекций

**Vaulty** — это современное веб-приложение для коллекционеров, позволяющее структурировать свою игровую библиотеку. Также система агрегирует данные из RAWG API, предоставляя крупную сводку данных об играх.

## ✨ Основные возможности
* **Импорт из RAWG:** Быстрый поиск и добавление игр с актуальными метаданными.
* **Персонализация:** Загрузка кастомных обложек и скриншотов через S3 хранилище.
* **Кэширование:** Мгновенный доступ к данным благодаря Redis.
* **GraphQL API:** Гибкое взаимодействие фронтенда с бэкендом без лишних запросов.

## 🛠 Технологический стек
* **Frontend** TypeScript + [React](https://react.dev)
* **Backend:** TypeScript + [NestJS](https://nestjs.com/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
* **Caching:** [Redis](https://redis.io/)
* **API:** GraphQL (Code-first approach)
* **Infrastructure:** Docker, Nginx, S3 Storage

## 🚀 Быстрый запуск

### Предварительные требования
* Docker и Docker Compose
* API ключ от [RAWG](https://rawg.io/apidocs)

### Установка
1. Клонируйте репозиторий:
   ```bash
   git clone [https://github.com/imC1yde/vaulty-app.git](https://github.com/imC1yde/vaulty-app.git)
   ```

2. Установите переменные окружения:
    ```.env
   DATABASE_URL="postgresql://user:password@localhost:5432/vaulty"
   REDIS_URL="redis://localhost:6379"
   RAWG_API_KEY="ваш_ключ"
   ```
   
3. Запустите проект:
    ```bash
   docker-compose -f docker-compose.prod.yaml up -d --build
   ```
    или через утилиту make
    ```bash
   make docker:prod
   ```
   

# Booking API

Простое API для бронирования мест на мероприятиях.

## Описание

Сервис позволяет пользователям бронировать места на мероприятиях. Основная функциональность включает проверку доступности мест и предотвращение двойного бронирования.

## Технологии

- Node.js + Express
- PostgreSQL
- Docker + Docker Compose
- Swagger для документации
- Jest для тестирования

## Настройка окружения

Перед первым запуском создайте файл `.env` в корне проекта и скопируйте в него настройки из `.env.local`:

```bash
# Создаем .env файл
cp .env.local .env
```

Содержимое `.env` файла:
```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=booking_db
DB_USER=postgres
DB_PASSWORD=postgres

SERVER_PORT=3000

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

## Быстрый старт

1. Запустите приложение:
```bash
docker-compose up
```

2. Доступные endpoints:
- **API**: http://localhost:3000
- **Документация**: http://localhost:3000/api-docs
- **База данных**: http://localhost:8080 (pgAdmin)

## Использование базы данных

После запуска:
1. Откройте pgAdmin на http://localhost:8080
2. Подключитесь к серверу:
   - Host: `postgres`
   - Port: `5432`
   - Username: `postgres`
   - Password: `postgres`
3. Перейдите в Schemas → Tables
4. Для просмотра данных: ПКМ на таблицу → View/Edit Data → All Rows

**Важно**: При первом запуске в таблице `events` автоматически создаются тестовые мероприятия:
Используйте эти ID для тестирования бронирования.

## API Endpoints

### Бронирование места

**POST** `/api/bookings/reserve`

```json
{
  "event_id": 1,
  "user_id": "user123"
}
```

## Тестирование

- Тесты запускаются автоматически через GitHub Actions при создании PR
- Локальный запуск: `npm test`

## Структура базы данных

### Таблица `events`
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `total_seats` (INT)

### Таблица `bookings`
- `id` (SERIAL PRIMARY KEY)
- `event_id` (INT) - ссылка на events
- `user_id` (VARCHAR)
- `created_at` (TIMESTAMP)

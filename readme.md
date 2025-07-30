#  Task Management Web App

A scalable full-stack task management system featuring secure JWT-based authentication, real-time event streaming with Kafka, efficient caching using Redis, and a PostgreSQL database integrated via Prisma ORM. The frontend is built with a modern Vite and React stack for enhanced performance and user experience.

### Docker Setup

- Docker Desktop installed and running

### Start Services

```bash
docker compose up -d
```

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Demo

[![Task Management Demo](https://img.youtube.com/vi/dcC4qJIKlko/0.jpg)](https://www.youtube.com/watch?v=oM2eq2NN37s)

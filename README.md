# HustleHub - Job Marketplace

A full-stack job marketplace application built with React Native, Express.js, and PostgreSQL.

## Features

✅ **User Authentication** - Register and login with JWT tokens
✅ **Job Posting** - Create and manage job listings
✅ **Job Browsing** - View all available jobs with details
✅ **User Profiles** - View user ratings and job history
✅ **Secure API** - Protected routes with token-based auth

## Project Structure

```
hustlehub/
├── backend/          # Express.js server
├── mobile/           # React Native app
├── database/         # PostgreSQL schema
└── README.md
```

## Getting Started

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create the database and run migrations:
```bash
# Connect to PostgreSQL and run:
psql -U postgres -f ../database/schema.sql
```

4. Start the server:
```bash
npm run dev
```

### Mobile Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Update API URL in screens if needed (currently set to `http://localhost:5000/api`)

3. Start the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (requires auth)
- `PUT /api/jobs/:id` - Update job (requires auth)
- `DELETE /api/jobs/:id` - Delete job (requires auth)

## Tech Stack

- **Frontend**: React Native
- **Backend**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Joi

## Next Steps

- [ ] Add job application system
- [ ] Implement ratings and reviews
- [ ] Add messaging between users
- [ ] Payment integration
- [ ] Search and filtering
- [ ] Push notifications

## License

MIT

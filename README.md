# NestJS Booking Application

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A comprehensive room booking API built with NestJS, Prisma, and JWT authentication
</p>

## 📋 Description

This is a full-featured room booking application API built with NestJS framework. The application provides functionality for room management, user authentication, booking operations, and location management with role-based access control.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - User registration and login
  - Profile management with avatar upload

- **Room Management**
  - CRUD operations for rooms
  - Room search by location
  - Image upload for rooms
  - Pagination support

- **Booking System**
  - Room booking functionality
  - Booking management (CRUD)
  - User booking history
  - Booking status tracking

- **Location Management**
  - Position/Location CRUD operations
  - Room filtering by location

## 🏗️ Architecture

### Authentication Strategy
- **JWT Strategy**: Uses Passport JWT for token validation
- **Role Guard**: Implements role-based access control
- **Public Decorator**: Allows bypassing authentication for specific endpoints

### Database
- **Prisma ORM**: Type-safe database access
- **MySQL**: Primary database
- **Auto-generated Prisma Client**: Located in `generated/prisma`

## 🛠️ Technology Stack

- **Framework**: NestJS
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT + Passport
- **File Upload**: Multer + Cloudinary
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── common/
│   ├── decorators/           # Custom decorators (@Roles, @Public, @User)
│   ├── guard/
│   │   └── protect/         # Authentication guards and strategies
│   └── constant/            # Application constants
├── modules/
│   ├── dto/                 # Data Transfer Objects
│   ├── modules-api/         # API modules
│   │   ├── auth/           # Authentication module
│   │   ├── booking/        # Booking management
│   │   ├── room/           # Room management
│   │   └── position/       # Location management
│   └── modules-system/
│       └── prisma/         # Prisma service
└── main.ts                 # Application entry point
```

## 🔧 Installation

```bash
# Clone the repository
git clone <repository-url>
cd NestjsBookingApp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure your database URL and JWT secret in .env

# Generate Prisma client
npm run prisma

# Run database migrations (if needed)
npx prisma db push
```

## 🗃️ Environment Variables

```env
DATABASE_URL="mysql://username:password@localhost:3306/booking_db"
ACCESS_TOKEN_SECRET="your-jwt-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
```

## 🚀 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/auth/login` | User login | ❌ | - |
| POST | `/auth/register` | User registration | ❌ | - |
| GET | `/auth/get-info` | Get user profile | ✅ | User/Admin |
| GET | `/auth` | Get all users (paginated) | ✅ | Admin |
| PUT | `/auth` | Update user profile | ✅ | User/Admin |
| DELETE | `/auth/:id` | Delete user | ✅ | Admin |
| POST | `/auth/upload-avatar` | Upload user avatar | ✅ | User/Admin |

### Room Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/room` | Get rooms (paginated) | ❌ | - |
| POST | `/room` | Create new room | ✅ | Admin |
| GET | `/room/:id` | Get room by ID | ❌ | - |
| PUT | `/room/:id` | Update room | ✅ | Admin |
| DELETE | `/room/:id` | Delete room | ✅ | Admin |
| GET | `/room/position/:position` | Get rooms by location | ❌ | - |
| POST | `/room/upload-image/:id` | Upload room image | ✅ | Admin |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/booking` | Get bookings (paginated) | ✅ | User/Admin |
| POST | `/booking` | Create booking | ✅ | User/Admin |
| GET | `/booking/:id` | Get booking by ID | ✅ | User/Admin |
| PUT | `/booking/:id` | Update booking | ✅ | User/Admin |
| DELETE | `/booking/:id` | Delete booking | ✅ | User/Admin |
| GET | `/booking/rooms-by-user/:id` | Get user's bookings | ✅ | User/Admin |

### Position/Location Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/position` | Get positions (paginated) | ❌ | - |
| POST | `/position` | Create position | ✅ | Admin |
| GET | `/position/:id` | Get position by ID | ✅ | Admin |
| PUT | `/position/:id` | Update position | ✅ | Admin |
| DELETE | `/position/:id` | Delete position | ✅ | Admin |

## 🔐 Authentication & Authorization

### JWT Authentication
The application uses JWT tokens for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control
- **Public Routes**: No authentication required (login, register, view rooms)
- **User Routes**: Requires valid JWT token (booking operations, profile management)
- **Admin Routes**: Requires admin role (room management, user management, position management)

### Using Decorators

```typescript
// Public route (no auth required)
@Public()
@Post('login')
login() { ... }

// Admin only route
@Roles('admin')
@Post('room')
createRoom() { ... }

// Get current user
getProfile(@User() user: users) { ... }
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📊 Database Schema

The application uses the following main entities:
- **users**: User accounts with roles
- **rooms**: Room information and amenities
- **positions**: Location/Position data
- **bookings**: Booking records
- **reviews**: Booking reviews

## 🔄 Development Workflow

1. **Database Changes**: Update `prisma/schema.prisma`
2. **Generate Client**: Run `npm run prisma`
3. **Update Services**: Modify business logic in service files
4. **Update Controllers**: Add/modify API endpoints
5. **Testing**: Run tests to ensure functionality

## 📝 API Response Format

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is [MIT licensed](LICENSE).

## 👥 Support

For questions and support:
- Create an issue on GitHub
- Contact the development team

---

**Built with ❤️ using NestJS and TypeScript**

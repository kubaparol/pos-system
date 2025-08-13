<div align="center">
<img src="../frontend/public/logo.svg" alt="POS System" width="64" height="64"/>

# POS System

</div>

A robust RESTful API backend for the POS System, providing comprehensive endpoints for product management, order processing, customer handling and authentication. Built with Express.js and TypeScript for small retail businesses seeking centralized sales management.

## 📋 Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Project Scope](#project-scope)
- [Project Status](#project-status)

## 🎯 Project Description

The POS System API serves as the backbone for point-of-sale operations, designed to solve critical data synchronization problems between online and offline sales channels. This backend provides:

- **Secure Authentication** with JWT-based session management
- **Product Management** with inventory tracking and CRUD operations
- **Order Processing** with atomic transactions and stock validation
- **Customer Management** with phone-based lookup and automatic record creation
- **Dashboard Analytics** with sales statistics

The API follows RESTful principles and includes comprehensive input validation, error handling and security measures suitable for production environments.

## 🛠️ Tech Stack

### Core Technologies

- **Express.js 4** - Fast, unopinionated web framework
- **TypeScript 5** - Static type checking for enhanced reliability
- **Node.js 22.18.0** - JavaScript runtime environment

### Database & ORM

- **PostgreSQL** - Robust relational database
- **Prisma 6** - Next-generation ORM with type safety
- **@prisma/client** - Auto-generated database client

### Authentication & Security

- **jsonwebtoken** - JWT token implementation
- **bcryptjs** - Password hashing and verification
- **helmet** - Security middleware collection
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting middleware

### Validation & Documentation

- **express-validator** - Server-side input validation
- **zod** - Schema validation library
- **swagger-jsdoc** - API documentation generation
- **swagger-ui-express** - Interactive API documentation

### Development Tools

- **tsx** - TypeScript execution for development
- **jest** - JavaScript testing framework
- **supertest** - HTTP assertion library
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js 22.18.0** (specified in `.nvmrc`)
- **PostgreSQL 14+** database
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository and navigate to backend**

   ```bash
   git clone <repository-url>
   cd pos-system/backend
   ```

2. **Use the correct Node.js version**

   ```bash
   nvm install/use v22.18.0
   # or manually install Node.js 22.18.0
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up the database with Docker**

   ```bash
   # Start Docker Desktop and run PostgreSQL
   docker compose up -d

   # Verify the database container is running
   docker ps

   # Run Prisma migrations
   npx prisma migrate dev

   # Seed the database with initial data
   npm run db:seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Access the API**

   ```bash
   # Application runs on:
   http://localhost:5500

   # API Documentation:
   http://localhost:5500/api-docs

   # Database Studio (run `npm run db:studio`):
   http://localhost:5555
   ```

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run build` - Compile TypeScript to JavaScript

### Database Management

- `npm run db:studio` - Open Prisma Studio for database management
- `npm run db:seed` - Seed database with initial data
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client

### Testing & Quality

- `npm test` - Run test suite
- `npm run type-check` - Check TypeScript types without compilation
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix automatically fixable linting errors
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check if code is properly formatted

## 📚 API Documentation

### Interactive Documentation

- **Swagger UI**: `https://pos-system-mkt5.onrender.com/api-docs`

### Main API Endpoints

#### Authentication

- `POST /api/auth/sign-in` - User authentication

#### Products

- `GET /api/products` - List products with filtering and pagination
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product details
- `PATCH /api/products/:id` - Update product
- `POST /api/products/:id/archive` - Archive product
- `POST /api/products/:id/restore` - Restore archived product

#### Orders

- `GET /api/orders` - List orders with search and filtering
- `POST /api/orders/finalize` - Finalize order with inventory updates

#### Customers

- `GET /api/customers/search/:phone` - Find customer by phone

#### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

## 🎯 Project Scope

### Current MVP Features

#### Core Backend Services

- RESTful API with comprehensive error handling
- JWT-based authentication system
- Request validation and sanitization
- Rate limiting and security middleware

#### Data Management

- **Products**: CRUD operations with inventory tracking
- **Orders**: Complete order lifecycle management
- **Customers**: Phone-based customer identification
- **Users**: Single-user authentication system

#### Business Logic

- Atomic inventory updates during order processing
- Server-side stock validation
- Automatic customer creation during checkout
- Product archiving with data integrity preservation

#### External Integrations

- One-time data import from FakeStore API
- Database seeding for development and testing

### API Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection
- Rate limiting
- Input validation and sanitization
- Helmet security headers

### Planned Enhancements (Out of MVP Scope)

- Multi-tenant architecture
- Advanced analytics and reporting
- Real-time notifications
- Webhook integrations
- Advanced inventory management
- Multi-currency support

## 📊 Project Status

**Current Phase**: MVP Development ✅  
**Version**: 1.0.0  
**Development Status**: Active

### Architecture Highlights

- **Database Schema**: Optimized relational design with Prisma
- **API Design**: RESTful principles with comprehensive validation
- **Error Handling**: Centralized error management with detailed logging
- **Testing**: Unit and integration tests with Jest and Supertest

### Performance Considerations

- Database indexing for optimized queries
- Efficient joins and relationships
- Connection pooling with Prisma

---

## 🔗 Related Documentation

- [Frontend App Documentation](../frontend/README.md)
- [Project Requirements (PRD)](../docs/prd.md)
- [Tech Stack](../docs/tech-stack.md)
- [Functional Specifications](../docs//functional-specification.md)
- [Technical Specifications](../docs/technical-specification.md)
- [Database Schema](./prisma/schema.prisma)

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**

```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql
```

**Migration Errors**

```bash
# Reset database (development only)
npx prisma migrate reset

# Generate fresh client
npx prisma generate
```

**Port Already in Use**

```bash
# Find process using port 5500
lsof -ti:5500

# Kill process
kill -9 <PID>
```

---

**Built with 🔧 for reliable retail operations**

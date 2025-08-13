<div align="center">
<img src="../frontend/public/logo.svg" alt="POS System" width="64" height="64"/>

# POS System

</div>

# 🔧 Technical Specification

## Document Information

- **Project**: POS System
- **Version**: 1.0.0
- **Last Updated**: January 2025
- **Status**: MVP Development Phase

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Specification](#api-specification)
6. [Security Implementation](#security-implementation)
7. [Performance Requirements](#performance-requirements)
8. [Development Standards](#development-standards)
9. [Deployment Architecture](#deployment-architecture)
10. [Testing Strategy](#testing-strategy)

## 🎯 System Overview

### Purpose

The POS System is a web-based point-of-sale application designed to centralize sales management for small retail businesses operating both online and offline channels. The system serves as the single source of truth for in-store operations.

### System Boundaries

- **In Scope**: Product management, order processing, customer management, inventory tracking, authentication
- **Out of Scope**: Payment processing, accounting integration, multi-user roles, returns management

### Target Environment

- **Deployment**: Web-based application
- **Users**: Single store owner/operator
- **Devices**: Desktop, tablet, mobile browsers
- **Network**: Internet-connected retail environment

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────┐    HTTP/HTTPS   ┌─────────────────┐
│                 │ ◄─────────────► │                 │
│   Frontend      │                 │   Backend API   │
│   (React SPA)   │                 │   (Express.js)  │
│                 │                 │                 │
└─────────────────┘                 └─────────────────┘
                                             │
                                             │ Prisma ORM
                                             ▼
                                    ┌─────────────────┐
                                    │                 │
                                    │   PostgreSQL    │
                                    │   Database      │
                                    │                 │
                                    └─────────────────┘
```

### Component Architecture

#### Frontend Architecture (React)

```
src/
├── api/                     # API client configuration
├── components/              # Reusable UI components
│   ├── base/               # Core application components
│   ├── layouts/            # Layout components
│   ├── providers/          # Context providers
│   └── ui/                 # shadcn/ui components
├── modules/                # Feature-based modules
│   ├── auth/               # Authentication
│   ├── products/           # Product management
│   ├── orders/             # Order processing
│   ├── customers/          # Customer management
│   └── dashboard/          # Analytics dashboard
├── hooks/                  # Custom React hooks
├── router/                 # Route configuration
└── utils/                  # Utility functions
```

#### Backend Architecture (Express.js)

```
src/
├── auth/                   # Authentication logic
├── products/               # Product management
├── orders/                 # Order processing
├── customers/              # Customer management
├── dashboard/              # Analytics endpoints
├── users/                  # User management
└── shared/
    ├── config/            # Configuration files
    ├── middlewares/       # Express middlewares
    └── utils/             # Utility functions
```

### Data Flow

1. **User Interaction**: User interacts with React frontend
2. **State Management**: TanStack Query manages server state, Zustand handles client state
3. **API Communication**: Axios client sends HTTP requests to Express backend
4. **Authentication**: JWT tokens validate requests
5. **Data Processing**: Express controllers process business logic
6. **Database Operations**: Prisma ORM executes database queries
7. **Response**: Data flows back through the same chain

## 🛠️ Technology Stack

### Frontend Stack

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| React           | 19.1.1  | UI library              |
| TypeScript      | 5.8.3   | Type safety             |
| Vite            | 7.1.0   | Build tool              |
| TailwindCSS     | 4.1.11  | Styling                 |
| shadcn/ui       | Latest  | Component library       |
| TanStack Query  | 5.84.2  | Server state management |
| Zustand         | 5.0.7   | Client state management |
| React Router    | 7.8.0   | Routing                 |
| React Hook Form | 7.62.0  | Form management         |
| Zod             | 4.0.17  | Schema validation       |

### Backend Stack

| Technology        | Version | Purpose             |
| ----------------- | ------- | ------------------- |
| Express.js        | 4.16.1  | Web framework       |
| TypeScript        | 5.9.2   | Type safety         |
| Node.js           | 22.18.0 | Runtime environment |
| Prisma            | 6.13.0  | ORM                 |
| PostgreSQL        | 14+     | Database            |
| JWT               | 9.0.2   | Authentication      |
| bcrypt            | 3.0.2   | Password hashing    |
| express-validator | 7.2.1   | Input validation    |
| Swagger           | Latest  | API documentation   |

### Development Tools

| Tool        | Purpose          |
| ----------- | ---------------- |
| ESLint      | Code linting     |
| Prettier    | Code formatting  |
| Jest/Vitest | Testing          |
| Docker      | Containerization |

## 🗄️ Database Design

### Schema Overview

```sql
-- Core entities and relationships
User (1) ──── (∞) Order
Customer (1) ──── (∞) Order
Product (1) ──── (∞) OrderItem
Order (1) ──── (∞) OrderItem
```

### Entity Definitions

#### User Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### Product Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(500),
  price DECIMAL NOT NULL,
  stockQuantity INTEGER DEFAULT 0,
  isArchived BOOLEAN DEFAULT FALSE,
  reviewRating DECIMAL DEFAULT 0,
  reviewCount INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### Customer Table

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### Order Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orderNumber BIGINT UNIQUE DEFAULT autoincrement(),
  customerId UUID REFERENCES customers(id),
  totalAmount DECIMAL NOT NULL,
  note TEXT,
  createdAt TIMESTAMPTZ(6) DEFAULT NOW(),
  updatedAt TIMESTAMPTZ(6) DEFAULT NOW()
);
```

#### OrderItem Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orderId UUID REFERENCES orders(id) ON DELETE CASCADE,
  productId UUID REFERENCES products(id) ON DELETE NoAction,
  quantity INTEGER NOT NULL,
  unitPrice DECIMAL NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Indexing Strategy

```sql
-- Performance indexes (defined in Prisma schema)
@@index([isArchived]) -- on products
@@index([category]) -- on products
@@index([title]) -- on products
@@index([phone]) -- on customers
@@index([createdAt(sort: Desc)]) -- on orders
@@index([customerId, createdAt(sort: Desc)]) -- on orders
@@index([orderId]) -- on order_items
@@index([productId]) -- on order_items
```

## 🔌 API Specification

### Authentication Endpoints

```typescript
// POST /api/auth/sign-in
interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    userId: string;
  };
}
```

### Product Endpoints

```typescript
// GET /api/products
interface ProductsQuery {
  search?: string;
  category?: string;
  archived?: boolean;
  page?: number;
  limit?: number;
}

interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  stockQuantity: number;
  isArchived: boolean;
  reviewRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// POST /api/products
// PATCH /api/products/:id
// GET /api/products/:id
// POST /api/products/:id/archive
// POST /api/products/:id/restore
```

### Order Endpoints

```typescript
// GET /api/orders
interface OrdersQuery {
  search?: string;
  page?: number;
  limit?: number;
}

// POST /api/orders/finalize
interface FinalizeOrderRequest {
  customer: {
    phone: string;
    firstName: string;
    lastName: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  note?: string;
}

interface Order {
  id: string;
  orderNumber: number;
  customerId: string;
  totalAmount: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  items: OrderItem[];
}
```

### Error Handling

````typescript
interface APIError {
  error: string;
  message: string;
  details?: any;
  timestamp: string;
}

### Customer Endpoints

```typescript
// GET /api/customers/search?phone=123456789
interface CustomerSearchQuery {
  phone: string;
}

interface Customer {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
````

### Dashboard Endpoints

```typescript
// GET /api/dashboard/stats
interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  topProducts: ProductWithStats[];
  topCustomers: CustomerWithStats[];
}
```

### User Endpoints

```typescript
// GET /api/users/me
interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
```

### HTTP Status Codes

```
200: Success
201: Created
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
422: Validation Error
500: Internal Server Error
```

## 🔒 Security Implementation

### Authentication & Authorization

#### JWT Token Strategy

```typescript
interface JWTPayload {
  userId: number;
  iat: number;
  exp: number;
}

// Token Configuration
const JWT_CONFIG = {
  expiresIn: "7d",
  issuer: "pos-system",
};
```

#### Password Security

```typescript
// bcrypt configuration
const BCRYPT_ROUNDS = 10;

// Password requirements
const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};
```

### Input Validation

```typescript
// Zod schemas for validation
const ProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stockQuantity: z.number().min(0),
  category: z.string().optional(),
});

const OrderItemSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().positive(),
});
```

### Security Middleware Stack

```typescript
// Express security middleware
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS configuration
app.use(rateLimit(rateLimitOptions)); // Rate limiting
app.use(express.json({ limit: "10mb" })); // Body parsing limits
```

### Rate Limiting

```typescript
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP",
  standardHeaders: true,
  legacyHeaders: false,
};
```

## ⚡ Performance Requirements

### Response Time Targets

| Operation       | Target Response Time |
| --------------- | -------------------- |
| Product listing | < 200ms              |
| Product search  | < 300ms              |
| Order creation  | < 500ms              |
| Customer lookup | < 100ms              |
| Dashboard load  | < 1s                 |

### Scalability Targets

| Metric               | Target  |
| -------------------- | ------- |
| Concurrent users     | 10-50   |
| Products in catalog  | 10,000+ |
| Orders per day       | 1,000+  |
| Database connections | 20 max  |

### Optimization Strategies

#### Frontend Optimization

- **Code Splitting**: Route-based code splitting with React.lazy
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Browser caching for static assets

#### Backend Optimization

- **Database Indexing**: Strategic indexes on frequently queried fields
- **Connection Pooling**: Prisma connection pooling
- **Query Optimization**: Efficient joins and pagination
- **Response Compression**: gzip compression for API responses

#### Database Optimization

```sql
-- Query optimization examples
EXPLAIN ANALYZE SELECT * FROM products
WHERE category = 'electronics'
AND stock_quantity > 0
ORDER BY created_at DESC
LIMIT 20;

-- Pagination optimization
SELECT * FROM orders
WHERE created_at < $1
ORDER BY created_at DESC
LIMIT 20;
```

## 💻 Development Standards

### Code Quality Standards

#### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### ESLint Rules

```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Git Workflow

#### Branch Strategy

```
main (production)
├── develop (integration)
├── feature/product-management
├── feature/order-processing
└── hotfix/critical-bug
```

#### Commit Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scopes: frontend, backend, database, docs

Examples:
feat(frontend): add product search functionality
fix(backend): resolve inventory validation bug
docs(api): update swagger documentation
```

### Testing Standards

#### Test Coverage Requirements

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: Core user journeys

#### Test Naming Convention

```typescript
describe("ProductService", () => {
  describe("createProduct", () => {
    it("should create product with valid data", () => {
      // Test implementation
    });

    it("should throw error when name is empty", () => {
      // Test implementation
    });
  });
});
```

## 🚀 Deployment Architecture

### Environment Configuration

#### Development Environment

```
Frontend: http://localhost:3000
Backend: http://localhost:5500
Database: localhost:5432
```

#### Production Environment

```
Frontend: CDN-hosted static files
Backend: Load-balanced API servers
Database: Managed PostgreSQL cluster
```

### Database Migration Strategy

```bash
# Development
npx prisma migrate dev --name feature_name

# Production
npx prisma migrate deploy
```

### Monitoring & Logging

#### Application Monitoring

- **Uptime**: Health check endpoints
- **Performance**: Response time tracking
- **Errors**: Centralized error logging
- **Usage**: API endpoint analytics

### Frontend Testing

#### Unit Tests

```typescript
// Component testing with React Testing Library
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

test("displays product information correctly", () => {
  const product = {
    id: "uuid-123",
    title: "Test Product",
    price: 29.99,
    stockQuantity: 5,
    category: "electronics",
    description: "Test description",
    isArchived: false,
    reviewRating: 4.5,
    reviewCount: 10,
  };

  render(<ProductCard product={product} />);

  expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("$29.99")).toBeInTheDocument();
});
```

#### Integration Tests

```typescript
// API integration testing
import { renderHook } from "@testing-library/react";
import { useProducts } from "./useProducts";

test("fetches products successfully", async () => {
  const { result, waitFor } = renderHook(() => useProducts());

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toHaveLength(10);
  });
});
```

### Backend Testing

#### Unit Tests

```typescript
// Controller testing
import request from "supertest";
import app from "../app";

describe("POST /api/products", () => {
  it("creates product with valid data", async () => {
    const productData = {
      title: "Test Product",
      category: "electronics",
      description: "Test description",
      price: 29.99,
      stockQuantity: 10,
      isArchived: false,
    };

    const response = await request(app)
      .post("/api/products")
      .set("Cookie", validAuthCookie)
      .send(productData)
      .expect(201);

    expect(response.body.title).toBe("Test Product");
  });
});
```

#### Database Testing

```typescript
// Database integration testing
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.order.deleteMany();
});
```

---

## 📚 Additional Resources

- [Project Requirements Document](./prd.md)
- [Functional Specification](./functional-specification.md)
- [Database Schema](../backend/prisma/schema.prisma)

---

**Document Version**: 1.0.0  
**Last Review**: January 2025  
**Next Review**: February 2025

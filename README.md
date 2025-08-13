<div align="center">
<img src="./frontend/public/logo.svg" alt="POS System" width="64" height="64"/>

# POS System

</div>

A modern, comprehensive point-of-sale web application designed for small retail businesses. This system provides centralized sales management, real-time inventory tracking, and streamlined customer service operations.

## 🌐 Live Demo

- **🖥️ Frontend Application**: [https://pos-system-ochre.vercel.app](https://pos-system-ochre.vercel.app)
- **📡 API Documentation**: [https://pos-system-mkt5.onrender.com/api-docs](https://pos-system-mkt5.onrender.com/api-docs)

### 🔑 Demo Login Credentials

```
Email: anna@posdemo.pl
Password: test1234
```

> 💡 Use these credentials to explore the full functionality of the POS system

## 🎯 Project Overview

The POS System addresses the critical challenge of data synchronization between online and offline sales channels for small retail stores. By providing a unified platform for in-store operations, it eliminates inventory uncertainty and serves as the definitive source of truth for retail management.

### Key Features

- 🛍️ **Real-time Inventory Management** - Track stock levels with automatic updates
- 👥 **Customer Management** - Phone-based customer lookup and automatic profile creation
- 📦 **Order Processing** - Streamlined checkout with cart validation and atomic transactions
- 📊 **Sales Analytics** - Dashboard with key performance indicators and sales insights
- 🔐 **Secure Access** - JWT-based authentication with session management

## 🏗️ Architecture

This project follows a modern full-stack architecture:

```
┌─────────────────┐    HTTPS/REST API    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │
│   Frontend      │                     │   Backend API   │
│   (React SPA)   │                     │   (Express.js)  │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
                                                  │
                                                  │ Prisma ORM
                                                  ▼
                                         ┌─────────────────┐
                                         │   PostgreSQL    │
                                         │   Database      │
                                         └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript for type-safe UI development
- **TailwindCSS 4** for modern, utility-first styling
- **shadcn/ui** for accessible, customizable components
- **TanStack Query** for efficient server state management
- **React Router** for client-side routing

### Backend

- **Express.js** with TypeScript for robust API development
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** for reliable data persistence
- **JWT** for secure authentication
- **Swagger** for comprehensive API documentation

## 🚀 Quick Start

### Prerequisites

- Node.js 22.18.0 (see `.nvmrc`)
- Docker Desktop
- npm or yarn

### Local Development Setup

For detailed setup instructions, follow the README files for each environment:

#### 🔧 **Backend Setup**

👉 **[Complete Backend Setup Guide](./backend/README.md)**

```bash
# Quick overview:
cd backend

npm install

cp .env.example .env

docker compose up -d

npx prisma migrate dev

npm run db:seed

npm run dev
```

#### 🎨 **Frontend Setup**

👉 **[Complete Frontend Setup Guide](./frontend/README.md)**

```bash
# Quick overview:
cd frontend

nvm install/use v22.18.0

npm install

cp .env.example .env.local

npm run dev
```

### 🌐 **Access Local Applications**

| Environment            | URL                            | Description                         |
| ---------------------- | ------------------------------ | ----------------------------------- |
| 🖥️ **Frontend**        | http://localhost:3000          | Development React app               |
| 🔌 **API**             | http://localhost:5500          | Development Express server          |
| 📖 **API Docs**        | http://localhost:5500/api-docs | Interactive documentation           |
| 🗄️ **Database Studio** | http://localhost:5555          | Prisma Studio (`npm run db:studio`) |

## 📚 Documentation

### Application Documentation

- 🖥️ [Frontend README](./frontend/README.md) - React application setup and features
- ⚙️ [Backend README](./backend/README.md) - API documentation and deployment guide

### Project Documentation

- 📋 [Functional Specification](./docs/functional-specification.md) - Complete feature requirements and user stories
- 🔧 [Technical Specification](./docs/technical-specification.md) - Architecture, database design, and implementation details
- 📄 [Product Requirements Document](./docs/prd.md) - Business requirements and project scope (Polish)

### API Reference

- 🔗 **Interactive Documentation**: [https://pos-system-mkt5.onrender.com/api-docs](https://pos-system-mkt5.onrender.com/api-docs)

## 🌟 Key Capabilities

### For Store Operations

- **Product Catalog Management**: Full CRUD operations with search and filtering
- **Real-time Stock Tracking**: Automatic inventory updates with visual indicators
- **Customer Database**: Phone-based lookup with automatic profile management
- **Order Processing**: Cart management with validation and secure checkout

### For Business Intelligence

- **Sales Dashboard**: Key metrics and performance indicators
- **Order History**: Complete transaction records with search capabilities
- **Inventory Insights**: Stock level monitoring and alerts
- **Customer Analytics**: Purchase history and customer insights

## 📊 Project Status

**Current Phase**: MVP Development ✅  
**Version**: 1.0.0  
**Development Status**: Active

### Recent Milestones

- ✅ Core product management functionality
- ✅ Shopping cart and order processing
- ✅ Customer management system
- ✅ Responsive design implementation
- ✅ API documentation and testing

### Upcoming Goals

- 🔄 Performance optimization
- 🧪 User acceptance testing
- 🚀 Production deployment
- 📈 Analytics enhancement

---

**Built with ❤️ for small retail businesses seeking operational excellence**

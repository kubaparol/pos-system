<div align="center">
<img src="./public/logo.svg" alt="POS System" width="64" height="64"/>

# POS System

</div>

A modern, responsive web interface for point-of-sale operations designed for small retail stores. This React-based application provides an intuitive interface for managing products, processing orders and tracking customer data in real-time.

## 🌐 Live Demo

- **🖥️ Frontend Application**: [https://pos-demo.vercel.app](https://pos-demo.vercel.app)

### 🔑 Demo Login Credentials

```
Email: anna@posdemo.pl
Password: test1234
```

> 💡 Use these credentials to explore the full functionality of the POS system

## 📋 Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)

## 🎯 Project Description

The POS System Frontend is a comprehensive web application built to solve the critical problem of data synchronization between online and offline sales channels for small retail businesses. It serves as the primary interface for in-store operations, providing:

- **Real-time inventory management** with instant stock level updates
- **Streamlined order processing** with dynamic shopping cart functionality
- **Customer management** with phone-based lookup and automatic data population
- **Product catalog management** with search, filtering and categorization
- **Order history tracking** with comprehensive search capabilities

The application is designed with a mobile-first approach, ensuring optimal performance across desktop, tablet and mobile devices.

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Modern UI library with latest features
- **TypeScript 5** - Static type checking for enhanced code quality
- **Vite 7** - Fast build tool and development server

### Styling & UI

- **TailwindCSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Type-safe variant management

### State Management & Data Fetching

- **TanStack Query** - Powerful server state management
- **Zustand** - Lightweight client state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Routing & Navigation

- **React Router DOM** - Declarative routing for React

### Development Tools

- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting

## 🚀 Getting Started Locally

### Prerequisites

- **Node.js 22.18.0** (specified in `.nvmrc`)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository and navigate to frontend**

   ```bash
   git clone <repository-url>
   cd pos-system/frontend
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
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally

### Testing

- `npm run test` - Run unit tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage reports

### Code Quality

- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Fix automatically fixable linting errors
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check if code is properly formatted

## 🎯 Project Scope

### Current MVP Features

#### Authentication & Security

- Secure login system with JWT token management
- Single-user application (store owner focused)

#### Product Management

- Complete CRUD operations for products
- Real-time inventory tracking with stock quantity management
- Product categorization and filtering
- Advanced search functionality (partial name matching)
- Product archiving (soft delete) to maintain data integrity

#### Sales Operations

- Dynamic shopping cart with real-time validation
- Customer lookup by phone number with auto-population
- Automatic new customer creation during checkout
- Order finalization with atomic inventory updates
- Server-side validation for stock availability

#### Customer Management

- Phone-based customer identification system
- Automatic customer data updates
- Customer history tracking

#### Order History

- Chronological order listing
- Comprehensive search by customer data
- Complete order details including archived products

### Planned Enhancements (Out of MVP Scope)

- Multi-user support with role-based permissions
- Returns and refunds management
- Loyalty programs and discount codes
- Payment terminal integration
- Accounting system integration
- Continuous online/offline synchronization

## 📊 Project Status

**Current Phase**: MVP Development ✅  
**Version**: 1.0.0  
**Development Status**: Active

### Recent Updates

- Core product management functionality completed
- Shopping cart and order processing implemented
- Customer management system established
- Responsive design optimized for all devices

### Upcoming Milestones

- Performance optimization and testing
- User acceptance testing with target users
- Production deployment preparation

---

## 🔗 Related Documentation

- [Backend API Documentation](../backend/README.md)
- [Project Requirements (PRD)](../docs/prd.md)
- [Tech Stack](../docs/tech-stack.md)
- [Functional Specifications](../docs//functional-specification.md)
- [Technical Specifications](../docs/technical-specification.md)

---

**Built with ❤️ for small retail businesses**

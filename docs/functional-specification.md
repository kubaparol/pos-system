<div align="center">
<img src="../frontend/public/logo.svg" alt="POS System" width="64" height="64"/>

# POS System

</div>

# 📋 Functional Specification

## Document Information

- **Project**: POS System
- **Version**: 1.0.0
- **Last Updated**: January 2025
- **Status**: MVP Development Phase

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [User Stories & Requirements](#user-stories--requirements)
4. [Feature Specifications](#feature-specifications)
5. [User Interface Design](#user-interface-design)
6. [Business Logic](#business-logic)
7. [Data Management](#data-management)
8. [Integration Requirements](#integration-requirements)
9. [Non-Functional Requirements](#non-functional-requirements)
10. [Acceptance Criteria](#acceptance-criteria)

## 🎯 Executive Summary

The POS System is a comprehensive web application designed to address the critical challenge of data synchronization between online and offline sales channels for small retail businesses. This MVP solution provides a centralized platform for in-store operations, ensuring real-time inventory management and streamlined customer service.

### Key Business Objectives

- **Eliminate inventory uncertainty** during customer interactions
- **Provide single source of truth** for product pricing and availability
- **Streamline order processing** for in-store sales
- **Maintain data integrity** across all sales channels

### Target User Profile

- **Primary User**: Small retail store owner (Anna)
- **Business Type**: Physical store with online presence
- **Technical Proficiency**: Basic to intermediate computer skills
- **Usage Pattern**: Daily in-store operations during business hours

## 🏪 System Overview

### Core Problem Statement

Small retail businesses struggle with data synchronization between online and offline sales channels, leading to:

- Uncertain product availability during customer service
- Inconsistent pricing information
- Manual order recording prone to errors
- Fragmented product data management

### Solution Approach

A unified web-based POS system that serves as the definitive source for in-store operations, featuring:

- Real-time inventory tracking
- Integrated customer management
- Streamlined order processing
- Comprehensive product catalog management

## 👥 User Stories & Requirements

### Epic 1: Authentication & Access Control

#### US-001: Secure System Access

**As** Anna (store owner),  
**I want** to securely log into the POS system using my credentials,  
**So that** I can access my store's sales management tools.

**Acceptance Criteria:**

- ✅ Login form with email and password fields
- ✅ Successful authentication redirects to main dashboard
- ✅ Invalid credentials display clear error message
- ✅ Session management with automatic logout after inactivity
- ✅ Password protection with minimum security requirements

---

### Epic 2: Product Catalog Management

#### US-002: Browse Product Catalog

**As** Anna,  
**I want** to view all available products in my store,  
**So that** I can quickly locate items for customer purchases.

**Acceptance Criteria:**

- ✅ Display product grid with name, price, image, and stock quantity
- ✅ Visual indication for out-of-stock items (grayed out)
- ✅ "Add to Cart" button only visible for in-stock items
- ✅ Hide archived products from main catalog view
- ✅ Responsive design for desktop, tablet, and mobile

#### US-003: Search Products by Name

**As** Anna,  
**I want** to search for products by typing part of their name,  
**So that** I can quickly find specific items without scrolling.

**Acceptance Criteria:**

- ✅ Search input field with real-time filtering
- ✅ Case-insensitive partial matching
- ✅ Search results update as user types
- ✅ Clear search button to reset filters
- ✅ No results message when no matches found

#### US-004: Filter Products by Category

**As** Anna,  
**I want** to filter products by category,  
**So that** I can browse specific product types efficiently.

**Acceptance Criteria:**

- ✅ Category dropdown/filter controls
- ✅ Combine category filtering with text search
- ✅ Category list populated from available product categories
- ✅ "All Categories" option to clear filter
- ✅ Filter state persistence during session

#### US-005: Add New Products

**As** Anna,  
**I want** to add new products to my catalog,  
**So that** I can expand my inventory as needed.

**Acceptance Criteria:**

- ✅ "Add Product" button in management interface
- ✅ Form fields: name, description, price, category, stock quantity
- ✅ Optional image upload capability
- ✅ Form validation for required fields
- ✅ Success confirmation after product creation
- ✅ New product immediately visible in catalog

#### US-006: Edit Product Information

**As** Anna,  
**I want** to modify existing product details including stock levels,  
**So that** I can keep my inventory accurate and up-to-date.

**Acceptance Criteria:**

- ✅ "Edit" button available for each product
- ✅ Pre-populated form with current product data
- ✅ Ability to modify all product fields
- ✅ Stock quantity validation (no negative values)
- ✅ Changes reflected immediately in catalog
- ✅ Edit history tracking for audit purposes

#### US-007: Manage Archived Products

**As** Anna,  
**I want** to view and manage products that are no longer active,  
**So that** I can restore items or maintain historical data.

**Acceptance Criteria:**

- ✅ Separate view for archived/inactive products
- ✅ Filter to show products with zero stock
- ✅ Ability to restore archived products to active status
- ✅ Edit functionality for archived products
- ✅ Clear visual distinction between active and archived items

#### US-015: Archive Products

**As** Anna,  
**I want** to archive products I no longer sell,  
**So that** I can maintain clean catalog while preserving order history.

**Acceptance Criteria:**

- ✅ "Archive" button for each active product
- ✅ Confirmation dialog before archiving
- ✅ Archived products removed from main catalog
- ✅ Archived products cannot be added to new orders
- ✅ Existing cart items removed if product becomes archived
- ✅ Archived products remain visible in historical orders

---

### Epic 3: Shopping Cart & Order Processing

#### US-008: Add Products to Cart

**As** Anna,  
**I want** to add products to a shopping cart for the current customer,  
**So that** I can build their order before checkout.

**Acceptance Criteria:**

- ✅ "Add to Cart" button adds one unit of product
- ✅ Cart widget shows current items and total
- ✅ Repeat additions increase quantity automatically
- ✅ Cart total updates in real-time
- ✅ Cart persists during session until checkout

#### US-009: Manage Cart Quantities

**As** Anna,  
**I want** to adjust product quantities directly in the cart,  
**So that** I can correct amounts without re-adding items.

**Acceptance Criteria:**

- ✅ Quantity input field for each cart item
- ✅ Immediate total recalculation on quantity change
- ✅ Setting quantity to zero removes item from cart
- ✅ Quantity validation against available stock
- ✅ Clear visual feedback for quantity changes

---

### Epic 4: Customer Management

#### US-010: Customer Identification

**As** Anna,  
**I want** to search for existing customers by phone number during checkout,  
**So that** I can quickly access their information for the order.

**Acceptance Criteria:**

- ✅ Phone number search field in checkout process
- ✅ Exact match search functionality
- ✅ Auto-populate name fields when customer found
- ✅ Clear indication when customer not found
- ✅ Option to proceed with new customer information

#### US-011: Create New Customers

**As** Anna,  
**I want** to enter new customer details during order creation,  
**So that** their information is saved for future transactions.

**Acceptance Criteria:**

- ✅ Customer form with phone, first name, last name fields
- ✅ Automatic customer creation during order finalization
- ✅ Phone number uniqueness validation
- ✅ Customer data updates if phone exists with different name
- ✅ New customer immediately available for future searches

---

### Epic 5: Order Finalization

#### US-012: Complete Order Transaction

**As** Anna,  
**I want** to finalize orders with automatic inventory updates,  
**So that** stock levels remain accurate after each sale.

**Acceptance Criteria:**

- ✅ "Finalize Order" button active only with items and customer data
- ✅ Pre-finalization validation of cart contents
- ✅ Removal of archived or out-of-stock items with notification
- ✅ Server-side stock availability verification
- ✅ Atomic inventory updates upon successful order
- ✅ Order confirmation and cart clearing after completion
- ✅ Error handling for insufficient stock scenarios

---

### Epic 6: Order History & Analytics

#### US-013: View Order History

**As** Anna,  
**I want** to access a chronological list of all completed orders,  
**So that** I can review past transactions and customer purchases.

**Acceptance Criteria:**

- ✅ Orders listed from newest to oldest
- ✅ Order summary showing ID, customer, date, and total
- ✅ Expandable order details with complete item list
- ✅ Historical product information preserved (even if archived)
- ✅ Pagination for large order volumes

#### US-014: Search Order History

**As** Anna,  
**I want** to search orders by customer information,  
**So that** I can quickly find specific transactions.

**Acceptance Criteria:**

- ✅ Single search field for phone number or customer name
- ✅ Automatic detection of search type (phone vs. name)
- ✅ Real-time search results filtering
- ✅ Partial name matching capability
- ✅ Clear search results with highlighting

---

## 🎨 Feature Specifications

### Authentication System

#### Login Flow

```
1. User navigates to application
2. System redirects to login page if not authenticated
3. User enters email and password
4. System validates credentials against database
5. On success: Generate JWT token and redirect to dashboard
6. On failure: Display error message and remain on login page
```

#### Session Management

- **Token Expiration**: 7 days from login
- **Security**: Secure token storage in httpOnly cookies

### Product Management System

#### Product Data Structure

```typescript
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
  createdAt: Date;
  updatedAt: Date;
}
```

#### Stock Management Logic

```
- Stock decreases atomically upon order completion
- Negative stock levels prevented by validation
- Zero stock items remain visible but non-purchasable
- Stock adjustments logged for audit trail
```

#### Category Management

- Dynamic category list from existing products
- Case-insensitive category matching
- Support for uncategorized products
- Category cleanup on product deletion

### Shopping Cart System

#### Cart State Management

```typescript
interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
```

#### Cart Validation Rules

- Maximum quantity limited by available stock
- Automatic removal of archived products
- Real-time price updates if product prices change
- Cart persistence until order completion or session end

### Customer Management

#### Customer Data Model

```typescript
interface Customer {
  id: string;
  phone: string; // Unique identifier (9 digits)
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Customer Lookup Logic

```
1. User enters phone number
2. System searches for exact match
3. If found: Auto-populate name fields
4. If not found: Clear name fields for manual entry
5. On order completion: Create or update customer record
```

### Order Processing System

#### Order Data Model

```typescript
interface Order {
  id: string;
  orderNumber: number;
  customerId: string;
  totalAmount: number;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Order Finalization Process

```
1. Validate cart contents (remove archived/out-of-stock items)
2. Verify customer information completeness
3. Calculate order total with current prices
4. Begin database transaction
5. Verify stock availability for all items
6. Create order record
7. Create order items
8. Update product stock quantities
9. Create/update customer record
10. Commit transaction
11. Clear cart and show confirmation
```

## 💻 User Interface Design

### Layout Structure

#### Main Navigation

```
┌─────────────────────────────────────────────────────┐
│ [Logo] POS System              [User] [Logout]      │
├─────────────────────────────────────────────────────┤
│ [Dashboard] [Products] [Orders] [Customers]         │
└─────────────────────────────────────────────────────┘
```

#### Dashboard Layout

```
┌─────────────────┬───────────────────────────────────┐
│                 │                                   │
│   Sales Stats   │          Shopping Cart            │
│                 │                                   │
├─────────────────┼───────────────────────────────────┤
│                 │                                   │
│  Recent Orders  │       Product Catalog             │
│                 │                                   │
└─────────────────┴───────────────────────────────────┘
```

### Component Specifications

#### Product Card

- **Image**: Product photo (fallback to placeholder)
- **Name**: Product name (truncated if long)
- **Price**: Formatted currency display
- **Stock**: Visual stock indicator (green/yellow/red)
- **Actions**: Add to cart (if in stock) or out-of-stock indicator

#### Shopping Cart Panel

- **Header**: Item count and total amount
- **Items**: List with quantity controls and remove options
- **Footer**: Customer lookup and finalize button
- **State**: Collapsible/expandable panel

#### Customer Search

- **Input**: Phone number field with format validation
- **Results**: Auto-populated name fields or manual entry
- **Validation**: Required fields before order completion

### Responsive Design

#### Breakpoints

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (adapted grid layout)
- **Desktop**: > 1024px (full multi-column layout)

#### Mobile Optimizations

- Touch-friendly button sizes (minimum 44px)
- Swipe gestures for cart management
- Optimized input fields for mobile keyboards
- Condensed navigation with hamburger menu

## 🔄 Business Logic

### Inventory Management Rules

#### Stock Level Indicators

```typescript
const getStockLevel = (quantity: number): StockLevel => {
  if (quantity === 0) return "out-of-stock";
  if (quantity <= 5) return "low-stock";
  if (quantity <= 20) return "medium-stock";
  return "high-stock";
};
```

#### Stock Update Logic

```typescript
const updateStock = async (orderItems: OrderItem[]) => {
  return await prisma.$transaction(async (tx) => {
    for (const item of orderItems) {
      await tx.product.update({
        where: { id: item.product_id },
        data: {
          stock_quantity: {
            decrement: item.quantity,
          },
        },
      });
    }
  });
};
```

### Pricing Logic

#### Price Calculation

```typescript
const calculateOrderTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);
};
```

#### Price Display Rules

- All prices displayed with 2 decimal places
- Currency symbol ($) displayed consistently
- Tax calculations (if applicable) shown separately
- Bulk pricing discounts (future enhancement)

### Customer Management Rules

#### Phone Number Validation

```typescript
const validatePhone = (phone: string): boolean => {
  // Polish phone number format (9 digits)
  const phoneRegex = /^\d{9}$/;
  return phoneRegex.test(phone);
};
```

#### Customer Matching Logic

```typescript
const findOrCreateCustomer = async (customerData: CustomerInput) => {
  const existing = await prisma.customer.findUnique({
    where: { phone: customerData.phone },
  });

  if (existing) {
    // Update if name changed
    if (
      existing.firstName !== customerData.firstName ||
      existing.lastName !== customerData.lastName
    ) {
      return await prisma.customer.update({
        where: { id: existing.id },
        data: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
        },
      });
    }
    return existing;
  }

  // Create new customer
  return await prisma.customer.create({
    data: customerData,
  });
};
```

## 🗄️ Data Management

### Data Validation Rules

#### Product Validation

```typescript
const ProductValidation = z.object({
  title: z.string().min(1, "Title is required").max(255),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  price: z.number().min(1, "Price must be greater than 1"),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
  isArchived: z.boolean().optional(),
  reviewRating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
});
```

#### Order Validation

```typescript
const OrderValidation = z.object({
  customer: z.object({
    phone: z.string().regex(/^\d{9}$/, "Phone must be 9 digits"),
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one item required"),
  note: z.string().optional(),
});
```

### Data Integrity Rules

#### Referential Integrity

- Orders maintain references to customers (required)
- Order items maintain references to products (required)
- Soft deletion for products (archiving) preserves order history
- Customer deletion restricted if orders exist

#### Transaction Management

```sql
-- Order creation transaction
BEGIN;
  INSERT INTO orders (...) VALUES (...);
  INSERT INTO order_items (...) VALUES (...);
  UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?;
COMMIT;
```

### Data Migration Strategy

#### Initial Data Import

```typescript
const seedDatabase = async () => {
  // Import from FakeStore API (one-time only)
  const products = await fetchFromFakeStoreAPI();

  for (const product of products) {
    await prisma.product.create({
      data: {
        title: product.title,
        category: product.category,
        description: product.description,
        imageUrl: product.image,
        price: product.price,
        stockQuantity: Math.floor(Math.random() * 100),
        reviewRating: product.rating?.rate || 0,
        reviewCount: product.rating?.count || 0,
        isArchived: false,
      },
    });
  }
};
```

## 🔗 Integration Requirements

### External API Integration

#### FakeStore API (Initial Data)

- **Purpose**: One-time product catalog seeding
- **Endpoint**: https://fakestoreapi.com/products
- **Data Mapping**: Title→Name, Description→Description, etc.
- **Error Handling**: Graceful degradation if API unavailable

### Internal System Integration

#### Frontend-Backend Communication

```typescript
// API Client Configuration
const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

// Authentication Interceptor
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### Database Integration

- **ORM**: Prisma for type-safe database operations
- **Migrations**: Version-controlled schema changes
- **Seeding**: Automated test data generation
- **Backup**: Regular database backups (production)

## ⚡ Non-Functional Requirements

### Performance Requirements

#### Response Time Targets

| Operation       | Target  | Measurement            |
| --------------- | ------- | ---------------------- |
| Page Load       | < 2s    | Time to interactive    |
| Product Search  | < 300ms | Search results display |
| Cart Update     | < 100ms | UI state change        |
| Order Creation  | < 1s    | Database commit        |
| Customer Lookup | < 200ms | Search results         |

#### Scalability Requirements

- **Concurrent Users**: Support 10-50 simultaneous users
- **Product Catalog**: Handle 10,000+ products efficiently
- **Order Volume**: Process 1,000+ orders per day
- **Database Size**: Manage 100MB+ database efficiently

### Security Requirements

#### Authentication Security

- Basic password requirements enforced
- JWT tokens with secure signing algorithms (HS256)
- Token expiration managed server-side
- Secure token storage (httpOnly cookies)
- CORS protection with specific origin whitelist

#### Data Protection

- Input sanitization for all user inputs
- SQL injection prevention via parameterized queries
- XSS protection through content escaping
- CSRF protection for state-changing operations

#### Access Control

- Single-user application (no role-based access)
- All endpoints require authentication except login
- Rate limiting to prevent abuse
- Audit logging for critical operations

### Reliability Requirements

#### Uptime Target

- **Availability**: 99.5% uptime during business hours
- **Recovery Time**: < 15 minutes for system restoration
- **Data Backup**: Daily automated backups
- **Error Handling**: Graceful degradation for non-critical failures

### Usability Requirements

#### User Experience

- **Learning Curve**: New users productive within 30 minutes
- **Task Efficiency**: Complete order in < 2 minutes
- **Error Prevention**: Clear validation messages
- **Mobile Usability**: Full functionality on touch devices
- **Language**: Polish interface and error messages

#### Accessibility

- **Basic Accessibility**: Semantic HTML structure
- **Keyboard Navigation**: Basic keyboard support
- **Screen Readers**: Compatible with common screen readers
- **Color Contrast**: Good contrast ratios for readability

---

## 📚 Related Documentation

- [Technical Specification](./technical-specification.md)
- [Project Requirements Document](./prd.md)
- [Frontend Documentation](../frontend/README.md)
- [Backend Documentation](../backend/README.md)

---

**Document Version**: 1.0.0

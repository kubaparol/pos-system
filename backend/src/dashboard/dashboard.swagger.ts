/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get comprehensive dashboard statistics
 *     description: |
 *       Retrieves all dashboard statistics including:
 *       - KPI metrics (total revenue, orders, average order value, customers)
 *       - Top selling products
 *       - Stock alerts for low/out of stock products
 *       - Top customers by spending
 *       - Recent orders
 *
 *       All data covers the entire operational period without time filters.
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Maximum number of items to return for lists (1-20, default 5)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 5
 *         example: 5
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Dashboard statistics with KPI, top products, stock alerts, top customers, and recent orders
 *             example:
 *                   success: true
 *                   data:
 *                     kpi:
 *                       totalRevenue: 234567.89
 *                       totalOrders: 1247
 *                       averageOrderValue: 188.45
 *                       totalCustomers: 856
 *                     topProducts:
 *                       - id: "550e8400-e29b-41d4-a716-446655440000"
 *                         name: "Smartphone Samsung Galaxy S24"
 *                         quantitySold: 47
 *                         totalRevenue: 155109.53
 *                       - id: "550e8400-e29b-41d4-a716-446655440001"
 *                         name: "Słuchawki Sony WH-1000XM5"
 *                         quantitySold: 32
 *                         totalRevenue: 41599.68
 *                     stockAlerts:
 *                       - id: "550e8400-e29b-41d4-a716-446655440002"
 *                         name: "Koszulka polo Ralph Lauren"
 *                         currentStock: 0
 *                         status: "out_of_stock"
 *                       - id: "550e8400-e29b-41d4-a716-446655440003"
 *                         name: "Rower górski Trek"
 *                         currentStock: 3
 *                         status: "low_stock"
 *                     topCustomers:
 *                       - id: "550e8400-e29b-41d4-a716-446655440004"
 *                         name: "Jan Kowalski"
 *                         orderCount: 12
 *                         totalSpent: 8247.87
 *                       - id: "550e8400-e29b-41d4-a716-446655440005"
 *                         name: "Anna Nowak"
 *                         orderCount: 8
 *                         totalSpent: 5670.45
 *                     recentOrders:
 *                       - id: "550e8400-e29b-41d4-a716-446655440006"
 *                         orderNumber: "ORD-2024-001"
 *                         customerName: "Jan Kowalski"
 *                         amount: 3599.98
 *                         date: "2024-01-15T10:30:00.000Z"
 *                       - id: "550e8400-e29b-41d4-a716-446655440007"
 *                         orderNumber: "ORD-2024-002"
 *                         customerName: "Anna Nowak"
 *                         amount: 1299.99
 *                         date: "2024-01-14T14:20:00.000Z"
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: List all orders
 *     description: Retrieve a list of all orders with optional search by customer name or phone
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for customer name or phone number (minimum 3 digits for phone search)
 *         example: "John"
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Order ID
 *                       orderNumber:
 *                         type: string
 *                         description: Order number (BigInt as string)
 *                       customerId:
 *                         type: string
 *                         description: Customer ID
 *                       totalAmount:
 *                         type: string
 *                         description: Total order amount (Decimal as string)
 *                       note:
 *                         type: string
 *                         nullable: true
 *                         description: Order note
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Order creation date
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Order last update date
 *                       customer:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           firstName:
 *                             type: string
 *                           lastName:
 *                             type: string
 *                           phone:
 *                             type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             productId:
 *                               type: string
 *                             quantity:
 *                               type: integer
 *                             unitPrice:
 *                               type: string
 *                             product:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 title:
 *                                   type: string
 *                                 price:
 *                                   type: string
 *                                 stockQuantity:
 *                                   type: integer
 *                                 isArchived:
 *                                   type: boolean
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   orderNumber: "1001"
 *                   customerId: "456e7890-e89b-12d3-a456-426614174001"
 *                   totalAmount: "99.99"
 *                   note: "Please deliver in the morning"
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *                   customer:
 *                     id: "456e7890-e89b-12d3-a456-426614174001"
 *                     firstName: "John"
 *                     lastName: "Doe"
 *                     phone: "123456789"
 *                   items:
 *                     - id: "789e0123-e89b-12d3-a456-426614174002"
 *                       productId: "abc123"
 *                       quantity: 2
 *                       unitPrice: "49.99"
 *                       product:
 *                         id: "abc123"
 *                         title: "Product Name"
 *                         price: "49.99"
 *                         stockQuantity: 10
 *                         isArchived: false
 *               success: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Internal server error message
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/orders/finalize:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Finalize an order
 *     description: Create a new order with customer information and items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - items
 *             properties:
 *               customer:
 *                 type: object
 *                 required:
 *                   - firstName
 *                   - lastName
 *                   - phone
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     minLength: 1
 *                     description: Customer first name
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     minLength: 1
 *                     description: Customer last name
 *                     example: "Doe"
 *                   phone:
 *                     type: string
 *                     minLength: 3
 *                     description: Customer phone number
 *                     example: "123456789"
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                       description: Product ID (UUID)
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       description: Quantity of the product
 *                       example: 2
 *               note:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Optional order note
 *                 example: "Please deliver in the morning"
 *           examples:
 *             valid_request:
 *               summary: Valid order finalization
 *               value:
 *                 orderNumber: "1001"
 *                 customer:
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   phone: "123456789"
 *                 items:
 *                   - productId: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantity: 2
 *                   - productId: "456e7890-e89b-12d3-a456-426614174001"
 *                     quantity: 1
 *                 note: "Please deliver in the morning"
 *     responses:
 *       201:
 *         description: Order finalized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Order ID
 *                     orderNumber:
 *                       type: string
 *                       description: Order number (BigInt as string)
 *                     customerId:
 *                       type: string
 *                       description: Customer ID
 *                     totalAmount:
 *                       type: string
 *                       description: Total order amount (Decimal as string)
 *                     note:
 *                       type: string
 *                       nullable: true
 *                       description: Order note
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Order creation date
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Order last update date
 *                     customer:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         phone:
 *                           type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           productId:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *                           unitPrice:
 *                             type: string
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               price:
 *                                 type: string
 *                               stockQuantity:
 *                                 type: integer
 *                               isArchived:
 *                                 type: boolean
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 orderNumber: "1001"
 *                 customerId: "456e7890-e89b-12d3-a456-426614174001"
 *                 totalAmount: "99.98"
 *                 note: "Please deliver in the morning"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *                 customer:
 *                   id: "456e7890-e89b-12d3-a456-426614174001"
 *                   firstName: "John"
 *                   lastName: "Doe"
 *                   phone: "123456789"
 *                 items:
 *                   - id: "789e0123-e89b-12d3-a456-426614174002"
 *                     productId: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantity: 2
 *                     unitPrice: "49.99"
 *                     product:
 *                       id: "123e4567-e89b-12d3-a456-426614174000"
 *                       title: "Product Name"
 *                       price: "49.99"
 *                       stockQuantity: 8
 *                       isArchived: false
 *               message: "Order finalized"
 *               success: true
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Validation error message
 *                 success:
 *                   type: boolean
 *                   example: false
 *       409:
 *         description: Cart contains invalid items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Cart contains invalid items"
 *                 details:
 *                   type: object
 *                   properties:
 *                     invalidItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             description: Product ID
 *                           reason:
 *                             type: string
 *                             enum: [ARCHIVED, INSUFFICIENT_STOCK, INVALID_QUANTITY, NOT_FOUND, OUT_OF_STOCK]
 *                             description: Reason why item is invalid
 *                 success:
 *                   type: boolean
 *                   example: false
 *             example:
 *               error: "Cart contains invalid items"
 *               details:
 *                 invalidItems:
 *                   - productId: "123e4567-e89b-12d3-a456-426614174000"
 *                     reason: "OUT_OF_STOCK"
 *                   - productId: "456e7890-e89b-12d3-a456-426614174001"
 *                     reason: "INSUFFICIENT_STOCK"
 *               success: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Internal server error message
 *                 success:
 *                   type: boolean
 *                   example: false
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: List all products
 *     description: Retrieve a list of all products with optional filtering
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *         example: "electronics"
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term for product title (case-insensitive)
 *         example: "phone"
 *       - in: query
 *         name: archived
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter by archived status
 *         example: "false"
 *       - in: query
 *         name: stock
 *         schema:
 *           type: string
 *           enum: [0, gt0]
 *         description: Filter by stock quantity (0 = out of stock, gt0 = in stock)
 *         example: "gt0"
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
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
 *                         description: Product ID
 *                       category:
 *                         type: string
 *                         description: Product category
 *                       title:
 *                         type: string
 *                         description: Product title
 *                       description:
 *                         type: string
 *                         description: Product description
 *                       imageUrl:
 *                         type: string
 *                         nullable: true
 *                         description: Product image URL
 *                       price:
 *                         type: string
 *                         description: Product price (Decimal as string)
 *                       stockQuantity:
 *                         type: integer
 *                         description: Available stock quantity
 *                       isArchived:
 *                         type: boolean
 *                         description: Whether product is archived
 *                       reviewRating:
 *                         type: string
 *                         description: Average review rating (Decimal as string)
 *                       reviewCount:
 *                         type: integer
 *                         description: Number of reviews
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Product creation date
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Product last update date
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   category: "electronics"
 *                   title: "iPhone 15"
 *                   description: "Latest iPhone model"
 *                   imageUrl: "https://example.com/iphone15.jpg"
 *                   price: "999.99"
 *                   stockQuantity: 10
 *                   isArchived: false
 *                   reviewRating: "4.5"
 *                   reviewCount: 25
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
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
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     description: Retrieve a specific product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID (UUID)
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                       description: Product ID
 *                     category:
 *                       type: string
 *                       description: Product category
 *                     title:
 *                       type: string
 *                       description: Product title
 *                     description:
 *                       type: string
 *                       description: Product description
 *                     imageUrl:
 *                       type: string
 *                       nullable: true
 *                       description: Product image URL
 *                     price:
 *                       type: string
 *                       description: Product price (Decimal as string)
 *                     stockQuantity:
 *                       type: integer
 *                       description: Available stock quantity
 *                     isArchived:
 *                       type: boolean
 *                       description: Whether product is archived
 *                     reviewRating:
 *                       type: string
 *                       description: Average review rating (Decimal as string)
 *                     reviewCount:
 *                       type: integer
 *                       description: Number of reviews
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product creation date
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product last update date
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 category: "electronics"
 *                 title: "iPhone 15"
 *                 description: "Latest iPhone model"
 *                 imageUrl: "https://example.com/iphone15.jpg"
 *                 price: "999.99"
 *                 stockQuantity: 10
 *                 isArchived: false
 *                 reviewRating: "4.5"
 *                 reviewCount: 25
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *               success: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Record to find does not exist"
 *                 success:
 *                   type: boolean
 *                   example: false
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
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Create a new product with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 description: Product title
 *                 example: "iPhone 15"
 *               category:
 *                 type: string
 *                 minLength: 1
 *                 description: Product category
 *                 example: "electronics"
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 description: Product description
 *                 example: "Latest iPhone model with advanced features"
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 description: Product image URL (optional)
 *                 example: "https://example.com/iphone15.jpg"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Product price
 *                 example: 999.99
 *               stockQuantity:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 description: Initial stock quantity
 *                 example: 10
 *               isArchived:
 *                 type: boolean
 *                 default: false
 *                 description: Whether product is archived
 *                 example: false
 *               reviewRating:
 *                 type: number
 *                 minimum: 0
 *                 default: 0
 *                 description: Initial review rating
 *                 example: 0
 *               reviewCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 description: Initial review count
 *                 example: 0
 *           examples:
 *             valid_request:
 *               summary: Valid product creation
 *               value:
 *                 title: "iPhone 15"
 *                 category: "electronics"
 *                 description: "Latest iPhone model with advanced features"
 *                 imageUrl: "https://example.com/iphone15.jpg"
 *                 price: 999.99
 *                 stockQuantity: 10
 *                 isArchived: false
 *                 reviewRating: 0
 *                 reviewCount: 0
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                       description: Product ID
 *                     category:
 *                       type: string
 *                       description: Product category
 *                     title:
 *                       type: string
 *                       description: Product title
 *                     description:
 *                       type: string
 *                       description: Product description
 *                     imageUrl:
 *                       type: string
 *                       nullable: true
 *                       description: Product image URL
 *                     price:
 *                       type: string
 *                       description: Product price (Decimal as string)
 *                     stockQuantity:
 *                       type: integer
 *                       description: Available stock quantity
 *                     isArchived:
 *                       type: boolean
 *                       description: Whether product is archived
 *                     reviewRating:
 *                       type: string
 *                       description: Average review rating (Decimal as string)
 *                     reviewCount:
 *                       type: integer
 *                       description: Number of reviews
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product creation date
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product last update date
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 category: "electronics"
 *                 title: "iPhone 15"
 *                 description: "Latest iPhone model with advanced features"
 *                 imageUrl: "https://example.com/iphone15.jpg"
 *                 price: "999.99"
 *                 stockQuantity: 10
 *                 isArchived: false
 *                 reviewRating: "0"
 *                 reviewCount: 0
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *               message: "Product created"
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
 * /api/products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     description: Update an existing product with the provided details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID (UUID)
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 description: Product title
 *                 example: "iPhone 15 Pro"
 *               category:
 *                 type: string
 *                 minLength: 1
 *                 description: Product category
 *                 example: "electronics"
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 description: Product description
 *                 example: "Updated iPhone model description"
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 description: Product image URL
 *                 example: "https://example.com/iphone15pro.jpg"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Product price
 *                 example: 1199.99
 *               stockQuantity:
 *                 type: integer
 *                 minimum: 0
 *                 description: Available stock quantity
 *                 example: 15
 *               isArchived:
 *                 type: boolean
 *                 description: Whether product is archived
 *                 example: false
 *               reviewRating:
 *                 type: number
 *                 minimum: 0
 *                 description: Average review rating
 *                 example: 4.5
 *               reviewCount:
 *                 type: integer
 *                 minimum: 0
 *                 description: Number of reviews
 *                 example: 25
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                       description: Product ID
 *                     category:
 *                       type: string
 *                       description: Product category
 *                     title:
 *                       type: string
 *                       description: Product title
 *                     description:
 *                       type: string
 *                       description: Product description
 *                     imageUrl:
 *                       type: string
 *                       nullable: true
 *                       description: Product image URL
 *                     price:
 *                       type: string
 *                       description: Product price (Decimal as string)
 *                     stockQuantity:
 *                       type: integer
 *                       description: Available stock quantity
 *                     isArchived:
 *                       type: boolean
 *                       description: Whether product is archived
 *                     reviewRating:
 *                       type: string
 *                       description: Average review rating (Decimal as string)
 *                     reviewCount:
 *                       type: integer
 *                       description: Number of reviews
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product creation date
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Product last update date
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 category: "electronics"
 *                 title: "iPhone 15 Pro"
 *                 description: "Updated iPhone model description"
 *                 imageUrl: "https://example.com/iphone15pro.jpg"
 *                 price: "1199.99"
 *                 stockQuantity: 15
 *                 isArchived: false
 *                 reviewRating: "4.5"
 *                 reviewCount: 25
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *               message: "Product updated"
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
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Record to find does not exist"
 *                 success:
 *                   type: boolean
 *                   example: false
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
 * /api/products/{id}/archive:
 *   post:
 *     tags:
 *       - Products
 *     summary: Archive a product
 *     description: Archive a product (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID (UUID)
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Product archived successfully
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
 *                       description: Product ID
 *                     isArchived:
 *                       type: boolean
 *                       description: Whether product is archived
 *                       example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 isArchived: true
 *               message: "Product archived"
 *               success: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Record to find does not exist"
 *                 success:
 *                   type: boolean
 *                   example: false
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
 * /api/products/{id}/restore:
 *   post:
 *     tags:
 *       - Products
 *     summary: Restore a product
 *     description: Restore an archived product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Product ID (UUID)
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Product restored successfully
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
 *                       description: Product ID
 *                     isArchived:
 *                       type: boolean
 *                       description: Whether product is archived
 *                       example: false
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 isArchived: false
 *               message: "Product restored"
 *               success: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Record to find does not exist"
 *                 success:
 *                   type: boolean
 *                   example: false
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

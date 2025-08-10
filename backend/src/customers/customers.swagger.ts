/**
 * @swagger
 * /api/customers/search:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Search customer by phone number
 *     description: Find a customer by their phone number
 *     parameters:
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 3
 *           description: Customer phone number (minimum 3 characters)
 *           example: "123456789"
 *     responses:
 *       200:
 *         description: Customer found successfully
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
 *                       description: Customer ID
 *                     firstName:
 *                       type: string
 *                       description: Customer first name
 *                     lastName:
 *                       type: string
 *                       description: Customer last name
 *                     phone:
 *                       type: string
 *                       description: Customer phone number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Customer creation date
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Customer last update date
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 phone: "123456789"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *               success: true
 *       400:
 *         description: Missing or invalid phone parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "phone is required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Customer not found
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

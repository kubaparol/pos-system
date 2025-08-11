/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user information
 *     description: Retrieve information about the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
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
 *                       format: uuid
 *                       description: User unique identifier
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User email address
 *                       example: "user@example.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: User creation timestamp
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: User last update timestamp
 *                       example: "2024-01-15T10:30:00.000Z"
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *                   example: true
 *             example:
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 email: "user@example.com"
 *                 createdAt: "2024-01-15T10:30:00.000Z"
 *                 updatedAt: "2024-01-15T10:30:00.000Z"
 *               message: "User retrieved successfully"
 *               success: true
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Unauthorized"
 *                 success:
 *                   type: boolean
 *                   example: false
 *             examples:
 *               missing_token:
 *                 summary: Missing authentication token
 *                 value:
 *                   error: "Unauthorized"
 *                   success: false
 *               invalid_token:
 *                 summary: Invalid authentication token
 *                 value:
 *                   error: "Unauthorized"
 *                   success: false
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
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

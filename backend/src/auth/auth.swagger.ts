/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in user
 *     description: Authenticate user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address (must be valid email format)
 *                 example: "user@example.com"
 *                 minLength: 1
 *               password:
 *                 type: string
 *                 description: User password (minimum 1 character)
 *                 example: "password123"
 *                 minLength: 1
 *           examples:
 *             valid_request:
 *               summary: Valid sign-in request
 *               value:
 *                 email: "user@example.com"
 *                 password: "password123"
 *             invalid_email:
 *               summary: Invalid email format
 *               value:
 *                 email: "invalid-email"
 *                 password: "password123"
 *             missing_password:
 *               summary: Missing password
 *               value:
 *                 email: "user@example.com"
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT authentication token
 *                     userId:
 *                       type: string
 *                       description: User ID
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 success:
 *                   type: boolean
 *                   description: Operation success status
 *             example:
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 userId: "123e4567-e89b-12d3-a456-426614174000"
 *               message: "User signed in successfully"
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
 *             examples:
 *               invalid_email:
 *                 summary: Invalid email format
 *                 value:
 *                   error: "Invalid email"
 *                   success: false
 *               missing_password:
 *                 summary: Missing password
 *                 value:
 *                   error: "Password is required"
 *                   success: false
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Authentication error message
 *                   example: "Invalid email or password"
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

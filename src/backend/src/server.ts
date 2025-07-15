import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
// Configure CORS - Allow requests from both frontend development servers
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  process.env.ADMIN_FRONTEND_URL || 'http://localhost:3002',
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // If you need to handle cookies or authorization headers
}));

app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies (Content-Type: application/json)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (Content-Type: application/x-www-form-urlencoded)

// Basic Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Form.AI Backend is running!');
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Backend is healthy', timestamp: new Date().toISOString() });
});

// API routes for the main application
import authRoutes from './routes/auth.routes';
import templateRoutes from './routes/template.routes';
import formRoutes from './routes/form.routes';
import aiRoutes from './routes/ai.routes';
import feedbackRoutes from './routes/feedback.routes';
import reportRoutes from './routes/report.routes';
import userRoutes from './routes/user.routes';
import fileRoutes from './routes/file.routes';
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// API routes for the admin panel
import adminUserRoutes from './routes/admin/user.routes';
import adminDashboardRoutes from './routes/admin/dashboard.routes';
import adminTemplateRoutes from './routes/admin/template.routes';
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/templates', adminTemplateRoutes);

// Catch-all for 404 Not Found errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler - must have 4 arguments
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${new Date().toISOString()} - ${err.message}`);
  console.error(err.stack);
  // Avoid sending stack trace to client in production
  const statusCode = (err as any).statusCode || 500; // Use custom status code if available
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal Server Error'
    : err.message || 'An unexpected error occurred';

  res.status(statusCode).json({ message });
});

import { createAdminUserIfNotExists } from './services/user.service';

// Start the server
app.listen(PORT, async () => {
  // Ensure a default admin user exists on startup
  await createAdminUserIfNotExists();

  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

export default app; // Export for potential testing or programmatic use

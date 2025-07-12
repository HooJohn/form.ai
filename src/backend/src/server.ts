import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
// Configure CORS - Allow requests from frontend development server
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: frontendUrl,
  credentials: true, // If you need to handle cookies or authorization headers
}));

app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies (Content-Type: application/json)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (Content-Type: application/x-www-form-urlencoded)

// Basic Routes
app.get('/', (req: Request, res: Response) => {
  res.send('SmartForm AI Backend is running!');
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Backend is healthy', timestamp: new Date().toISOString() });
});

// Placeholder for future API routes
import authRoutes from './routes/auth.routes';
import templateRoutes from './routes/template.routes';
import formRoutes from './routes/form.routes';
import aiRoutes from './routes/ai.routes';
import feedbackRoutes from './routes/feedback.routes';
import reportRoutes from './routes/report.routes';
import userRoutes from './routes/user.routes';
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`Allowed CORS origin: ${frontendUrl}`);
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

export default app; // Export for potential testing or programmatic use

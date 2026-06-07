import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import jobRoutes from "./routes/job.routes.js";
import coverLetterRoutes from "./routes/coverLetter.routes.js";
import jobMatchRoutes from "./routes/jobMatch.routes.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/coverLetter", coverLetterRoutes);
app.use("/api/v1/jobMatch", jobMatchRoutes);

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Backend is running correctly on port 3000!' });
});

// Handling undefined routes
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

export default app;

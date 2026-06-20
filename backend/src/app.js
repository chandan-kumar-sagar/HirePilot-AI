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
import careerCoachRoutes from "./routes/careerCoach.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/userprofile.routes.js";
import resumeVersionRoutes from "./routes/resumeVersion.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import logger from "./utils/logger.js";
import { apiLimiter, aiLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

// Global Middlewares
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true,
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://hire-pilot-ai-alpha.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS Not Allowed")
        );
      }
    },
    credentials: true,
  })
);

app.use(helmet());

const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Apply general rate limiting to all /api routes
app.use("/api", apiLimiter);

// ─── Standard Routes ──────────────────────────────────────────────────────────
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resumeVersion", resumeVersionRoutes);
app.use("/api/v1/contact", contactRoutes);

// ─── AI Routes (stricter: 10 req/min per user) ───────────────────────────────
app.use("/api/v1/interview", aiLimiter, interviewRoutes);
app.use("/api/v1/coverLetter", aiLimiter, coverLetterRoutes);
app.use("/api/v1/jobMatch", aiLimiter, jobMatchRoutes);
app.use("/api/v1/careerCoach", aiLimiter, careerCoachRoutes);

// ─── Root Route (silences browser 404 on direct server visit) ────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    name: "AI Career OS API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    docs: "/health",
  });
});

// Silence browser favicon auto-fetch from polluting the logs
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Basic health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "success", message: "Backend is running correctly on port 3000!" });
});

// Handling undefined routes
app.use((req, res) => {
  res.status(404).json({ status: "error", message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;

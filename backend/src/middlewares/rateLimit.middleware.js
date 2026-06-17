import rateLimit from "express-rate-limit";

// ─── General API Limiter ──────────────────────────────────────────────────────
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 5000 : 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── AI Limiter (Gemini / OpenAI calls) ──────────────────────────────────────
// 10 requests per minute per IP — protects against billing abuse
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,                // 1 minute window
  max: process.env.NODE_ENV === "development" ? 500 : 10, // 10 in prod, 500 in dev
  message: {
    success: false,
    message: "AI request limit reached. Please wait a moment before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?._id?.toString() || req.ip, // per-user limiting
});
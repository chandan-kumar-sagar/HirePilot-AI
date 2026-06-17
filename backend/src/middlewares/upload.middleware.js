import multer from "multer";
import path from "path";
import fs from "fs";

// ─── Allowed file types ───────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc (legacy)
];

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// ─── Storage ──────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "src", "uploads", "resumes");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    // Sanitize filename: remove path separators and special chars
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_\-]/g, "_")
      .substring(0, 50); // cap length
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

// ─── File Filter ──────────────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const isMimeAllowed = ALLOWED_MIME_TYPES.includes(file.mimetype);
  const isExtAllowed = ALLOWED_EXTENSIONS.includes(ext);

  if (isMimeAllowed && isExtAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Only PDF and DOCX files are accepted. Received: ${file.mimetype} (${ext})`
      ),
      false
    );
  }
};

// ─── Multer Instance ──────────────────────────────────────────────────────────
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,      // Max 10 MB
    files: 1,                      // Only one file at a time
  },
});

// ─── Error Handler for Multer Errors ─────────────────────────────────────────
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum allowed size is 10 MB.",
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }

  next();
};
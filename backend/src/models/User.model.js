import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    subscription: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      default: "fresher",
    },

    linkedinUrl: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    portfolioUrl: {
      type: String,
      default: "",
    },

    targetRole: {
      type: String,
      default: "",
    },

    targetSalary: {
      type: String,
      default: "",
    },

    preferredLocation: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
        default: "",
      },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
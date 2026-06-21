import mongoose from "mongoose";
import dotenv from "dotenv";
import JobOpportunity from "../src/models/JobOpportunity.model.js";

// Load env vars
dotenv.config();

const dummyJobs = [
  {
    title: "Senior Full Stack Engineer",
    company: "TechNova Solutions",
    description: "We are looking for a senior full stack engineer to build scalable web applications. Must be proficient in Node.js, React, and MongoDB.",
    location: "Remote",
    minSalary: 130000,
    maxSalary: 160000,
    experienceLevel: "senior",
    jobType: "Full-time",
    requiredSkills: ["Node.js", "React", "MongoDB", "Express", "TypeScript"],
    jobUrl: "https://example.com/job/1"
  },
  {
    title: "Frontend Developer (React)",
    company: "Creative Digital",
    description: "Join our agency to build stunning, interactive UIs using React, Tailwind CSS, and Framer Motion.",
    location: "New York, NY",
    minSalary: 90000,
    maxSalary: 120000,
    experienceLevel: "mid",
    jobType: "Full-time",
    requiredSkills: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "UI/UX"],
    jobUrl: "https://example.com/job/2"
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "CloudScale Inc.",
    description: "Design and implement robust microservices architecture. Heavy focus on performance and API design.",
    location: "San Francisco, CA",
    minSalary: 140000,
    maxSalary: 180000,
    experienceLevel: "senior",
    jobType: "Full-time",
    requiredSkills: ["Node.js", "Microservices", "PostgreSQL", "Docker", "AWS"],
    jobUrl: "https://example.com/job/3"
  },
  {
    title: "Data Scientist",
    company: "AI Frontiers",
    description: "Apply machine learning models to vast datasets. Python and SQL expertise required.",
    location: "Remote",
    minSalary: 120000,
    maxSalary: 150000,
    experienceLevel: "mid",
    jobType: "Full-time",
    requiredSkills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Analysis"],
    jobUrl: "https://example.com/job/4"
  },
  {
    title: "DevOps Engineer",
    company: "InfraCorp",
    description: "Manage our cloud infrastructure and CI/CD pipelines.",
    location: "Austin, TX",
    minSalary: 115000,
    maxSalary: 145000,
    experienceLevel: "mid",
    jobType: "Full-time",
    requiredSkills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Terraform"],
    jobUrl: "https://example.com/job/5"
  },
  {
    title: "Python Developer",
    company: "DataSync",
    description: "Build robust data pipelines and backend systems using Python and Django.",
    location: "Remote",
    minSalary: 100000,
    maxSalary: 130000,
    experienceLevel: "junior",
    jobType: "Contract",
    requiredSkills: ["Python", "Django", "REST APIs", "PostgreSQL"],
    jobUrl: "https://example.com/job/6"
  },
  {
    title: "Lead Frontend Engineer",
    company: "WebWorks",
    description: "Lead our frontend team in building a next-generation SaaS product using React and TypeScript.",
    location: "Seattle, WA",
    minSalary: 150000,
    maxSalary: 180000,
    experienceLevel: "senior",
    jobType: "Full-time",
    requiredSkills: ["React", "TypeScript", "Next.js", "GraphQL", "Leadership"],
    jobUrl: "https://example.com/job/7"
  },
  {
    title: "Database Administrator",
    company: "SecureData",
    description: "Ensure the performance, security, and availability of our databases.",
    location: "Chicago, IL",
    minSalary: 110000,
    maxSalary: 140000,
    experienceLevel: "mid",
    jobType: "Full-time",
    requiredSkills: ["SQL", "MongoDB", "Database Optimization", "Backup/Recovery"],
    jobUrl: "https://example.com/job/8"
  },
  {
    title: "Machine Learning Engineer",
    company: "Visionary AI",
    description: "Develop and deploy deep learning models for computer vision.",
    location: "Remote",
    minSalary: 160000,
    maxSalary: 200000,
    experienceLevel: "senior",
    jobType: "Full-time",
    requiredSkills: ["Python", "PyTorch", "Computer Vision", "Deep Learning", "C++"],
    jobUrl: "https://example.com/job/9"
  },
  {
    title: "Junior Web Developer",
    company: "Startup Hub",
    description: "Great entry-level opportunity for a passionate web developer.",
    location: "Boston, MA",
    minSalary: 70000,
    maxSalary: 90000,
    experienceLevel: "fresher",
    jobType: "Full-time",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    jobUrl: "https://example.com/job/10"
  }
];

const seedJobs = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/hirepilot";
    console.log("Connecting to MongoDB...", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Clearing existing global jobs...");
    await JobOpportunity.deleteMany({});

    console.log("Seeding dummy jobs...");
    const createdJobs = await JobOpportunity.insertMany(dummyJobs);
    
    console.log(`Successfully seeded ${createdJobs.length} jobs with structured filter data!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding jobs:", error);
    process.exit(1);
  }
};

seedJobs();

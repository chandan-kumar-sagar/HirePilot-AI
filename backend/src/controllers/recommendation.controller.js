import NodeCache from "node-cache";
import Resume from "../models/Resume.model.js";
import JobOpportunity from "../models/JobOpportunity.model.js";
import { rankJobOpportunities } from "../services/ai/recommendation.service.js";

// Cache for 24 hours (86400 seconds)
const recommendationCache = new NodeCache({ stdTTL: 86400 });

export const getRecommendations = async (req, res) => {
  try {
    const { resumeId, location, experience, expectedCtc, jobType } = req.body;
    const userId = req.user._id.toString();

    if (!resumeId) {
      return res.status(400).json({ success: false, message: "Resume ID is required" });
    }

    // 1. Check Cache (Include filters in cache key)
    const filterStr = JSON.stringify({ location, experience, expectedCtc, jobType });
    const filterHash = Buffer.from(filterStr).toString("base64");
    const cacheKey = `recs_${userId}_${resumeId}_${filterHash}`;
    const cachedResult = recommendationCache.get(cacheKey);

    if (cachedResult) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: cachedResult,
      });
    }

    // 2. Fetch User Resume
    const resume = await Resume.findOne({ _id: resumeId, user: userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    // Extract lightweight profile (Saves 80-90% AI Tokens!)
    const candidateProfile = {
      skills: resume.skills || [],
      experienceLevel: experience || req.user.experienceLevel || "Mid", // Fallback to User model
      projects: resume.experience.map(e => e.description).join(" ").substring(0, 500), // Compress experience
      education: resume.education.map(e => `${e.degree} in ${e.fieldOfStudy}`),
      preferredRole: req.user.targetRole || resume.title,
    };

    if (candidateProfile.skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No skills found in resume to generate recommendations.",
      });
    }

    // 3. Pre-Filter via MongoDB (Massive performance boost)
    const query = {
      requiredSkills: { $in: candidateProfile.skills },
      isActive: true,
    };

    if (location) query.location = new RegExp(location, "i");
    if (experience) query.experienceLevel = experience;
    if (jobType) query.jobType = jobType;
    if (expectedCtc) query.maxSalary = { $gte: Number(expectedCtc) };

    const preFilteredJobs = await JobOpportunity.find(query)
      .limit(50) // Never send more than 50 to AI
      .lean();

    if (preFilteredJobs.length === 0) {
      return res.status(200).json({
        success: true,
        source: "database",
        data: [],
        message: "No matching jobs found in the global pool.",
      });
    }

    // Map jobs to lightweight array for AI prompt
    const availableJobs = preFilteredJobs.map(job => ({
      jobId: job._id.toString(),
      title: job.title,
      company: job.company,
      requiredSkills: job.requiredSkills,
    }));

    // 4. AI Ranking Layer (Score 0-100, return Top 5)
    const topRecommendations = await rankJobOpportunities({
      candidateProfile,
      availableJobs,
    });

    // Hydrate the AI's recommendations with full Job data and filter out poor matches
    const hydratedRecommendations = topRecommendations.map(rec => {
      const fullJob = preFilteredJobs.find(j => j._id.toString() === rec.jobId);
      if (!fullJob || rec.matchScore < 50) return null; // Reject low scores
      return {
        ...fullJob,
        matchDetails: {
          matchScore: rec.matchScore,
          reasons: rec.reasons,
          missingSkills: rec.missingSkills,
        }
      };
    }).filter(Boolean); // Filter out nulls

    // Sort heavily by match score descending
    hydratedRecommendations.sort((a, b) => b.matchDetails.matchScore - a.matchDetails.matchScore);

    // 5. Save to Cache and Return
    recommendationCache.set(cacheKey, hydratedRecommendations);

    res.status(200).json({
      success: true,
      source: "ai",
      data: hydratedRecommendations,
    });

  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate recommendations",
    });
  }
};

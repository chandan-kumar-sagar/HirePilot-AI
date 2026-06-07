import Resume from "../models/Resume.model.js";
import Job from "../models/Job.model.js";
import CoverLetter from "../models/CoverLetter.model.js";
import Interview from "../models/Interview.model.js";
import JobMatch from "../models/JobMatch.model.js";

export const getDashboardStats = async (req, res) => {
    try {
      const userId = req.user._id;

      const [
        resumes,
        applications,
        interviews,
        coverLetters,
        jobMatches,
      ] = await Promise.all([
        Resume.countDocuments({
          user: userId,
        }),

        Job.countDocuments({
          user: userId,
          status: { $ne: "saved" }, // Only count actual applications
        }),

        Job.countDocuments({
          user: userId,
          status: "interview", // Only count jobs in interview stage
        }),

        CoverLetter.countDocuments({
          user: userId,
        }),

        JobMatch.countDocuments({
          user: userId,
        }),
      ]);

      res.status(200).json({
        success: true,
        stats: {
          resumes,
          applications,
          interviews,
          coverLetters,
          jobMatches,
        },
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };


  export const getRecentActivity =
  async (req, res) => {
    try {
      const userId = req.user._id;

      const [
        resumes,
        jobs,
        coverLetters,
        jobMatches,
      ] = await Promise.all([
        Resume.find({
          user: userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5),

        Job.find({
          user: userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5),

        CoverLetter.find({
          user: userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5),

        JobMatch.find({
          user: userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5),
      ]);

      const activities = [
        ...resumes.map((item) => ({
          type: "Resume",
          title: item.title,
          createdAt: item.createdAt,
        })),

        ...jobs.map((item) => ({
          type: "Application",
          title: `${item.companyName} - ${item.jobTitle}`,
          createdAt: item.createdAt,
        })),

        ...coverLetters.map(
          (item) => ({
            type: "Cover Letter",
            title: `${item.companyName} - ${item.jobTitle}`,
            createdAt: item.createdAt,
          })
        ),

        ...jobMatches.map(
          (item) => ({
            type: "Job Match",
            title: `${item.companyName} - ${item.jobTitle}`,
            createdAt: item.createdAt,
          })
        ),
      ];

      activities.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
      );

      res.status(200).json({
        success: true,

        activities:
          activities.slice(
            0,
            10
          ),
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };
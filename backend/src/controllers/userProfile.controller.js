import User from "../models/User.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      bio,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      targetRole,
      targetSalary,
      preferredLocation,
    } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, {
          fullName,
          bio,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          targetRole,
          targetSalary,
          preferredLocation,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          skills,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    res.status(200).json({
      success: true,
      message:
        "Skills updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateExperienceLevel = async (req, res) => {
    try {
      const {
        experienceLevel,
      } = req.body;

      const user = await User.findByIdAndUpdate(req.user._id, {
            experienceLevel,
          },
          {
            new: true,
            runValidators: true,
          }
        ).select("-password");

      res.status(200).json({
        success: true,
        message:
          "Experience level updated successfully",
        user,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };
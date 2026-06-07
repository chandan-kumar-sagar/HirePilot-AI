import Job from "../models/Job.model.js";

export const createJob = async (req, res) => {
  try {
    const {
     companyName,
      jobTitle,
      jobUrl,
      location,
      notes,
    } = req.body;

    const job = await Job.create({
      user: req.user._id,
      companyName,
      jobTitle,
      jobUrl,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
        user: req.user._id,
    }).sort({createdAt: -1,});

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
        _id: id,
        user: req.user._id,
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJobStatus = async (req, res) => {
    try {
      const { id } = req.body;

      const { status } = req.body;

      const job =
        await Job.findOne({
          _id: id,
          user: req.user._id,
        });

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      job.status = status;

      await job.save();

      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  };

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
        _id: id,
        user: req.user._id,
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    const stats = {
      total: jobs.length,
      saved: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    jobs.forEach((job) => {
      if (stats[job.status] !== undefined) {
        stats[job.status]++;
      }
    });

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
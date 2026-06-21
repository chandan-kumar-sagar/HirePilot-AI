import NodeCache from "node-cache";
import InterviewSession from "../models/InterviewSession.model.js";
import InterviewAnswer from "../models/InterviewAnswer.model.js";
import {
  generateQuestions,
  evaluateAnswer,
  generateFinalSummary,
} from "../services/ai/mockInterview.service.js";

// ─── Session Cache (short TTL for active sessions) ─────────────────────────────
const sessionCache = new NodeCache({ stdTTL: 3600 }); // 1 hour

// ─── Helpers ───────────────────────────────────────────────────────────────────
const getBadge = (score) => {
  if (score >= 80) return "gold";
  if (score >= 60) return "silver";
  return "bronze";
};

// ─── Start Session ─────────────────────────────────────────────────────────────
export const startSession = async (req, res) => {
  try {
    const { category, difficulty = "intermediate", totalQuestions = 5 } = req.body;

    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required." });
    }

    // Generate or fetch cached questions
    const questions = await generateQuestions({ category, difficulty, totalQuestions });

    // Create a new session
    const session = await InterviewSession.create({
      user: req.user._id,
      category,
      difficulty,
      questions,
      totalQuestions: questions.length,
      currentQuestionIndex: 0,
      status: "in-progress",
    });

    // Cache session metadata for fast subsequent reads
    sessionCache.set(`session_${session._id}`, session.toObject());

    return res.status(201).json({
      success: true,
      message: "Interview session started.",
      data: {
        sessionId: session._id,
        category: session.category,
        difficulty: session.difficulty,
        totalQuestions: session.totalQuestions,
        currentQuestionIndex: 0,
        question: questions[0],
      },
    });
  } catch (error) {
    console.error("[mockInterview] startSession error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Submit Answer ─────────────────────────────────────────────────────────────
export const submitAnswer = async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer?.trim()) {
      return res.status(400).json({ success: false, message: "sessionId and answer are required." });
    }

    // Fetch session (cache-first)
    let session = sessionCache.get(`session_${sessionId}`);
    if (!session) {
      session = await InterviewSession.findOne({ _id: sessionId, user: req.user._id });
      if (!session) {
        return res.status(404).json({ success: false, message: "Session not found." });
      }
      session = session.toObject();
    }

    if (session.status === "completed") {
      return res.status(400).json({ success: false, message: "Session is already completed." });
    }

    const questionIndex = session.currentQuestionIndex;
    const question = session.questions[questionIndex];

    // Evaluate the answer with AI
    const evaluation = await evaluateAnswer({ question, answer, category: session.category });

    // Save the answer + feedback
    const savedAnswer = await InterviewAnswer.create({
      session: sessionId,
      question,
      answer,
      feedback: evaluation.feedback,
      improvements: evaluation.improvements || [],
      scores: evaluation.scores,
      questionIndex,
    });

    // Advance to next question
    const nextIndex = questionIndex + 1;
    const isLastQuestion = nextIndex >= session.totalQuestions;
    const nextQuestion = isLastQuestion ? null : session.questions[nextIndex];

    // Update session in DB
    await InterviewSession.findByIdAndUpdate(sessionId, {
      currentQuestionIndex: nextIndex,
      ...(isLastQuestion && { status: "in-progress" }), // kept in-progress until /finish is called
    });

    // Invalidate cache
    sessionCache.del(`session_${sessionId}`);

    return res.status(200).json({
      success: true,
      data: {
        feedback: evaluation.feedback,
        improvements: evaluation.improvements || [],
        scores: evaluation.scores,
        answerId: savedAnswer._id,
        nextQuestion,
        nextQuestionIndex: nextIndex,
        isLastQuestion,
      },
    });
  } catch (error) {
    console.error("[mockInterview] submitAnswer error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Finish Session ────────────────────────────────────────────────────────────
export const finishSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "sessionId is required." });
    }

    const session = await InterviewSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found." });
    }

    // Fetch all answers for this session
    const answers = await InterviewAnswer.find({ session: sessionId }).sort({ questionIndex: 1 });

    if (answers.length === 0) {
      return res.status(400).json({ success: false, message: "No answers submitted yet." });
    }

    // Calculate overall score
    const avgScore =
      answers.reduce((sum, a) => sum + (a.scores?.overall || 0), 0) / answers.length;
    const overallScore = Math.round(avgScore * 10); // Convert 1-10 to 0-100

    const badge = getBadge(overallScore);

    // Generate AI-powered strengths/weaknesses
    const summary = await generateFinalSummary({
      category: session.category,
      difficulty: session.difficulty,
      answersData: answers,
      overallScore: avgScore,
    });

    // Update session to completed
    const updatedSession = await InterviewSession.findByIdAndUpdate(
      sessionId,
      {
        status: "completed",
        overallScore,
        badge,
        strengths: summary.strengths || [],
        weaknesses: summary.weaknesses || [],
        completedAt: new Date(),
      },
      { new: true }
    );

    // Clear from cache
    sessionCache.del(`session_${sessionId}`);

    return res.status(200).json({
      success: true,
      data: {
        sessionId,
        overallScore,
        badge,
        strengths: summary.strengths || [],
        weaknesses: summary.weaknesses || [],
        summary: summary.summary || "",
        totalAnswered: answers.length,
        answers: answers.map((a) => ({
          question: a.question,
          answer: a.answer,
          feedback: a.feedback,
          scores: a.scores,
        })),
      },
    });
  } catch (error) {
    console.error("[mockInterview] finishSession error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Session History ───────────────────────────────────────────────────────
export const getSessionHistory = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-questions"); // Don't send the full question array in lists

    return res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.error("[mockInterview] getSessionHistory error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Session Details ───────────────────────────────────────────────────────
export const getSessionDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Check cache first
    let session = sessionCache.get(`session_detail_${id}`);
    if (!session) {
      session = await InterviewSession.findOne({ _id: id, user: req.user._id });
      if (!session) {
        return res.status(404).json({ success: false, message: "Session not found." });
      }

      const answers = await InterviewAnswer.find({ session: id }).sort({ questionIndex: 1 });
      session = { ...session.toObject(), answers };
      sessionCache.set(`session_detail_${id}`, session, 1800); // 30 min cache
    }

    return res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.error("[mockInterview] getSessionDetails error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

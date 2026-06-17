import { motion } from "framer-motion";

export default function DashboardHero({ stats, userName }) {
  const firstName = userName?.split(" ")[0] || "there";
  const applied = stats?.applications || 0;
  const coverLetters = stats?.coverLetters || 0;
  const interviews = stats?.interviews || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg"
    >
      <div className="relative z-10 max-w-3xl">
        <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
          Mission Control
        </p>
        <h1 className="text-3xl sm:text-4xl font-black mb-4">
          Welcome Back 👋 {firstName}
        </h1>
        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium">
          You have applied to{" "}
          <span className="font-black bg-white/20 px-2 py-0.5 rounded-lg">
            {applied} jobs
          </span>
          , generated{" "}
          <span className="font-black bg-white/20 px-2 py-0.5 rounded-lg">
            {coverLetters} cover letters
          </span>
          , and completed{" "}
          <span className="font-black bg-white/20 px-2 py-0.5 rounded-lg">
            {interviews} interview preparations
          </span>
          .
        </p>
      </div>

      {/* Decorative circles */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-20 right-20 w-60 h-60 bg-yellow-300 opacity-20 rounded-full blur-3xl mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 right-8 opacity-30 text-8xl pointer-events-none select-none">
        🚀
      </div>
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className="hero min-h-screen place-items-center bg-gradient-to-b from-base-200 to-base-100"
      style={{
        backgroundImage: "url(/images/hero-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-black/40"></div>

      <motion.div
        className="text-center text-neutral-content max-w-2xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.div variants={titleVariants}>
          <h1 className="mb-2 text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-red-200 bg-clip-text text-transparent drop-shadow-lg">
            🌟 Happy Farewell Yushen! 🌟
          </h1>
        </motion.div>

        {/* Subtitle with Character Traits */}
        <motion.div variants={itemVariants} className="my-6">
          <div className="divider divider-warning my-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            You are a great...
          </h2>
          <motion.div
            className="flex flex-wrap gap-2 justify-center mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {["Colleague", "Friend", "Leader", "Mentor"].map((trait, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
              >
                <span className="badge badge-lg badge-primary gap-2">
                  {trait === "Colleague" && "👥"}
                  {trait === "Friend" && "🤝"}
                  {trait === "Leader" && "🎯"}
                  {trait === "Mentor" && "📚"}
                  {trait}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <div className="divider divider-warning my-4"></div>
        </motion.div>

        {/* Main Message */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md"
        >
          We will miss you dearly, Yushen! Your impact on our team and the
          memories we've shared will always be cherished. Wishing you all the
          best in your future endeavors! Your dedication, hard work, and
          positive attitude have made a lasting impression on us all. We will
          miss your presence during our daily interactions and the joy you
          brought to our team.
        </motion.p>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: "💡", label: "Ideas Shared" },
            { icon: "👏", label: "Support Given" },
            { icon: "🎉", label: "Moments Shared" },
            { icon: "💪", label: "Growth Inspired" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat bg-base-300 bg-opacity-70 backdrop-blur rounded-lg p-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-title text-base-content">{stat.icon}</div>
              <div className="stat-value text-primary text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/ai-gallery"
              className="btn btn-primary btn-lg gap-2 shadow-lg"
            >
              <span>🖼️</span>
              View Gallery
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/what-we-feel"
              className="btn btn-secondary btn-lg gap-2 shadow-lg"
            >
              <span>💭</span>
              How do we feel
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Divider */}
        <motion.div variants={itemVariants} className="mt-6">
          <p className="text-sm md:text-base opacity-90">
            ✨ Wishing you an amazing journey ahead! ✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

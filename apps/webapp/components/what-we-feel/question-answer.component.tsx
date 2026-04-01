"use client";

import { Schema } from "@/data-schema";
import { motion } from "motion/react";

type Props = {
  item: Schema["Questionaire"]["type"];
};

export default function QuestionAnswer(props: Props) {
  const { item } = props;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="question-answer mb-5 rounded-2xl bg-linear-to-br from-primary/75 via-secondary/70 to-accent/75 p-px shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="card h-full rounded-[15px] bg-base-100">
        <div className="card-body gap-3">
          <div className="badge badge-outline badge-primary w-fit">
            Question
          </div>
          <h3 className="question-answer-question card-title text-base leading-snug md:text-lg">
            {item.question}
          </h3>
          <div className="divider my-0" />
          <p className="question-answer-answer whitespace-pre-wrap leading-relaxed text-base-content/90">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

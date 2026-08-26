import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Mode = "message" | "delegate";

const modes: Record<Mode, { title: string; explanation: string }> = {
  message: {
    title: "Two existing executions communicate",
    explanation: "The message travels between people who already exist.",
  },
  delegate: {
    title: "A new execution is created",
    explanation: "The delegated task creates a separate worker for tracked work.",
  },
};

function Person({ label, accent }: { label: string; accent: "dark" | "teal" | "purple" }) {
  return (
    <div className={`person person-${accent}`}>
      <span className="person-head" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("message");
  const current = modes[mode];

  return (
    <main className="visualizer" aria-labelledby="question">
      <header className="question">
        <p className="eyebrow">One question · replace this example</p>
        <h1 id="question">How does communication differ from delegation?</h1>
        <p>Choose one action and watch only the important relationship change.</p>
      </header>

      <div className="choices" role="group" aria-label="Choose an orchestration model">
        {(Object.keys(modes) as Mode[]).map((candidate) => (
          <button
            className={candidate === mode ? "choice is-active" : "choice"}
            key={candidate}
            onClick={() => setMode(candidate)}
            type="button"
          >
            {candidate === "message" ? "Send message" : "Delegate task"}
          </button>
        ))}
      </div>

      <section className="canvas" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            className="scene"
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="actors">
              <Person accent="dark" label="Planner" />
              <motion.div
                className={mode === "message" ? "connection message-line" : "connection task-line"}
                animate={{ scaleX: [0.55, 1, 0.55] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <span>{mode === "message" ? "message" : "task"}</span>
              </motion.div>
              <Person accent={mode === "message" ? "teal" : "purple"} label={mode === "message" ? "Reviewer" : "New worker"} />
            </div>
            <h2>{current.title}</h2>
            <p>{current.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <p className="boundary">Illustrative model only. Replace this example with one focused requirement question.</p>
    </main>
  );
}

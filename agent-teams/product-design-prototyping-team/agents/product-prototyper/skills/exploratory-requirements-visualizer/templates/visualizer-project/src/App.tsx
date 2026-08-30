import { motion, useReducedMotion } from "motion/react";
import { useState, type AnimationEvent } from "react";

type Mode = "message" | "delegate";
type Phase = "idle" | "traveling" | "complete";

const modes: Record<Mode, { title: string; explanation: string; consequence: string }> = {
  message: {
    title: "An existing execution receives information",
    explanation: "The message travels between two people who already exist.",
    consequence: "The reviewer receives the message; no new execution is created.",
  },
  delegate: {
    title: "A separate execution is created",
    explanation: "The delegated task travels to a newly created worker.",
    consequence: "The new worker owns the tracked task independently.",
  },
};

function Person({ label, accent, active = false }: { label: string; accent: "dark" | "teal" | "purple"; active?: boolean }) {
  return (
    <div className={`person person-${accent}${active ? " is-active" : ""}`}>
      <span className="person-head" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("message");
  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const current = modes[mode];
  const isTraveling = phase === "traveling";

  const startSequence = () => {
    setRunId((value) => value + 1);
    setPaused(false);
    setPhase(prefersReducedMotion ? "complete" : "traveling");
  };

  const reset = () => {
    setRunId((value) => value + 1);
    setPaused(false);
    setPhase("idle");
  };

  const chooseMode = (candidate: Mode) => {
    setMode(candidate);
    reset();
  };

  const handleTokenAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "token-travel") {
      setPhase("complete");
      setPaused(false);
    }
  };

  const phaseLabel =
    phase === "idle"
      ? "Ready: choose Play to see the causal sequence."
      : phase === "traveling"
        ? paused
          ? "Paused: inspect the relationship, then resume when ready."
          : "In motion: watch the action leave, travel, and arrive."
        : "Complete: the consequence remains visible for review.";

  const receiver =
    mode === "message" ? (
      <Person active={phase === "complete"} accent="teal" label="Reviewer" />
    ) : phase === "idle" ? (
      <div className="person person-placeholder">
        <span className="placeholder-head" aria-hidden="true">?</span>
        <span>No worker yet</span>
      </div>
    ) : (
      <Person active={phase === "complete"} accent="purple" label="New worker" />
    );

  return (
    <main className="visualizer" aria-labelledby="question">
      <header className="question">
        <p className="eyebrow">Small example · replace with one focused question</p>
        <h1 id="question">How does communication differ from delegation?</h1>
        <p>Choose one relationship, then play it at a teaching pace.</p>
      </header>

      <div className="choices" role="group" aria-label="Choose an orchestration model">
        {(Object.keys(modes) as Mode[]).map((candidate) => (
          <button
            className={candidate === mode ? "choice is-active" : "choice"}
            key={candidate}
            onClick={() => chooseMode(candidate)}
            type="button"
          >
            {candidate === "message" ? "Send message" : "Delegate task"}
          </button>
        ))}
      </div>

      <section className="canvas" aria-live="polite">
        <div className="actors">
          <Person accent="dark" label="Planner" />
          <div className="lane" aria-hidden="true">
            <span className="lane-arrow">→</span>
            {phase !== "idle" && (
              <div
                className={`token token-${mode} ${isTraveling ? "is-traveling" : "is-arrived"}${paused ? " is-paused" : ""}${slow ? " is-slow" : ""}`}
                key={`${mode}-${runId}`}
                onAnimationEnd={handleTokenAnimationEnd}
              >
                {mode === "message" ? "message" : "task"}
              </div>
            )}
          </div>
          {receiver}
        </div>

        <div className="state-copy">
          <p className="phase-label">{phaseLabel}</p>
          <h2>{current.title}</h2>
          <motion.p
            animate={{ opacity: phase === "complete" ? 1 : 0.72, y: phase === "complete" ? 0 : 4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            {phase === "complete" ? current.consequence : current.explanation}
          </motion.p>
        </div>
      </section>

      <div className="controls" aria-label="Animation controls">
        <button className="control control-primary" onClick={() => (isTraveling ? setPaused((value) => !value) : startSequence())} type="button">
          {isTraveling ? (paused ? "Resume" : "Pause") : phase === "complete" ? "Replay sequence" : "Play sequence"}
        </button>
        <button className="control" disabled={!isTraveling} onClick={() => setSlow((value) => !value)} type="button">
          {slow ? "Normal pace" : "Slow pace"}
        </button>
        <button className="control" disabled={!isTraveling} onClick={() => { setPhase("complete"); setPaused(false); }} type="button">
          Skip motion
        </button>
        <button className="control" onClick={reset} type="button">
          Reset
        </button>
      </div>

      <p className="boundary">Illustrative model only. Replace this example with one focused requirement question.</p>
    </main>
  );
}

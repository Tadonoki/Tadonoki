"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Trophy, Play, CheckCircle2, RotateCcw, AlertTriangle, Terminal, RefreshCw } from "lucide-react";

export default function DataPlayground() {
  const [activeGame, setActiveGame] = useState<"cleaner" | "quiz">("cleaner");
  
  // Game 1: Data Cleaner States
  const [cleanerStarted, setCleanerStarted] = useState(false);
  const [cleanerScore, setCleanerScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [outliers, setOutliers] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const cleanerAreaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Game 2: Quiz States
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      q: "Which SQL clause is used to filter aggregated data resulting from a GROUP BY?",
      options: ["WHERE", "HAVING", "FILTER", "LIMIT"],
      answer: 1,
      explain: "HAVING is used to filter rows after grouping, whereas WHERE is used to filter rows before grouping.",
    },
    {
      q: "In Pandas, which method is most commonly used to fill missing (NaN) values?",
      options: ["dropna()", "fillna()", "replace()", "interpolate()"],
      answer: 1,
      explain: "fillna() fills NaN/missing values with a specified value or method, while dropna() removes them.",
    },
    {
      q: "What statistical measure represents the middle value in a sorted data set?",
      options: ["Mean", "Median", "Mode", "Variance"],
      answer: 1,
      explain: "The Median represents the exact center value of a sorted list of data numbers.",
    }
  ];

  // 1. Data Cleaner Logic
  useEffect(() => {
    if (!cleanerStarted) return;
    if (timeLeft <= 0) {
      setCleanerStarted(false);
      setOutliers([]);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cleanerStarted, timeLeft]);

  // Outlier spawner
  useEffect(() => {
    if (!cleanerStarted) return;

    const spawnInterval = setInterval(() => {
      if (!cleanerAreaRef.current) return;
      const rect = cleanerAreaRef.current.getBoundingClientRect();
      const x = Math.random() * (rect.width - 40) + 10;
      const y = Math.random() * (rect.height - 40) + 10;
      const size = Math.random() * 15 + 15; // 15px to 30px
      const id = nextId.current++;

      setOutliers((prev) => [...prev, { id, x, y, size }]);

      // Auto-remove outlier after 1.8 seconds if not clicked
      setTimeout(() => {
        setOutliers((prev) => prev.filter((o) => o.id !== id));
      }, 1800);

    }, 600);

    return () => clearInterval(spawnInterval);
  }, [cleanerStarted]);

  const handleCleanOutlier = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // GSAP pop animation on the clicked item
    const target = e.currentTarget;
    gsap.to(target, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setOutliers((prev) => prev.filter((o) => o.id !== id));
        setCleanerScore((prev) => prev + 10);
      }
    });
  };

  const startCleanerGame = () => {
    setCleanerScore(0);
    setTimeLeft(15);
    setOutliers([]);
    setCleanerStarted(true);
  };

  // 2. Quiz Logic
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].answer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <section className="py-20 relative overflow-hidden border-y border-navy-800/40" style={{ backgroundColor: "#02040a" }}>
      {/* Dynamic separator glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[150px] bg-cyber-cyan/3 rounded-full blur-[100px] pointer-events-none select-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Separator Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-[10px] font-bold tracking-widest uppercase mb-4">
          <Terminal size={12} className="animate-pulse" />
          Interactive Analyst Playground
        </div>
        
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-text-primary tracking-tight">
          Take a Quick Break!
        </h2>
        <p className="text-sm text-text-muted mt-2 max-w-lg mx-auto">
          Test your data skills or clear anomalies in these lightweight mini-games designed for data enthusiasts.
        </p>

        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mt-8 mb-10">
          <button
            onClick={() => setActiveGame("cleaner")}
            className={`px-4 py-2 rounded text-xs font-bold font-heading uppercase tracking-wider transition-all duration-300 border ${
              activeGame === "cleaner"
                ? "bg-cyber-cyan text-navy-950 border-cyber-cyan shadow-md shadow-cyber-cyan/10"
                : "bg-navy-900/60 text-text-secondary border-navy-800 hover:text-cyber-cyan"
            }`}
          >
            🧹 Data Outlier Cleaner
          </button>
          <button
            onClick={() => setActiveGame("quiz")}
            className={`px-4 py-2 rounded text-xs font-bold font-heading uppercase tracking-wider transition-all duration-300 border ${
              activeGame === "quiz"
                ? "bg-cyber-cyan text-navy-950 border-cyber-cyan shadow-md shadow-cyber-cyan/10"
                : "bg-navy-900/60 text-text-secondary border-navy-800 hover:text-cyber-cyan"
            }`}
          >
            📊 Analyst Trivia Quiz
          </button>
        </div>

        {/* Game Content Box */}
        <div className="glass-card rounded-xl border border-navy-800/80 bg-navy-900/20 p-6 md:p-8 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
          
          {/* GAME 1: OUTLIER CLEANER */}
          {activeGame === "cleaner" && (
            <div className="w-full h-full flex flex-col justify-between flex-grow">
              {!cleanerStarted ? (
                <div className="my-auto py-6 flex flex-col items-center">
                  <AlertTriangle className="text-cyber-cyan animate-bounce mb-4" size={42} />
                  <h3 className="text-lg font-bold text-text-primary font-heading">
                    Data Outlier Cleaner
                  </h3>
                  <p className="text-xs text-text-muted mt-2 max-w-md">
                    Anomaly Alert! Red outlier data points are corrupting the dataset. Click/tap them as fast as possible to clean the database before time runs out.
                  </p>
                  
                  {cleanerScore > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-cyber-cyan font-heading font-extrabold text-sm">
                      <Trophy size={16} />
                      Last Database Cleaned Score: {cleanerScore} pts!
                    </div>
                  )}

                  <button
                    onClick={startCleanerGame}
                    className="mt-6 px-6 py-2.5 bg-cyber-cyan hover:bg-cyber-cyan/90 text-navy-950 font-bold rounded flex items-center gap-2 text-xs tracking-wider uppercase font-heading transition-all shadow-md shadow-cyber-cyan/10"
                  >
                    <Play size={14} />
                    Start Cleaning
                  </button>
                </div>
              ) : (
                <div className="flex-grow flex flex-col justify-between">
                  {/* Game Info Row */}
                  <div className="flex justify-between items-center pb-4 border-b border-navy-800/50 mb-4 font-mono text-xs">
                    <div className="text-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      ACTIVE SYSTEM OUTLIERS: {outliers.length}
                    </div>
                    <div className="text-cyber-cyan font-bold">
                      SCORE: {cleanerScore} pts
                    </div>
                    <div className="text-amber-500 font-bold">
                      TIME LEFT: {timeLeft}s
                    </div>
                  </div>

                  {/* Clicking Arena */}
                  <div
                    ref={cleanerAreaRef}
                    className="relative flex-grow min-h-[220px] bg-navy-950/80 rounded-lg border border-navy-900 overflow-hidden cursor-crosshair"
                  >
                    {/* Simulated regression curve */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-cyber-cyan/10 pointer-events-none"></div>
                    <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-cyber-cyan/5 border-dashed pointer-events-none"></div>
                    
                    {/* Fake Normal scatter points */}
                    <div className="absolute top-[48%] left-[10%] w-2 h-2 rounded-full bg-cyber-cyan/20 pointer-events-none"></div>
                    <div className="absolute top-[52%] left-[25%] w-2 h-2 rounded-full bg-cyber-cyan/25 pointer-events-none"></div>
                    <div className="absolute top-[49%] left-[45%] w-2.5 h-2.5 rounded-full bg-cyber-cyan/20 pointer-events-none"></div>
                    <div className="absolute top-[51%] left-[65%] w-2 h-2 rounded-full bg-cyber-cyan/30 pointer-events-none"></div>
                    <div className="absolute top-[47%] left-[85%] w-2 h-2 rounded-full bg-cyber-cyan/20 pointer-events-none"></div>

                    {/* Active Outliers */}
                    {outliers.map((o) => (
                      <button
                        key={o.id}
                        onClick={(e) => handleCleanOutlier(o.id, e)}
                        className="absolute rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center animate-ping"
                        style={{
                          left: `${o.x}px`,
                          top: `${o.y}px`,
                          width: `${o.size}px`,
                          height: `${o.size}px`,
                          boxShadow: "0 0 12px rgba(239, 68, 68, 0.6)",
                          animationDuration: "1.5s",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </button>
                    ))}
                  </div>
                  <div className="text-[10px] text-text-muted mt-2">
                    Tip: Quickly tap the blinking red circles to clean the data pipelines.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: ANALYST QUIZ */}
          {activeGame === "quiz" && (
            <div className="w-full h-full flex flex-col justify-between flex-grow">
              {!quizFinished ? (
                <div className="flex-grow flex flex-col justify-between text-left">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-navy-800/50 mb-4 font-mono text-xs">
                    <span className="text-text-secondary uppercase">
                      SQL / Python System Assessment
                    </span>
                    <span className="text-cyber-cyan">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-sm md:text-base font-bold text-text-primary font-heading mb-6">
                    {quizQuestions[currentQuestion].q}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {quizQuestions[currentQuestion].options.map((option, idx) => {
                      let btnStyle = "bg-navy-950 border-navy-800 text-text-secondary hover:border-cyber-cyan/35";
                      if (selectedAnswer !== null) {
                        if (idx === quizQuestions[currentQuestion].answer) {
                          btnStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-400";
                        } else if (idx === selectedAnswer) {
                          btnStyle = "bg-red-950/40 border-red-500/50 text-red-400";
                        } else {
                          btnStyle = "bg-navy-950/30 border-navy-900/55 text-text-muted opacity-55";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswerClick(idx)}
                          className={`p-3 rounded text-xs font-mono font-medium border text-left transition-all duration-300 ${btnStyle}`}
                        >
                          {String.fromCharCode(65 + idx)}. {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  {showExplanation && (
                    <div className="p-4 rounded-lg bg-navy-950 border border-navy-850 mb-4 animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase font-heading mb-1 text-cyber-cyan">
                        <CheckCircle2 size={12} />
                        Data System Insight:
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {quizQuestions[currentQuestion].explain}
                      </p>
                    </div>
                  )}

                  {/* Footer Toggler */}
                  {selectedAnswer !== null && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 bg-cyber-cyan hover:bg-cyber-cyan/95 text-navy-950 font-bold rounded text-xs tracking-wider uppercase font-heading transition-all"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? "Next Query" : "Show Results"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="my-auto py-6 flex flex-col items-center text-center">
                  <Trophy className="text-cyber-cyan animate-bounce mb-4" size={42} />
                  <h3 className="text-lg font-bold text-text-primary font-heading">
                    Assessment Evaluation Complete
                  </h3>
                  <p className="text-xs text-text-muted mt-2 max-w-sm">
                    You scored {quizScore} out of {quizQuestions.length} queries! Excellent analytical capabilities.
                  </p>

                  <div className="mt-4 text-xs font-mono font-bold text-cyber-cyan">
                    Accuracy Rating: {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="mt-6 px-5 py-2.5 bg-navy-900 border border-navy-800 hover:border-cyber-cyan text-text-primary hover:text-cyber-cyan font-bold rounded flex items-center gap-2 text-xs tracking-wider uppercase font-heading transition-all"
                  >
                    <RotateCcw size={13} />
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

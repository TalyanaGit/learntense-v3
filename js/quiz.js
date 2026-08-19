/**
 * LearnTense v3 — Quiz session engine, option shuffler & dynamic game generator
 */
import { QUESTIONS, TENSES } from "./data.js";
import { storage } from "./storage.js";

const VERBS = [
  ["go", "goes", "to school"], ["watch", "watches", "TV"], ["study", "studies", "English"],
  ["play", "plays", "football"], ["wash", "washes", "the dishes"], ["read", "reads", "books"],
  ["cook", "cooks", "dinner"], ["teach", "teaches", "maths"], ["fix", "fixes", "bicycles"],
  ["carry", "carries", "a bag"], ["try", "tries", "new recipes"], ["brush", "brushes", "their teeth"],
  ["miss", "misses", "the bus"], ["pass", "passes", "the shop"], ["do", "does", "homework"]
];
const SUBJECTS = ["I", "You", "We", "They", "He", "She", "Ravi", "Maya", "The children", "My parents"];
const TIMES = ["every day", "every morning", "on Sundays", "after school", "at night", "usually", "often"];

function isSingularSubject(s) {
  return /^(He|She|It|Ravi|Maya)$/.test(s);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeShuffledMC(prompt, correctOption, distractors, explanation, difficulty = 1) {
  const uniqueDistractors = [...new Set(distractors.filter(d => d !== correctOption))].slice(0, 3);
  const options = shuffle([correctOption, ...uniqueDistractors]);
  const answer = options.indexOf(correctOption);
  return {
    type: "mc",
    difficulty,
    prompt,
    options,
    answer,
    explanation
  };
}

/** Generate 25 randomized Simple Present questions for a game level */
export function generateSPGame(gameId) {
  const out = [];
  const difficulty = gameId <= 3 ? 1 : gameId <= 6 ? 2 : 3;

  const shuffledVerbs = shuffle(VERBS);
  const shuffledSubjects = shuffle(SUBJECTS);
  const shuffledTimes = shuffle(TIMES);

  for (let i = 0; i < 5; i++) {
    const [base, third, obj] = shuffledVerbs[i % shuffledVerbs.length];
    const sub = shuffledSubjects[i % shuffledSubjects.length];
    const is3 = isSingularSubject(sub);
    const correctVerb = is3 ? third : base;
    const wrongVerb = is3 ? base : third;
    const time = shuffledTimes[i % shuffledTimes.length];

    // 1. Fill-in-blank MC
    out.push(makeShuffledMC(
      `${sub} ___ ${obj} ${time}.`,
      correctVerb,
      [wrongVerb, base + "ing", base + "ed", is3 ? base + "en" : third + "s"],
      `With “${sub}” use ${is3 ? "the third-person form (-s/-es)" : "the base form"}: ${correctVerb}.`,
      difficulty
    ));

    // 2. Correct sentence MC
    const goodSentence = `${sub} ${correctVerb} ${obj} ${time}.`;
    const badSentence1 = `${sub} ${wrongVerb} ${obj} ${time}.`;
    const badSentence2 = `${sub} ${base}ing ${obj} ${time}.`;
    const badSentence3 = `${sub} ${base}ed ${obj} ${time}.`;
    out.push(makeShuffledMC(
      "Choose the correct sentence.",
      goodSentence,
      [badSentence1, badSentence2, badSentence3],
      `Subject–verb agreement: “${goodSentence}”.`,
      difficulty
    ));

    // 3. Question formation MC
    const qGood = is3 ? `Does ${sub} ${base} ${obj}?` : `Do ${sub} ${base} ${obj}?`;
    const qBad1 = is3 ? `Do ${sub} ${third} ${obj}?` : `Does ${sub} ${third} ${obj}?`;
    const qBad2 = is3 ? `Do ${sub} ${base} ${obj}?` : `Does ${sub} ${base} ${obj}?`;
    const qBad3 = `Is ${sub} ${base} ${obj}?`;
    out.push(makeShuffledMC(
      `Make a question from: “${sub} ${correctVerb} ${obj}.”`,
      qGood,
      [qBad1, qBad2, qBad3],
      `In questions, use ${is3 ? "does" : "do"} + base form (${base}).`,
      difficulty
    ));

    // 4. Negative sentence MC
    const negGood = is3 ? `${sub} does not ${base} ${obj} ${time}.` : `${sub} do not ${base} ${obj} ${time}.`;
    const negBad1 = is3 ? `${sub} do not ${third} ${obj} ${time}.` : `${sub} does not ${base} ${obj} ${time}.`;
    const negBad2 = `${sub} not ${correctVerb} ${obj} ${time}.`;
    const negBad3 = `${sub} no ${base} ${obj} ${time}.`;
    out.push(makeShuffledMC(
      "Choose the correct negative sentence.",
      negGood,
      [negBad1, negBad2, negBad3],
      `Negative rule: subject + ${is3 ? "does not" : "do not"} + base form.`,
      difficulty
    ));

    // 5. True / False item with a 50/50 balance
    const isActuallyTrue = (i % 2 === 0);
    const tfPrompt = isActuallyTrue
      ? `“${sub} ${correctVerb} ${obj} ${time}” is a correct Simple Present sentence.`
      : `“${sub} ${wrongVerb} ${obj} ${time}” is a correct Simple Present sentence.`;
    const tfExplanation = isActuallyTrue
      ? `Correct: “${sub}” pairs properly with “${correctVerb}”.`
      : `Incorrect: “${sub}” requires “${correctVerb}”, not “${wrongVerb}”.`;

    out.push({
      type: "tf",
      difficulty,
      prompt: tfPrompt,
      answer: isActuallyTrue,
      explanation: tfExplanation
    });
  }

  return shuffle(out).map((q, i) => ({ ...q, id: `spg-${gameId}-${i}-${Date.now()}` }));
}

export const SP_GAMES_META = [
  { id: 1, level: "Easy",   icon: "🌱", title: "Starter" },
  { id: 2, level: "Easy",   icon: "⭐", title: "Builder" },
  { id: 3, level: "Easy",   icon: "📘", title: "Routine Master" },
  { id: 4, level: "Medium", icon: "🔥", title: "Third Person" },
  { id: 5, level: "Medium", icon: "⚡", title: "Do & Does" },
  { id: 6, level: "Medium", icon: "🎯", title: "Negatives" },
  { id: 7, level: "Hard",   icon: "🏆", title: "Mixed Practice" },
  { id: 8, level: "Hard",   icon: "💎", title: "Challenge" },
  { id: 9, level: "Hard",   icon: "🚀", title: "Advanced" },
  { id: 10,level: "Expert", icon: "👑", title: "Grand Master" }
];

export function createSession(tenseId, mode = "standard", gameId = null) {
  let questions = [];
  if (tenseId === 1 && mode === "game" && gameId) {
    questions = generateSPGame(gameId);
  } else {
    const pool = (QUESTIONS[tenseId] || []).map(q => {
      if (q.type === "mc" && Array.isArray(q.options)) {
        const correctText = q.options[q.answer];
        const shuffled = shuffle(q.options);
        return {
          ...q,
          options: shuffled,
          answer: shuffled.indexOf(correctText)
        };
      }
      return { ...q };
    });
    questions = shuffle(pool).slice(0, 12);
  }
  return {
    tenseId,
    mode,
    gameId,
    questions,
    index: 0,
    score: 0,
    answered: false,
    answers: []
  };
}

function normalizeAnswer(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”"]/g, '"')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function checkAnswer(session, selected) {
  const q = session.questions[session.index];
  if (q.type === "mc") {
    return Number(selected) === q.answer;
  }
  if (q.type === "tf") {
    return Boolean(selected) === Boolean(q.answer);
  }
  if (q.type === "fill" || q.type === "correct" || q.type === "neg") {
    const userNorm = normalizeAnswer(selected);
    const correctNorm = normalizeAnswer(q.answer);
    if (userNorm === correctNorm) return true;

    if (Array.isArray(q.alternates)) {
      return q.alternates.some(alt => normalizeAnswer(alt) === userNorm);
    }
  }
  return false;
}

export function recordResult(session, ok, selected) {
  session.answers.push({ correct: ok, selected });
  if (ok) session.score++;
  storage.updateTense(session.tenseId, ok);
  storage.touchStreak();

  const q = session.questions[session.index];
  const tense = TENSES.find(t => t.id === session.tenseId);
  const correctRepresentation = q.type === "mc"
    ? q.options[q.answer]
    : (q.answer === true ? "True" : q.answer === false ? "False" : String(q.answer));

  if (!ok) {
    storage.addMistake({
      tenseId: session.tenseId,
      tense: tense?.name || "Tense",
      prompt: q.prompt,
      correct: correctRepresentation,
      explanation: q.explanation || ""
    });
  }

  const allProgress = storage.getProgress();
  const totalAttempted = Object.values(allProgress).reduce((acc, p) => acc + (p.attempted || 0), 0);
  if (totalAttempted >= 1) storage.unlock("first_quiz");
  if (totalAttempted >= 50) storage.unlock("questions_50");
  if (totalAttempted >= 200) storage.unlock("questions_200");

  const masteredCount = Object.values(allProgress).filter(p => (p.mastery || 0) >= 90).length;
  if (masteredCount >= 1) storage.unlock("master_1");
  if (masteredCount >= 6) storage.unlock("master_6");
  if (masteredCount >= 12) storage.unlock("master_12");

  const streak = storage.getStreak().count;
  if (streak >= 3) storage.unlock("streak_3");
  if (streak >= 7) storage.unlock("streak_7");
}

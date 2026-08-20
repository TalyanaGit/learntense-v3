/**
 * LearnTense v3 — Local storage with EMA-based mastery & adaptive spaced repetition
 */
const KEYS = {
  progress: "lt3_progress",
  mistakes: "lt3_mistakes",
  streak: "lt3_streak",
  achievements: "lt3_achievements",
  settings: "lt3_settings",
  lastTense: "lt3_last_tense",
  spGames: "lt3_sp_games"
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getProgress() {
    return read(KEYS.progress, {});
  },
  setProgress(p) {
    write(KEYS.progress, p);
  },
  getTenseProgress(id) {
    const all = this.getProgress();
    return all[id] || { attempted: 0, correct: 0, mastery: 0, lastPracticed: null, nextReview: null };
  },
  updateTense(id, ok) {
    const all = this.getProgress();
    const p = all[id] || { attempted: 0, correct: 0, mastery: 0, consecutiveErrors: 0 };

    p.attempted += 1;
    if (ok) {
      p.correct += 1;
      p.consecutiveErrors = 0;
    } else {
      p.consecutiveErrors = (p.consecutiveErrors || 0) + 1;
    }

    // Exponential Moving Average (alpha = 0.2) for recency weighting
    const alpha = 0.2;
    const targetScore = ok ? 100 : 0;
    if (p.attempted === 1) {
      p.mastery = targetScore;
    } else {
      p.mastery = Math.round(alpha * targetScore + (1 - alpha) * p.mastery);
    }

    p.lastPracticed = new Date().toISOString();

    // Spaced repetition schedule based on overall mastery and error history
    let reviewDays = 1;
    if (p.mastery >= 90) {
      reviewDays = ok ? 7 : 3;
    } else if (p.mastery >= 70) {
      reviewDays = ok ? 3 : 1;
    } else {
      reviewDays = ok ? 1 : 0.5;
    }

    if (p.consecutiveErrors >= 2) {
      reviewDays = 0.5;
    }

    p.nextReview = new Date(Date.now() + reviewDays * 86400000).toISOString();
    all[id] = p;
    this.setProgress(all);
    return p;
  },

  getMistakes() {
    return read(KEYS.mistakes, []);
  },
  addMistake(m) {
    const list = this.getMistakes();
    list.unshift({ ...m, id: crypto.randomUUID(), createdAt: new Date().toISOString(), reviewed: false });
    write(KEYS.mistakes, list.slice(0, 80));
  },
  markReviewed(id) {
    const list = this.getMistakes().map(m => (m.id === id ? { ...m, reviewed: true } : m));
    write(KEYS.mistakes, list);
  },
  clearReviewed() {
    write(KEYS.mistakes, this.getMistakes().filter(m => !m.reviewed));
  },

  getStreak() {
    return read(KEYS.streak, { count: 0, lastDate: null });
  },
  touchStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const s = this.getStreak();
    if (s.lastDate === today) return s.count;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.lastDate === yesterday) {
      s.count += 1;
    } else {
      s.count = 1;
    }
    s.lastDate = today;
    write(KEYS.streak, s);
    return s.count;
  },

  getAchievements() {
    return read(KEYS.achievements, []);
  },
  unlock(key) {
    const list = this.getAchievements();
    if (list.includes(key)) return false;
    list.push(key);
    write(KEYS.achievements, list);
    return true;
  },

  getSettings() {
    return read(KEYS.settings, { theme: "light", sound: false });
  },
  setSetting(k, v) {
    const s = this.getSettings();
    s[k] = v;
    write(KEYS.settings, s);
  },

  getLastTense() {
    return Number(localStorage.getItem(KEYS.lastTense) || 1);
  },
  setLastTense(id) {
    localStorage.setItem(KEYS.lastTense, String(id));
  },

  getSPGames() {
    return read(KEYS.spGames, {});
  },
  saveSPGame(gameId, score) {
  const p = this.getSPGames();
  const prevBest = p[gameId]?.best || 0;
  const alreadyCompleted = p[gameId]?.completed || false;
  p[gameId] = {
    completed: alreadyCompleted || score >= 60,
    best: Math.max(score, prevBest)
  };
  write(KEYS.spGames, p);
}
};

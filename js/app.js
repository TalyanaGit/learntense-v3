/**
 * LearnTense v3 — Main application controller with Supabase Auth
 */
import { TENSES, LESSONS, ACHIEVEMENTS } from "./data.js";
import { storage } from "./storage.js";
import { createSession, checkAnswer, recordResult, SP_GAMES_META } from "./quiz.js";
import { supabase } from "./supabase.js";

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

let session = null;
let currentUser = { mode: "guest", email: null };

// ---------------- UTILITIES ----------------

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function typeLabel(t) {
  return { mc: "Multiple choice", tf: "True / False", fill: "Fill blank", correct: "Correction", neg: "Negative" }[t] || t;
}

function mastery(id) {
  return storage.getTenseProgress(id).mastery || 0;
}

function updateThemeUI(isDark) {
  const icon = $("themeIcon");
  const label = $("themeLabel");
  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
}

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.screen === id));
  $$(".mob-nav-btn").forEach(b => b.classList.toggle("active", b.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "review") renderReview();
  if (id === "dashboard") renderDashboard();
  if (id === "library") renderLibrary();
}

function openApp(user) {
  $("auth").hidden = true;
  $("app").hidden = false;
  $("userLabel").textContent = user?.email || "Guest";
  renderDashboard();
  renderLibrary();
}

function showAuth() {
  $("auth").hidden = false;
  $("app").hidden = true;
}

async function loginAs(user) {
  currentUser = user;
  if (user.mode === "supabase" && user.id) {
    storage.setUser(user.id);
    await storage.pullCloudProgress(user.id);
  } else {
    storage.clearUser();
  }
  openApp(user);
}

// ---------------- RENDER VIEWS ----------------

function renderDashboard() {
  const progresses = TENSES.map(t => storage.getTenseProgress(t.id));
  const total = progresses.reduce((a, p) => a + p.attempted, 0);
  const correct = progresses.reduce((a, p) => a + p.correct, 0);
  const mastered = progresses.filter(p => p.mastery >= 90).length;
  const streak = storage.getStreak().count;

  $("accuracyStat").textContent = total ? Math.round((correct / total) * 100) + "%" : "—";
  $("answeredStat").textContent = total;
  $("masteredStat").textContent = `${mastered}/12`;
  $("streakStat").textContent = streak;

  const lastId = storage.getLastTense();
  const t = TENSES.find(x => x.id === lastId) || TENSES[0];
  const m = mastery(t.id);
  $("continueCard").innerHTML = `
    <div class="continue-main">
      <div>
        <span class="badge">${t.category}</span>
        <h2>${t.icon} ${t.name}</h2>
        <p class="muted">${t.short}</p>
      </div>
      <button class="primary" data-action="lesson" data-id="${t.id}">${m ? "Continue" : "Start"} →</button>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${m}%"></div></div>
    <small class="muted">${m}% mastery</small>`;

  $("progressList").innerHTML = TENSES.slice(0, 6).map(item => `
    <div class="progress-row">
      <div class="progress-row-head"><span>${item.icon} ${item.name}</span><span>${mastery(item.id)}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${mastery(item.id)}%"></div></div>
    </div>`).join("");

  const unlocked = storage.getAchievements();
  $("achievementsStrip").innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach ${unlocked.includes(a.key) ? "unlocked" : "locked"}" title="${a.desc}">
      <span>${a.icon}</span><small>${a.title}</small>
    </div>`).join("");

  const due = TENSES.filter(tItem => {
    const p = storage.getTenseProgress(tItem.id);
    return p.nextReview && new Date(p.nextReview) <= new Date();
  });
  $("dueReview").hidden = due.length === 0;
  if (due.length) {
    $("dueReview").innerHTML = `<p>⏰ <strong>${due.length}</strong> tense${due.length > 1 ? "s" : ""} due for review</p>
      <button class="secondary" data-action="weak">Practice weak areas</button>`;
  }
}

function renderLibrary() {
  $("tenseGrid").innerHTML = TENSES.map(t => {
    const m = mastery(t.id);
    return `
      <article class="tense-card" data-action="lesson" data-id="${t.id}">
        <span class="tense-icon">${t.icon}</span>
        <span class="badge">${t.category}</span>
        <h3>${t.name}</h3>
        <p>${t.short}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${m}%"></div></div>
        <small>${m}% mastery · Open →</small>
      </article>`;
  }).join("");
}

function startLesson(id) {
  const t = TENSES.find(x => x.id === id) || TENSES[0];
  const d = LESSONS[id];
  const m = mastery(id);
  storage.setLastTense(id);

  let gamesHtml = "";
  if (id === 1) {
    const prog = storage.getSPGames();
    gamesHtml = `
      <div class="sp-games">
        <h2>🎮 Progressive Games</h2>
        <p class="muted">10 games · 25 questions each · Unlock by completing the previous one</p>
        <div class="game-grid">
          ${SP_GAMES_META.map(g => {
            const unlocked = g.id === 1 || prog[g.id - 1]?.completed;
            const best = prog[g.id]?.best ?? "—";
            return `
              <button class="sp-game ${unlocked ? "" : "locked"}" ${unlocked ? `data-action="sp-game" data-id="${g.id}"` : "disabled"}>
                <span class="g-icon">${g.icon}</span>
                <div>
                  <strong>Game ${g.id}: ${g.title}</strong>
                  <small>${g.level} · Best ${best}%</small>
                  <em>${unlocked ? "Play →" : "🔒 Locked"}</em>
                </div>
              </button>`;
          }).join("")}
        </div>
      </div>`;
  }

  $("lessonCard").innerHTML = `
    <button class="back-btn" data-screen="library">← All tenses</button>
    <span class="badge">${t.category} Tense</span>
    <h1>${t.icon} ${t.name}</h1>
    <p class="muted">${t.short}</p>

    <div class="rule">
      <h2>📖 When to use it</h2>
      <ul>${d.when.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
      <p class="formula"><strong>Structure:</strong> ${escapeHtml(d.structure)}</p>
      <p><strong>Signal words:</strong> ${escapeHtml(d.signals)}</p>
    </div>

    <h2>💬 Examples</h2>
    ${d.examples.map(([sent, label]) => `
      <div class="example"><strong>${escapeHtml(label)}</strong><br>${escapeHtml(sent)}</div>`).join("")}

    <div class="rule">
      <h2>⚠️ Common mistakes</h2>
      ${d.mistakes.map(([bad, good]) => `
        <div class="example"><span class="bad">❌ ${escapeHtml(bad)}</span><br><strong>✅ ${escapeHtml(good)}</strong></div>`).join("")}
    </div>

    <div class="tip-box">💡 <strong>Tip:</strong> ${escapeHtml(d.tip)}</div>

    <div class="feedback">
      <strong>🎯 Your mastery: ${m}%</strong>
      <span class="muted">Practice to improve it.</span>
    </div>

    <button class="primary full" data-action="quiz" data-id="${id}">Start practice →</button>
    ${gamesHtml}`;

  showScreen("lesson");
}

function startQuiz(id, mode = "standard", gameId = null) {
  session = createSession(id, mode, gameId);
  if (!session.questions.length) {
    alert("No questions available for this tense yet.");
    return;
  }
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = session.questions[session.index];
  const tense = TENSES.find(t => t.id === session.tenseId);
  const total = session.questions.length;
  const pct = (session.index / total) * 100;

  let body = "";
  if (q.type === "mc") {
    body = q.options.map((o, i) =>
      `<button class="option" data-i="${i}">${String.fromCharCode(65 + i)}. ${escapeHtml(o)}</button>`
    ).join("");
  } else if (q.type === "tf") {
    body = `
      <div class="tf-row">
        <button class="option tf" data-v="true">True</button>
        <button class="option tf" data-v="false">False</button>
      </div>`;
  } else {
    body = `<input id="freeAnswer" class="answer-input" autocomplete="off" placeholder="Type your answer…">`;
  }

  $("quizCard").innerHTML = `
    <div class="quiz-top">
      <span>${tense.icon} ${tense.name}${session.mode === "game" ? ` · Game ${session.gameId}` : ""}</span>
      <span>${session.index + 1} / ${total}</span>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <span class="badge">${typeLabel(q.type)} · Lvl ${q.difficulty || 1}</span>
    <div class="question" role="heading" aria-level="2">${escapeHtml(q.prompt)}</div>
    <div class="options-area">${body}</div>
    <div id="feedback"></div>
    ${q.type !== "mc" && q.type !== "tf" ? `<button class="primary full" id="checkBtn">Check answer →</button>` : ""}`;

  $$("#quizCard .option").forEach(btn => {
    btn.onclick = () => {
      if (session.answered) return;
      let selected;
      if (q.type === "mc") selected = Number(btn.dataset.i);
      else selected = btn.dataset.v === "true";
      handleAnswer(selected);
    };
  });

  $("checkBtn")?.addEventListener("click", () => {
    if (session.answered) return;
    const val = $("freeAnswer")?.value;
    if (!val?.trim()) {
      $("feedback").innerHTML = `<div class="feedback warn">Please type an answer first.</div>`;
      return;
    }
    handleAnswer(val);
  });
}

function handleAnswer(selected) {
  session.answered = true;
  const q = session.questions[session.index];
  const ok = checkAnswer(session, selected);
  recordResult(session, ok, selected);

  if (q.type === "mc") {
    $$("#quizCard .option").forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correct");
      if (i === selected && !ok) b.classList.add("wrong");
    });
  } else if (q.type === "tf") {
    $$("#quizCard .option").forEach(b => {
      b.disabled = true;
      const isTrue = b.dataset.v === "true";
      if (isTrue === q.answer) b.classList.add("correct");
      if ((isTrue === selected) && !ok) b.classList.add("wrong");
    });
  }

  const correctText = q.type === "mc"
    ? q.options[q.answer]
    : (q.answer === true ? "True" : q.answer === false ? "False" : q.answer);

  $("feedback").innerHTML = `
    <div class="feedback ${ok ? "ok" : "no"}">
      <strong>${ok ? "✅ Correct!" : "❌ Not quite"}</strong>
      ${!ok ? `<p>Correct answer: <strong>${escapeHtml(String(correctText))}</strong></p>` : ""}
      <p>${escapeHtml(q.explanation || "")}</p>
      <button class="primary full" id="nextBtn">${session.index + 1 < session.questions.length ? "Next →" : "See results →"}</button>
    </div>`;
  $("nextBtn").onclick = nextQuestion;
  $("checkBtn")?.setAttribute("disabled", "true");
}

function nextQuestion() {
  if (session.index + 1 < session.questions.length) {
    session.index++;
    session.answered = false;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const total = session.questions.length;
  const pct = Math.round((session.score / total) * 100);
  const tense = TENSES.find(t => t.id === session.tenseId);

  if (session.mode === "game" && session.gameId) {
    storage.saveSPGame(session.gameId, pct);
  }

  $("resultCard").innerHTML = `
    <div class="score-circle ${pct >= 80 ? "great" : pct >= 50 ? "ok" : "low"}">
      <span>${pct}%</span>
    </div>
    <h1>${pct >= 80 ? "🎉 Excellent!" : pct >= 50 ? "💪 Good effort!" : "📖 Keep practising"}</h1>
    <p class="muted">You got <strong>${session.score}</strong> of <strong>${total}</strong> correct on ${tense.name}.</p>
    <div class="progress-track big"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="result-actions">
<button class="primary" data-action="quiz" data-id="${session.tenseId}" data-mode="${session.mode}" ${session.gameId ? `data-game="${session.gameId}"` : ""}>🔄 Try again</button>
${session.mode === "game" ? `<button class="secondary" data-action="lesson" data-id="1">← Games</button>` : ""}
<button class="secondary" data-screen="dashboard">📊 Dashboard</button>
</div>`;
  showScreen("result");
  renderDashboard();
}

function renderReview() {
  const list = storage.getMistakes().filter(m => !m.reviewed);
  if (!list.length) {
    $("reviewContent").innerHTML = `
      <article class="panel empty">
        <h2>🎉 No mistakes to review</h2>
        <p class="muted">Keep practising — missed questions will appear here for targeted revision.</p>
      </article>`;
    return;
  }
  $("reviewContent").innerHTML = list.map(m => `
    <article class="review-item">
      <span class="badge">${escapeHtml(m.tense)}</span>
      <h3>${escapeHtml(m.prompt)}</h3>
      <p class="muted">Correct: <strong>${escapeHtml(String(m.correct))}</strong></p>
      ${m.explanation ? `<p class="muted">💡 ${escapeHtml(m.explanation)}</p>` : ""}
      <div class="review-actions">
        <button class="secondary" data-action="lesson" data-id="${m.tenseId}">📖 Review tense</button>
        <button class="secondary" data-action="mark-reviewed" data-id="${m.id}">✓ Mark reviewed</button>
      </div>
    </article>`).join("");
}

function startWeakPractice() {
  const sorted = [...TENSES].sort((a, b) => mastery(a.id) - mastery(b.id));
  startQuiz(sorted[0].id);
}

// ---------------- EVENT LISTENERS ----------------

document.addEventListener("click", e => {
  const scr = e.target.closest("[data-screen]");
  if (scr) showScreen(scr.dataset.screen);

  const el = e.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  const id = Number(el.dataset.id);
  if (action === "lesson") startLesson(id);
if (action === "quiz") {
  const mode = el.dataset.mode || "standard";
  const gameId = el.dataset.game ? Number(el.dataset.game) : null;
  startQuiz(id, mode, gameId);
}
if (action === "sp-game") startQuiz(1, "game", id);
  if (action === "weak") startWeakPractice();
  if (action === "mark-reviewed") {
    storage.markReviewed(el.dataset.id);
    renderReview();
  }
});

$("continueBtn").onclick = () => startLesson(storage.getLastTense());
$("weakBtn").onclick = () => startWeakPractice();
$("mistakesBtn").onclick = () => showScreen("review");

// Auth Controls
$("guestBtn").onclick = () => {
  localStorage.setItem("lt3_guest", "true");
  loginAs({ mode: "guest", email: null });
};

$("authForm").onsubmit = async e => {
  e.preventDefault();
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;
  const isSignIn = $("authSubmit").textContent.includes("Sign In");

  if (!email || password.length < 6) {
    $("authMessage").textContent = "Please provide a valid email and minimum 6-character password.";
    return;
  }

  $("authMessage").textContent = "Authenticating...";
  $("authSubmit").disabled = true;

  try {
    if (isSignIn) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      localStorage.removeItem("lt3_guest");
      await loginAs({ mode: "supabase", email: data.user.email, id: data.user.id });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin }
      });
      if (error) throw error;
      if (data.session) {
        localStorage.removeItem("lt3_guest");
        await loginAs({ mode: "supabase", email: data.user.email, id: data.user.id });
      } else {
        $("authMessage").textContent = "Sign-up successful! Check your email to confirm your account.";
      }
    }
  } catch (err) {
    $("authMessage").textContent = err.message || "Authentication failed.";
  } finally {
    $("authSubmit").disabled = false;
  }
};

$("authToggle").onclick = () => {
  const isSignin = $("authSubmit").textContent.includes("Sign In");
  $("authSubmit").textContent = isSignin ? "Create account" : "Sign In";
  $("authToggle").innerHTML = isSignin
    ? 'Already have an account? <strong>Sign in</strong>'
    : 'New here? <strong>Create an account</strong>';
  $("authTitle").textContent = isSignin ? "Create Account" : "Welcome Back!";
  $("authMessage").textContent = isSignin
    ? "Create a cloud profile to track your progress."
    : "Continue your learning adventure.";
};

$("googleBtn").onclick = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
  } catch (err) {
    $("authMessage").textContent = err.message || "Google sign-in is currently unavailable.";
  }
};

$("forgotPasswordBtn").onclick = async () => {
  const email = $("authEmail").value.trim();
  if (!email) {
    $("authMessage").textContent = "Enter your email address above to receive a reset link.";
    return;
  }
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if (error) throw error;
    $("authMessage").textContent = "Password reset email sent. Check your inbox.";
  } catch (err) {
    $("authMessage").textContent = err.message || "Error sending reset email.";
  }
};

// Settings Menu
const menuBtn = $("menuBtn");
const settingsMenu = $("settingsMenu");

function closeMenu() {
  if (settingsMenu) settingsMenu.hidden = true;
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", e => {
  e.stopPropagation();
  const willOpen = settingsMenu.hidden;
  settingsMenu.hidden = !willOpen;
  menuBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
});

document.addEventListener("click", e => {
  if (settingsMenu && !settingsMenu.hidden && !e.target.closest(".menu-wrap")) {
    closeMenu();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && settingsMenu && !settingsMenu.hidden) {
    closeMenu();
    menuBtn?.focus();
  }
});

 $("logoutBtn").onclick = async () => {
  closeMenu();
  try {
    await supabase.auth.signOut();
  } catch {}
  localStorage.removeItem("lt3_guest");
  storage.clearUser();
  currentUser = { mode: "guest", email: null };
  showAuth();
};

$("themeBtn").onclick = () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next === "dark" ? "dark" : "";
  storage.setSetting("theme", next);
  updateThemeUI(next === "dark");
  closeMenu();
};

$("passwordToggle")?.addEventListener("click", () => {
  const input = $("authPassword");
  input.type = input.type === "password" ? "text" : "password";
});

// ---------------- SINGLE INITIALIZATION ----------------

(async function init() {
  const theme = storage.getSettings().theme;
  if (theme === "dark") {
    document.documentElement.dataset.theme = "dark";
    updateThemeUI(true);
  } else {
    updateThemeUI(false);
  }

  // Single global auth state change listener
  supabase.auth.onAuthStateChange((event, authSession) => {
    if (authSession?.user) {
      localStorage.removeItem("lt3_guest");
      loginAs({ mode: "supabase", email: authSession.user.email, id: authSession.user.id });
    } else if (event === "SIGNED_OUT") {
      localStorage.removeItem("lt3_guest");
      storage.clearUser();
      currentUser = { mode: "guest", email: null };
      showAuth();
    }
  });

  // Check initial active session
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (data?.session?.user) {
      localStorage.removeItem("lt3_guest");
      await loginAs({ mode: "supabase", email: data.session.user.email, id: data.session.user.id });
      return;
    }
  } catch (err) {
    console.warn("Supabase session check skipped:", err);
  }

  // Fallback to local guest mode if preserved
  if (localStorage.getItem("lt3_guest") === "true") {
    loginAs({ mode: "guest", email: null });
    return;
  }

  // Default display to login
  showAuth();
})();

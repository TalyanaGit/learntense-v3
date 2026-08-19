# 📚 LearnTense v3

**Learn · Practice · Master** English tenses.

---

## What's fixed in this build

- **Dynamic Option Shuffling & Answer Bias Elimination**: Options for games and offline quizzes are randomized using Fisher-Yates, recalculating the correct target index every time.
- **50/50 True/False Generator**: Game generation and offline sets now balance True and False statements equally.
- **Authentic Practice for All 12 Tenses**: Replaced all dummy and placeholder questions with curriculum-aligned grammar practice.
- **Dynamic Procedural Generation**: Simple Present progressive games draw from randomized verbs, subjects, and time expressions for infinite variety.
- **Mobile Bottom Navigation**: Added a fixed mobile navigation bar ensuring Tenses and Review screens are always accessible on smaller viewports.
- **Complete XSS Sanitization**: Ensured all user and model strings rendered to the DOM (including `m.correct`) pass through `escapeHtml()`.
- **Fuzzy & Multi-token String Matching**: Enhanced answer normalization to strip punctuation, quotes, multiple spaces, and handle flexible multi-blank answers.
- **Adaptive Spaced Repetition & EMA Mastery**: Implemented an Exponential Moving Average (EMA) mastery model that won't collapse to 12 hours on a single mistake.
- **Accessibility & Escape Trap**: Dropdown menus support `Escape` key dismissal and keyboard navigation.

---

## Quick Start

Run a local HTTP server from the project directory:

```bash
python -m http.server 8080
# or
npx serve .

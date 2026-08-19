/**
 * LearnTense v3 — Core catalogue & authentic practice sets for all 12 tenses
 */
export const TENSES = [
  { id: 1,  name: "Simple Present",              category: "Present", icon: "🟢", short: "Habits, facts, routines" },
  { id: 2,  name: "Present Continuous",          category: "Present", icon: "🔵", short: "Actions happening now" },
  { id: 3,  name: "Present Perfect",             category: "Present", icon: "🟣", short: "Past linked to now" },
  { id: 4,  name: "Present Perfect Continuous",  category: "Present", icon: "🟠", short: "Duration until now" },
  { id: 5,  name: "Simple Past",                 category: "Past",    icon: "🟢", short: "Finished past actions" },
  { id: 6,  name: "Past Continuous",             category: "Past",    icon: "🔵", short: "Past actions in progress" },
  { id: 7,  name: "Past Perfect",                category: "Past",    icon: "🟣", short: "Earlier than another past" },
  { id: 8,  name: "Past Perfect Continuous",     category: "Past",    icon: "🟠", short: "Duration before past point" },
  { id: 9,  name: "Simple Future",               category: "Future",  icon: "🚀", short: "Predictions & plans" },
  { id: 10, name: "Future Continuous",           category: "Future",  icon: "⏳", short: "Future in progress" },
  { id: 11, name: "Future Perfect",              category: "Future",  icon: "🏆", short: "Done before future point" },
  { id: 12, name: "Future Perfect Continuous",   category: "Future",  icon: "⭐", short: "Duration up to future" }
];

export const LESSONS = {
  1: {
    when: ["Habits and routines", "Facts and general truths", "Repeated actions", "Schedules and timetables"],
    structure: "Subject + base verb  ·  he / she / it + verb-s / -es",
    signals: "always, usually, often, every day, on Mondays, never",
    examples: [
      ["I walk to school every day.", "Routine"],
      ["She plays tennis on Sundays.", "Habit"],
      ["Water boils at 100°C.", "Fact"],
      ["The train leaves at 8 a.m.", "Timetable"]
    ],
    mistakes: [
      ["She play tennis.", "She plays tennis."],
      ["He go to work every day.", "He goes to work every day."],
      ["They likes pizza.", "They like pizza."]
    ],
    tip: "Third-person singular almost always needs -s or -es. Watch verbs ending in -y, -o, -sh, -ch, -x, -ss."
  },
  2: {
    when: ["Actions happening right now", "Temporary situations", "Changing situations", "Annoying habits (with always)"],
    structure: "Subject + am / is / are + verb-ing",
    signals: "now, right now, at the moment, today, this week, currently",
    examples: [
      ["I am reading a book now.", "Happening now"],
      ["They are studying English this week.", "Temporary"],
      ["The weather is getting warmer.", "Changing"],
      ["She is always losing her keys!", "Annoying habit"]
    ],
    mistakes: [
      ["She is read a book.", "She is reading a book."],
      ["They are play football.", "They are playing football."],
      ["I am go now.", "I am going now."]
    ],
    tip: "Use continuous for temporary actions. Don't use it with stative verbs (know, like, want, believe)."
  },
  3: {
    when: ["Past actions with present result", "Life experiences", "Unfinished time periods", "Recent actions"],
    structure: "Subject + have / has + past participle",
    signals: "already, just, yet, ever, never, since, for, so far, recently",
    examples: [
      ["I have visited Delhi.", "Experience"],
      ["She has just finished her work.", "Recent result"],
      ["Have you ever seen snow?", "Experience question"],
      ["We have lived here for five years.", "Unfinished period"]
    ],
    mistakes: [
      ["She have finished.", "She has finished."],
      ["I have went there.", "I have gone there."],
      ["He has already ate.", "He has already eaten."]
    ],
    tip: "Irregular past participles are essential (gone, written, seen, eaten). Focus on the core 50."
  },
  4: {
    when: ["Actions that started in the past and continue into the present", "Emphasis on continuous duration or activity", "Temporary ongoing situations with visible evidence"],
    structure: "Subject + have / has been + verb-ing",
    signals: "for, since, all day, lately, recently, how long",
    examples: [
      ["I have been studying for two hours.", "Duration"],
      ["She has been working here since 2022.", "Continuing"],
      ["They have been waiting all morning.", "Ongoing"],
      ["It has been raining since noon.", "Weather duration"]
    ],
    mistakes: [
      ["He has been work all day.", "He has been working all day."],
      ["They have been wait since noon.", "They have been waiting since noon."]
    ],
    tip: "Use this tense when the activity duration itself matters, rather than just the final finished result."
  },
  5: {
    when: ["Completed actions in the past", "Sequence of past events", "Past habits (with used to)", "Finished time expressions"],
    structure: "Subject + past form of the verb (V2)",
    signals: "yesterday, last week, ago, in 2020, when I was young",
    examples: [
      ["I visited Delhi last year.", "Finished action"],
      ["She watched a movie yesterday.", "Finished time"],
      ["They played football and then went home.", "Sequence"],
      ["He used to live in London.", "Past habit"]
    ],
    mistakes: [
      ["I go yesterday.", "I went yesterday."],
      ["She did went home.", "She went home."],
      ["He didn't went.", "He didn't go."]
    ],
    tip: "After did / didn't, the main verb always reverts to its base form."
  },
  6: {
    when: ["Action in progress at a specific past time", "Background description in narratives", "Two simultaneous past actions", "Interrupted actions"],
    structure: "Subject + was / were + verb-ing",
    signals: "while, when, at 8 pm yesterday, as",
    examples: [
      ["I was reading at 8 pm.", "In progress"],
      ["They were playing when it started to rain.", "Interrupted"],
      ["She was cooking while he was studying.", "Simultaneous"],
      ["The sun was shining and birds were singing.", "Background"]
    ],
    mistakes: [
      ["They was playing.", "They were playing."],
      ["I was read a book.", "I was reading a book."]
    ],
    tip: "'Was' for singular subjects (I, he, she, it); 'were' for plurals and you."
  },
  7: {
    when: ["Action completed before another past action", "Showing which of two past events occurred first", "Reported speech about the past"],
    structure: "Subject + had + past participle",
    signals: "before, after, by the time, already, when",
    examples: [
      ["I had finished before he arrived.", "Earlier action"],
      ["She had left when I called.", "Earlier event"],
      ["By noon they had completed the work.", "Before a past point"],
      ["He said he had never been there.", "Reported"]
    ],
    mistakes: [
      ["She had went home.", "She had gone home."],
      ["They had finish before lunch.", "They had finished before lunch."]
    ],
    tip: "Past Perfect is the 'past of the past'. Use it only when clarifying sequence between past events."
  },
  8: {
    when: ["Ongoing action continuing up to another past event", "Emphasizing duration before a past reference point", "Explaining the cause of a past condition"],
    structure: "Subject + had been + verb-ing",
    signals: "for, since, before, when, all day",
    examples: [
      ["I had been studying for two hours when she called.", "Duration"],
      ["They had been waiting since noon before the bus arrived.", "Ongoing"],
      ["She was tired because she had been working all day.", "Cause"]
    ],
    mistakes: [
      ["He had been work all day.", "He had been working all day."],
      ["They had been waited for an hour.", "They had been waiting for an hour."]
    ],
    tip: "Pair Past Perfect Continuous with a Simple Past 'when' clause to narrate the cause of a state."
  },
  9: {
    when: ["Predictions without present evidence", "Spontaneous decisions, offers, and promises", "Future facts", "Conditional main clauses"],
    structure: "Subject + will + base verb",
    signals: "tomorrow, next week, soon, I think, probably, I promise",
    examples: [
      ["I will call you tomorrow.", "Promise"],
      ["I think it will rain.", "Prediction"],
      ["She will help us.", "Offer"],
      ["The meeting will start at 10.", "Future fact"]
    ],
    mistakes: [
      ["I will goes tomorrow.", "I will go tomorrow."],
      ["She will to study.", "She will study."]
    ],
    tip: "Always 'will + base verb'. Never use 'will + -s' or 'will + to-infinitive'."
  },
  10: {
    when: ["Action in progress at a specific future moment", "Expected routine or scheduled future activities", "Polite inquiries about plans"],
    structure: "Subject + will be + verb-ing",
    signals: "this time tomorrow, at 8 pm tomorrow, next week, while",
    examples: [
      ["I will be studying at 8 pm.", "Future activity in progress"],
      ["They will be travelling this time tomorrow.", "In progress"],
      ["She will be working next Monday.", "Expected routine"]
    ],
    mistakes: [
      ["I will be study at 8.", "I will be studying at 8."],
      ["They will be travel.", "They will be travelling."]
    ],
    tip: "Use this to describe the scene or activity at a specified future moment."
  },
  11: {
    when: ["Action completed prior to a designated future point", "Deadlines and completion targets", "Looking back from a future perspective"],
    structure: "Subject + will have + past participle",
    signals: "by, by the time, before + future point, by next year",
    examples: [
      ["I will have finished by Friday.", "Deadline"],
      ["She will have arrived by noon.", "Before future point"],
      ["They will have completed the project by June.", "Future completion"]
    ],
    mistakes: [
      ["I will have finish by Friday.", "I will have finished by Friday."],
      ["She will has arrived.", "She will have arrived."]
    ],
    tip: "Notice that 'will have' is always invariable—never use 'will has'."
  },
  12: {
    when: ["Duration continuing up to a defined future milestone", "Projecting cumulative time spans into the future"],
    structure: "Subject + will have been + verb-ing",
    signals: "for, since, by the time, by next year, by then",
    examples: [
      ["By June I will have been working here for five years.", "Duration milestone"],
      ["She will have been studying for three hours by 9 pm.", "Future duration"],
      ["By next month they will have been living here for a year.", "Ongoing duration"]
    ],
    mistakes: [
      ["I will have been work for years.", "I will have been working for years."],
      ["She will has been studying.", "She will have been studying."]
    ],
    tip: "Always includes a duration expression ('for X years') paired with a 'by' time marker."
  }
};

export const QUESTIONS = {
  1: [
    { id: "sp1", type: "mc", difficulty: 1, prompt: "She ___ to school every day.", options: ["goes", "go", "going", "gone"], answer: 0, explanation: "Third-person singular takes -s/-es: goes." },
    { id: "sp2", type: "mc", difficulty: 1, prompt: "Which sentence is grammatically correct?", options: ["They plays football.", "They play football.", "They playing football.", "They played every day."], answer: 1, explanation: "Plural subjects take base form: play." },
    { id: "sp3", type: "mc", difficulty: 1, prompt: "Water ___ at 100°C.", options: ["boil", "boils", "boiling", "boiled"], answer: 1, explanation: "Scientific facts use Simple Present singular: boils." },
    { id: "sp4", type: "mc", difficulty: 2, prompt: "Neither answer ___ correct.", options: ["seems", "seem", "seeming", "seemed"], answer: 0, explanation: "'Neither' is grammatically singular: seems." },
    { id: "sp5", type: "mc", difficulty: 2, prompt: "Does she ___ in this office?", options: ["work", "works", "working", "worked"], answer: 0, explanation: "After auxiliary 'does', the main verb stays in base form: work." },
    { id: "sp6", type: "correct", difficulty: 1, prompt: "She go to work by bus.", answer: "She goes to work by bus.", alternates: ["She goes to work by bus"], explanation: "Add -es for third-person singular (go -> goes)." },
    { id: "sp7", type: "correct", difficulty: 2, prompt: "He don't like coffee.", answer: "He doesn't like coffee.", alternates: ["He does not like coffee.", "He does not like coffee", "He doesn't like coffee"], explanation: "Third person uses 'doesn't' + base verb." },
    { id: "sp8", type: "tf", difficulty: 1, prompt: "“I walk to school every day” describes a repeated routine.", answer: true, explanation: "Habits and routines use Simple Present." },
    { id: "sp9", type: "tf", difficulty: 2, prompt: "“She is knowing the answer” is correct standard English.", answer: false, explanation: "'Know' is a stative verb; use 'She knows the answer'." },
    { id: "sp10", type: "fill", difficulty: 1, prompt: "They ___ (play) tennis every weekend.", answer: "play", explanation: "Plural subject 'They' takes the base verb." },
    { id: "sp11", type: "fill", difficulty: 2, prompt: "The evening news ___ (come) on at six o'clock.", answer: "comes", explanation: "'News' is an uncountable singular noun: comes." },
    { id: "sp12", type: "neg", difficulty: 1, prompt: "Make negative: She likes tea.", answer: "She does not like tea.", alternates: ["She doesn't like tea.", "She does not like tea", "She doesn't like tea"], explanation: "Negative = does not / doesn't + base verb." }
  ],
  2: [
    { id: "pc1", type: "mc", difficulty: 1, prompt: "Look! The baby ___.", options: ["cries", "is crying", "cried", "has cried"], answer: 1, explanation: "Action occurring at this moment: is crying." },
    { id: "pc2", type: "mc", difficulty: 1, prompt: "They ___ English this semester.", options: ["are studying", "study", "studied", "have studied"], answer: 0, explanation: "Temporary ongoing situation uses Present Continuous." },
    { id: "pc3", type: "mc", difficulty: 2, prompt: "I ___ the answer right now.", options: ["am knowing", "know", "am know", "knowing"], answer: 1, explanation: "Stative verb 'know' takes simple present even for present states." },
    { id: "pc4", type: "correct", difficulty: 1, prompt: "She is read a book right now.", answer: "She is reading a book right now.", alternates: ["She is reading a book right now", "She is reading a book"], explanation: "Present Continuous requires is + verb-ing." },
    { id: "pc5", type: "fill", difficulty: 1, prompt: "We ___ (wait) for the bus at the moment.", answer: "are waiting", alternates: ["'re waiting"], explanation: "Subject 'We' + are + waiting." },
    { id: "pc6", type: "tf", difficulty: 1, prompt: "“The weather is getting colder” describes a changing situation.", answer: true, explanation: "Present Continuous is used for gradual changes and trends." },
    { id: "pc7", type: "tf", difficulty: 2, prompt: "“I am wanting a cold drink” is standard grammar.", answer: false, explanation: "'Want' is stative; say 'I want a cold drink'." }
  ],
  3: [
    { id: "pp1", type: "mc", difficulty: 1, prompt: "They ___ their homework already.", options: ["have finished", "finish", "are finish", "has finished"], answer: 0, explanation: "'They' pairs with auxiliary 'have' + past participle." },
    { id: "pp2", type: "mc", difficulty: 1, prompt: "___ you ever seen the Northern Lights?", options: ["Have", "Did", "Do", "Are"], answer: 0, explanation: "Life experience questions use 'Have you ever + V3'." },
    { id: "pp3", type: "mc", difficulty: 2, prompt: "She has already ___ lunch.", options: ["ate", "eaten", "eat", "eating"], answer: 1, explanation: "Past participle of 'eat' is 'eaten'." },
    { id: "pp4", type: "correct", difficulty: 1, prompt: "I have went to Paris twice.", answer: "I have gone to Paris twice.", alternates: ["I have been to Paris twice.", "I have gone to Paris twice", "I have been to Paris twice"], explanation: "Past participle of go is gone (or been)." },
    { id: "pp5", type: "fill", difficulty: 1, prompt: "He ___ (just / finish) his project.", answer: "has just finished", alternates: ["has finished"], explanation: "Singular subject 'He' + has just + past participle." },
    { id: "pp6", type: "tf", difficulty: 1, prompt: "“I have seen that movie yesterday” is correct.", answer: false, explanation: "Specific finished past times (yesterday) require Simple Past, not Present Perfect." },
    { id: "pp7", type: "tf", difficulty: 2, prompt: "“We have lived here since 2018” means we still live here now.", answer: true, explanation: "'Since' with Present Perfect connects a past start to the current moment." }
  ],
  4: [
    { id: "ppc1", type: "mc", difficulty: 1, prompt: "She ___ here for three hours.", options: ["has been waiting", "is waiting", "was waiting", "waits"], answer: 0, explanation: "Ongoing duration up to now takes Present Perfect Continuous: has been waiting." },
    { id: "ppc2", type: "mc", difficulty: 2, prompt: "Why are your clothes dirty? — I ___ the garden.", options: ["have been digging", "dig", "have dug", "was dig"], answer: 0, explanation: "Recent continuous activity with present visible outcome." },
    { id: "ppc3", type: "fill", difficulty: 1, prompt: "It ___ (rain) since 8 o'clock this morning.", answer: "has been raining", explanation: "Subject 'It' + has been + verb-ing." },
    { id: "ppc4", type: "correct", difficulty: 1, prompt: "They have been wait for an hour.", answer: "They have been waiting for an hour.", alternates: ["They have been waiting for an hour"], explanation: "Form with verb-ing: have been waiting." },
    { id: "ppc5", type: "tf", difficulty: 1, prompt: "“How long have you been learning French?” asks about ongoing duration.", answer: true, explanation: "'How long + present perfect continuous' inquires about elapsed duration." },
    { id: "ppc6", type: "tf", difficulty: 2, prompt: "“I have been knowing him for years” is correct.", answer: false, explanation: "'Know' is stative; use Present Perfect Simple: 'I have known him'." }
  ],
  5: [
    { id: "spa1", type: "mc", difficulty: 1, prompt: "I ___ Delhi last year.", options: ["visited", "visit", "have visited", "am visiting"], answer: 0, explanation: "'Last year' marks a finished past time requiring Simple Past." },
    { id: "spa2", type: "mc", difficulty: 1, prompt: "She ___ a great documentary yesterday evening.", options: ["watched", "watches", "is watching", "has watched"], answer: 0, explanation: "Past completed event uses past form: watched." },
    { id: "spa3", type: "mc", difficulty: 2, prompt: "He didn't ___ to the party last night.", options: ["go", "went", "goes", "going"], answer: 0, explanation: "After auxiliary 'didn't', the main verb is base form: go." },
    { id: "spa4", type: "correct", difficulty: 1, prompt: "I go to the dentist yesterday.", answer: "I went to the dentist yesterday.", alternates: ["I went to the dentist yesterday"], explanation: "Past tense of 'go' is irregular: 'went'." },
    { id: "spa5", type: "fill", difficulty: 1, prompt: "They played tennis and then ___ (go) home.", answer: "went", explanation: "Sequence of completed past actions: went." },
    { id: "spa6", type: "tf", difficulty: 1, prompt: "“Did you saw that car?” is standard English.", answer: false, explanation: "Auxiliary 'did' already carries past tense; use base verb 'see'." },
    { id: "spa7", type: "tf", difficulty: 2, prompt: "“Used to play” expresses a past habit that is no longer true.", answer: true, explanation: "'Used to + verb' denotes discontinued past routines." }
  ],
  6: [
    { id: "pc6_1", type: "mc", difficulty: 1, prompt: "I ___ dinner when the doorbell rang.", options: ["was cooking", "cooked", "have cooked", "am cooking"], answer: 0, explanation: "Background action interrupted by a shorter past event." },
    { id: "pc6_2", type: "mc", difficulty: 1, prompt: "What ___ you doing at 9 pm yesterday?", options: ["were", "was", "did", "are"], answer: 0, explanation: 

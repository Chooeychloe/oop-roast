import { useEffect, useRef, useState } from "react";
import { QUESTIONS, ROASTS, ENDINGS, shuffle } from "./data";

const DEFAULT_SECONDS = 20;
const MIN_SECONDS = 5;
const MAX_SECONDS = 300;
const twoDigits = (n) => String(n).padStart(2, "0");
const choose = (items) => {
  const index = Math.floor(Math.random() * items.length);
  return { text: items[index], index: index + 1 };
};

function useLocalStorage(key, init) {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ }
  }, [key, v]);
  return [v, setV];
}

/* ---------- Mascot ---------- */
function Mascot({ mood, talking, tick }) {
  const browL = mood === "mad" ? "rotate-[22deg] translate-y-0.5" : mood === "glad" ? "-translate-y-1" : "";
  const browR = mood === "mad" ? "-rotate-[22deg] translate-y-0.5" : mood === "glad" ? "-translate-y-1" : "";
  const body = mood === "mad" ? "animate-shake" : mood === "glad" ? "animate-hop" : "";
  const brow = "origin-center [transform-box:fill-box] transition-transform duration-200";
  return (
    <svg viewBox="0 0 300 270" role="img" aria-label="A talking cartoon kalabaw" className="w-64 overflow-visible">
      <g key={tick} className={body}>
        {/* Tail and hooves */}
        <path d="M45 145C20 153 28 184 14 191M14 191l-7-4m7 4-6 7" fill="none" stroke="#37312d" strokeWidth="5" strokeLinecap="round" />
        <path d="M75 187l-8 42q-2 9-13 8l-11-2 3-9 13-4 6-37m39 1 3 42q1 10-10 10H83l2-9 13-4-2-38m83-5 5 43q1 9-9 10h-16l1-9 12-5-5-38m39-10 8 41q2 10-9 12h-17l-1-9 13-6-10-41" fill="#cbc5b9" stroke="#37312d" strokeWidth="5" strokeLinejoin="round" />
        <path d="M44 226l-3 9 15 2q8-1 11-7m17 7v8h17q7-2 7-8m49-2 1 9h17q8-2 8-9m14-2 2 10h17q8-2 7-10" fill="#77736d" stroke="#37312d" strokeWidth="4" strokeLinejoin="round" />
        {/* Big sturdy body */}
        <ellipse cx="117" cy="145" rx="86" ry="62" fill="#d9d3c7" stroke="#37312d" strokeWidth="5" />
        <path d="M57 175q34 31 83 13" fill="none" stroke="#aaa397" strokeWidth="5" strokeLinecap="round" />
        <path d="M54 106q8-15 25-18m88 120q22-7 30-22" fill="none" stroke="#aaa397" strokeWidth="4" strokeLinecap="round" />
        {/* Head, ears and unmistakable curved kalabaw horns */}
        <path d="M173 83C137 79 130 51 139 34c12 15 28 21 44 18 9-2 16-8 24-17-2 25-12 43-34 48m60 0c35-4 42-32 31-49-13 14-29 19-45 15-9-2-16-8-23-18 1 26 10 44 32 51" fill="#8b8984" stroke="#37312d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M164 74q-12-9-21-3m100 3q12-9 21-3" fill="none" stroke="#37312d" strokeWidth="5" strokeLinecap="round" />
        <path d="M170 75q4-15 20-17h28q17 1 23 17l4 52q1 33-34 40-34-3-38-35z" fill="#d9d3c7" stroke="#37312d" strokeWidth="5" strokeLinejoin="round" />
        <path d="M165 96q-9-12-18-5 3 14 17 15m82-10q10-11 18-3-4 14-17 14" fill="#c8c0b3" stroke="#37312d" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="184" cy="94" rx="8" ry="10" fill="#fff" /><ellipse cx="223" cy="94" rx="8" ry="10" fill="#fff" />
        <circle cx="187" cy="96" r="4.5" fill="#241a4d" /><circle cx="225" cy="96" r="4.5" fill="#241a4d" />
        <rect x="175" y="77" width="20" height="5" rx="3" fill="#37312d" className={`${brow} ${browL}`} />
        <rect x="213" y="77" width="20" height="5" rx="3" fill="#37312d" className={`${brow} ${browR}`} />
        <ellipse cx="205" cy="126" rx="32" ry="23" fill="#e5bcae" stroke="#37312d" strokeWidth="5" />
        <ellipse cx="193" cy="123" rx="5" ry="7" fill="#37312d" transform="rotate(20 193 123)" />
        <ellipse cx="216" cy="123" rx="5" ry="7" fill="#37312d" transform="rotate(-20 216 123)" />
        <path d="M192 143q13 12 27 0" fill="none" stroke="#37312d" strokeWidth="4" strokeLinecap="round" />
        <g className={`transition-opacity ${mood === "glad" ? "opacity-70" : "opacity-0"}`}>
          <circle cx="178" cy="111" r="6" fill="#ed8991" /><circle cx="232" cy="111" r="6" fill="#ed8991" />
        </g>
        <g className={talking ? "animate-flap" : ""} style={{ transformOrigin: "207px 145px" }}>
          <path d="M194 145q13 12 27 0-2 15-14 16-11-2-13-16" fill="#683a3a" stroke="#37312d" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Small UI helpers ---------- */
const card = "rounded-3xl border-2 border-violet-200 bg-white p-6 dark:border-violet-900 dark:bg-panel";
const btn = "rounded-xl bg-violet-600 px-5 py-3 font-bold text-white hover:brightness-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:opacity-40 dark:bg-violet-300 dark:text-night";
const chip = (on) =>
  `rounded-full border-2 px-3 py-1.5 text-sm font-bold transition-colors ${
    on ? "border-violet-600 bg-violet-600 text-white dark:border-violet-300 dark:bg-violet-300 dark:text-night"
       : "border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300"}`;
const input = "w-full rounded-xl border-2 border-violet-200 bg-violet-50 px-3 py-2 dark:border-violet-800 dark:bg-night";

/* ---------- App ---------- */
export default function App() {
  const [screen, setScreen] = useState("setup");
  const [cfg, setCfg] = useLocalStorage("oop-cfg", { off: [], count: 10, timer: false, seconds: DEFAULT_SECONDS, voice: true });
  const [custom, setCustom] = useLocalStorage("oop-custom", []);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState({ good: 0, bad: 0 });
  const [missed, setMissed] = useState([]);
  const [ending, setEnding] = useState("");
  const [left, setLeft] = useState(DEFAULT_SECONDS);
  const [line, setLine] = useState("O siya, ready ka na bang araruhin ng OOP?");
  const [mood, setMood] = useState("");
  const [talking, setTalking] = useState(false);
  const [tick, setTick] = useState(0);
  const [voices, setVoices] = useState([]);
  const talkT = useRef();
  const audioRef = useRef(null);
  const speechSupported = typeof window !== "undefined"
    && "speechSynthesis" in window
    && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices() || []);
    loadVoices();
    const previousHandler = synth.onvoiceschanged;
    synth.onvoiceschanged = loadVoices;
    return () => {
      if (synth.onvoiceschanged === loadVoices) synth.onvoiceschanged = previousHandler;
    };
  }, []);

  useEffect(() => () => {
    clearTimeout(talkT.current);
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
  }, []);

  const filipinoVoice = voices.find((voice) => /^(fil|tl)(-|$)/i.test(voice.lang));
  const secondsPerQuestion = Math.min(Math.max(Math.floor(Number(cfg.seconds) || DEFAULT_SECONDS), MIN_SECONDS), MAX_SECONDS);

  const all = [...QUESTIONS, ...custom];
  const topics = [...new Set(all.map((q) => q.topic))];
  const pool = all.filter((q) => !cfg.off.includes(q.topic));
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  /* Prefer downloaded ElevenLabs tracks; use the device voice until a track is added. */
  const say = (text, m = "", audioId) => {
    setLine(text); setMood(m); setTick((t) => t + 1); setTalking(true);
    clearTimeout(talkT.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (speechSupported) window.speechSynthesis.cancel();
    if (!cfg.voice) {
      setTalking(false);
      return;
    }

    const speakWithDeviceVoice = () => {
      if (speechSupported) {
        try {
          const synth = window.speechSynthesis;
          const u = new window.SpeechSynthesisUtterance(text);
          const availableVoices = voices.length ? voices : synth.getVoices();
          const voice = filipinoVoice || availableVoices.find((v) => /^(fil|tl)(-|$)/i.test(v.lang));
          u.lang = voice?.lang || "fil-PH";
          if (voice) u.voice = voice;
          u.pitch = m === "mad" ? 1.08 : 1;
          u.rate = 0.94;
          u.onend = u.onerror = () => setTalking(false);
          synth.speak(u);
          talkT.current = setTimeout(() => setTalking(false), Math.max(4000, text.length * 130));
          return;
        } catch { /* fall through to silent flap */ }
      }
      talkT.current = setTimeout(() => setTalking(false), Math.max(900, text.length * 55));
    };

    if (audioId) {
      try {
        const audio = new window.Audio(`${import.meta.env.BASE_URL}audio/${audioId}.mp3`);
        let failed = false;
        const fallback = () => {
          if (failed || audioRef.current !== audio) return;
          failed = true;
          audioRef.current = null;
          speakWithDeviceVoice();
        };
        audioRef.current = audio;
        audio.onended = () => {
          if (audioRef.current === audio) {
            audioRef.current = null;
            setTalking(false);
          }
        };
        audio.onerror = fallback;
        const playRequest = audio.play();
        playRequest?.catch(fallback);
        return;
      } catch { /* fall back to the device voice */ }
    }
    speakWithDeviceVoice();
  };

  const start = () => {
    if (!pool.length) return;
    const d = shuffle(pool).slice(0, cfg.count).map((q) => ({
      ...q, opts: shuffle(q.o.map((t, i) => ({ t, ok: i === q.a }))),
    }));
    setDeck(d); setIdx(0); setPicked(null); setScore(0); setStreak({ good: 0, bad: 0 }); setMissed([]);
    setScreen("quiz");
    say("Sige, simulan natin. Tingnan natin kung may natira sa utak mo pagkatapos ng lecture.", "", "round-start");
  };

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i >= 0 && deck[idx].opts[i].ok;
    if (!ok) setMissed((items) => [...items, { question: deck[idx], answer: i < 0 ? "No answer (time ran out)" : deck[idx].opts[i].t }]);
    const R = ROASTS.savage;
    const g = ok ? streak.good + 1 : 0, b = ok ? 0 : streak.bad + 1;
    setStreak({ good: g, bad: b });
    if (ok) setScore((s) => s + 1);
    let chosen;
    let audioId;
    if (ok && g >= 3) {
      chosen = choose(ROASTS.streakGood);
      audioId = `streak-good-${twoDigits(chosen.index)}`;
    } else if (ok) {
      chosen = choose(R.good);
      audioId = `savage-good-${twoDigits(chosen.index)}`;
    } else if (i === -1) {
      chosen = choose(R.timeout);
      audioId = `savage-timeout-${twoDigits(chosen.index)}`;
    } else if (b >= 2) {
      chosen = choose(R.streakBad);
      audioId = `savage-streak-bad-${twoDigits(chosen.index)}`;
    } else {
      chosen = choose(R.bad);
      audioId = `savage-bad-${twoDigits(chosen.index)}`;
    }
    say(chosen.text, ok ? "glad" : "mad", audioId);
  };

  const next = () => {
    if (idx + 1 >= deck.length) {
      const pct = Math.round((score / deck.length) * 100);
      const [bracket, messages] = ENDINGS.find((e) => pct >= e[0]);
      const chosen = choose(messages);
      const finalLine = chosen.text;
      setEnding(finalLine);
      setScreen("end");
      say(finalLine, pct >= 80 ? "glad" : "mad", `ending-${bracket}-${twoDigits(chosen.index)}`);
    } else { setIdx(idx + 1); setPicked(null); setMood(""); }
  };

  /* Optional countdown per question; running out counts as wrong */
  useEffect(() => {
    if (screen !== "quiz" || !cfg.timer || picked !== null) return;
    setLeft(secondsPerQuestion);
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen, idx, picked, cfg.timer, secondsPerQuestion]);
  useEffect(() => {
    if (screen === "quiz" && cfg.timer && picked === null && left <= 0) answer(-1);
  }, [left]); // eslint-disable-line react-hooks/exhaustive-deps

  const q = deck[idx];
  const pct = deck.length ? Math.round((score / deck.length) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-violet-50 font-sans text-violet-950 dark:bg-night dark:text-violet-50">
      <div className="mx-auto grid w-full max-w-5xl flex-1 content-start gap-6 p-5 md:grid-cols-[320px_1fr] md:pt-10">
        {/* Mascot column */}
        <aside className="flex flex-col items-center gap-3 md:sticky md:top-6 md:self-start">
          <div
            aria-live="polite"
            className={`relative min-h-24 w-full rounded-2xl border-2 bg-white p-4 text-lg font-bold dark:bg-panel
              ${mood === "mad" ? "border-red-500" : mood === "glad" ? "border-emerald-500" : "border-violet-900 dark:border-violet-200"}`}
          >
            {line}
            <span className={`absolute -bottom-3 left-1/2 -ml-2.5 size-5 rotate-45 border-r-2 border-b-2 bg-white dark:bg-panel
              ${mood === "mad" ? "border-red-500" : mood === "glad" ? "border-emerald-500" : "border-violet-900 dark:border-violet-200"}`} />
          </div>
          <Mascot mood={mood} talking={talking} tick={tick} />
          <button className={chip(cfg.voice)} aria-pressed={cfg.voice}
            title="Plays your public/audio MP3 tracks when present; otherwise uses the device voice."
            onClick={() => {
              set({ voice: !cfg.voice });
              if (cfg.voice) {
                clearTimeout(talkT.current);
                audioRef.current?.pause();
                audioRef.current = null;
                window.speechSynthesis?.cancel();
                setTalking(false);
              }
            }}>
            {cfg.voice ? "Voice on" : "Voice off"}
          </button>
          {screen === "setup" && (
            <button className={chip(false)} disabled={!cfg.voice} onClick={() => say("O siya, ready ka na bang araruhin ng OOP?", "", "welcome")}>
              Hear welcome
            </button>
          )}
        </aside>

        {/* Main column */}
        <main className={card}>
          {screen === "setup" && (
            <Setup {...{ cfg, set, topics, all, pool, custom, setCustom, start }} />
          )}

          {screen === "quiz" && q && (
            <section>
              <button className={`${chip(false)} mb-4`} onClick={() => {
                setScreen("setup");
                setPicked(null);
                setMood("");
                say("Back to the lobby, rookie.", "", "setup-return");
              }}>← Back to lobby</button>
              <div className="mb-3 flex items-center justify-between font-bold text-violet-700 dark:text-violet-300">
                <span>Question {idx + 1} of {deck.length}</span>
                <span>
                  {cfg.timer && picked === null && <span className={left <= 5 ? "mr-3 text-red-500" : "mr-3"}>{Math.max(left, 0)}s</span>}
                  Score {score} · Streak {streak.good}
                </span>
              </div>
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-violet-900">
                <div className="h-full bg-violet-600 transition-all dark:bg-violet-300" style={{ width: `${(idx / deck.length) * 100}%` }} />
              </div>
              <p className="mb-4 text-xl font-bold leading-snug">{q.q}</p>
              {q.code && <pre className="mb-4 overflow-x-auto rounded-xl border border-violet-200 bg-violet-50 p-3 text-sm dark:border-violet-800 dark:bg-night">{q.code}</pre>}
              <div className="grid gap-2.5">
                {q.opts.map((o, i) => {
                  const state = picked === null ? "" : o.ok ? "border-emerald-500 bg-emerald-500/15"
                    : picked === i ? "border-red-500 bg-red-500/15" : "opacity-60";
                  return (
                    <button key={o.t} disabled={picked !== null} onClick={() => answer(i)}
                      className={`rounded-xl border-2 border-violet-200 bg-violet-50 px-4 py-3 text-left hover:enabled:border-violet-500 dark:border-violet-800 dark:bg-night ${state}`}>
                      {o.t}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <>
                  <p className="mt-4 rounded-r-xl border-l-4 border-violet-500 bg-violet-50 p-3 text-sm dark:bg-night">{q.e}</p>
                  <button autoFocus className={`${btn} mt-4`} onClick={next}>{idx + 1 >= deck.length ? "See my grade" : "Next question"}</button>
                </>
              )}
            </section>
          )}

          {screen === "end" && (
            <section>
              <h1 className="text-4xl font-extrabold tracking-tight">Final grade</h1>
              <p className="my-2 text-6xl font-extrabold tracking-tight">{score} / {deck.length} <span className="text-2xl text-violet-500">({pct}%)</span></p>
              <p className="mb-5 text-violet-700 dark:text-violet-300">{ending}</p>
              {missed.length > 0 && (
                <details className="mb-5 rounded-2xl border-2 border-violet-200 p-4 dark:border-violet-800">
                  <summary className="cursor-pointer font-bold">Review {missed.length} missed {missed.length === 1 ? "question" : "questions"}</summary>
                  <div className="mt-3 grid gap-3">
                    {missed.map(({ question, answer }, i) => (
                      <div key={`${question.q}-${i}`} className="rounded-xl bg-violet-50 p-3 text-sm dark:bg-night">
                        <p className="font-bold">{question.q}</p>
                        <p className="mt-1 text-red-700 dark:text-red-300">Your answer: {answer}</p>
                        <p className="text-emerald-800 dark:text-emerald-300">Correct answer: {question.o[question.a]}</p>
                        <p className="mt-1">{question.e}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
              <div className="flex gap-3">
                <button className={btn} onClick={start}>Try again</button>
                <button className={chip(false)} onClick={() => { setScreen("setup"); say("Back to the lobby, rookie.", "", "setup-return"); }}>Change settings</button>
              </div>
            </section>
          )}
        </main>
      </div>
      <footer className="mt-auto w-full border-t border-violet-200/80 bg-white/70 dark:border-violet-900 dark:bg-panel/70">
        <div className="mx-auto max-w-5xl px-5 py-4 text-center text-sm text-violet-600 dark:text-violet-300">
          Built for OOP survivors by <span className="font-extrabold text-violet-900 dark:text-white">Sir Dhan</span>
          <span aria-hidden="true"> | </span>
          <span>Powered by Java, kalabaw energy, and questionable confidence.</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Setup screen: everything here shapes the next round ---------- */
function Setup({ cfg, set, topics, all, pool, custom, setCustom, start }) {
  const [form, setForm] = useState({ q: "", a: "", b: "", c: "", d: "", e: "", topic: "Custom" });
  const f = (k) => ({ value: form[k], onChange: (ev) => setForm({ ...form, [k]: ev.target.value }) });
  const valid = form.q && form.a && form.b && form.c && form.d;
  const max = Math.max(pool.length, 1);
  const questionCount = Math.min(Math.max(Math.floor(Number(cfg.count) || 1), 1), max);
  const updateQuestionCount = (value) => set({ count: Math.min(Math.max(Math.floor(Number(value) || 1), 1), max) });
  const secondsPerQuestion = Math.min(Math.max(Math.floor(Number(cfg.seconds) || DEFAULT_SECONDS), MIN_SECONDS), MAX_SECONDS);
  const updateTimerSeconds = (value) => set({ seconds: Math.min(Math.max(Math.floor(Number(value) || MIN_SECONDS), MIN_SECONDS), MAX_SECONDS) });
  const add = (ev) => {
    ev.preventDefault();
    if (!valid) return;
    setCustom([...custom, { topic: form.topic.trim() || "Custom", q: form.q, o: [form.a, form.b, form.c, form.d], a: 0, e: form.e || "No explanation given. The kalabaw is judging you." }]);
    setForm({ q: "", a: "", b: "", c: "", d: "", e: "", topic: form.topic });
  };
  return (
    <section className="grid gap-6">
      <div>
        <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight">Kalabaw will judge your OOP.</h1>
        <p className="text-violet-700 dark:text-violet-300">Pick your topics, set the question count, and add your own questions. Kalabaw comes in one setting: savage.</p>
      </div>

      <div>
        <h2 className="mb-2 font-bold">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = !cfg.off.includes(t);
            return <button key={t} aria-pressed={on} className={chip(on)}
              onClick={() => set({ off: on ? [...cfg.off, t] : cfg.off.filter((x) => x !== t) })}>{t} ({all.filter((q) => q.topic === t).length})</button>;
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <fieldset className="flex items-center gap-3">
          <legend className="sr-only">Number of questions</legend>
          <span className="font-bold">Questions</span>
          <button type="button" className={chip(false)} aria-label="Decrease question count"
            disabled={questionCount <= 1} onClick={() => updateQuestionCount(questionCount - 1)}>−</button>
          <input type="number" min="1" max={max} step="1" inputMode="numeric" aria-label="Number of questions"
            value={questionCount} onChange={(e) => updateQuestionCount(e.target.value)}
            className="w-20 rounded-xl border-2 border-violet-200 bg-violet-50 px-2 py-2 text-center font-bold dark:border-violet-800 dark:bg-night" />
          <button type="button" className={chip(false)} aria-label="Increase question count"
            disabled={questionCount >= max} onClick={() => updateQuestionCount(questionCount + 1)}>+</button>
          <span className="text-sm text-violet-600 dark:text-violet-300">of {pool.length} available</span>
        </fieldset>
        <label className="flex items-center gap-2 font-bold">
          <input type="checkbox" checked={cfg.timer} onChange={(e) => set({ timer: e.target.checked })} className="size-5 accent-violet-600" />
          Enable timer
        </label>
        {cfg.timer && (
          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">Timer duration per question</legend>
            <span className="font-bold">Time per question</span>
            <button type="button" className={chip(false)} aria-label="Decrease time per question" disabled={secondsPerQuestion <= MIN_SECONDS}
              onClick={() => updateTimerSeconds(secondsPerQuestion - 5)}>−</button>
            <input type="number" min={MIN_SECONDS} max={MAX_SECONDS} step="5" inputMode="numeric" aria-label="Time per question in seconds"
              value={secondsPerQuestion} onChange={(e) => updateTimerSeconds(e.target.value)}
              className="w-20 rounded-xl border-2 border-violet-200 bg-violet-50 px-2 py-2 text-center font-bold dark:border-violet-800 dark:bg-night" />
            <button type="button" className={chip(false)} aria-label="Increase time per question" disabled={secondsPerQuestion >= MAX_SECONDS}
              onClick={() => updateTimerSeconds(secondsPerQuestion + 5)}>+</button>
            <span className="text-sm text-violet-600 dark:text-violet-300">seconds</span>
          </fieldset>
        )}
      </div>

      <div>
        <button className={btn} disabled={!pool.length} onClick={start}>Start the review</button>
        {!pool.length && <span className="ml-3 text-sm text-red-500">Select at least one topic.</span>}
      </div>

      <details className="rounded-2xl border-2 border-violet-200 p-4 dark:border-violet-800">
        <summary className="cursor-pointer font-bold">Add your own question ({custom.length} saved)</summary>
        <form onSubmit={add} className="mt-4 grid gap-2.5">
          <input className={input} placeholder="Question" {...f("q")} />
          <input className={input} placeholder="Correct answer" {...f("a")} />
          <input className={input} placeholder="Wrong answer 1" {...f("b")} />
          <input className={input} placeholder="Wrong answer 2" {...f("c")} />
          <input className={input} placeholder="Wrong answer 3" {...f("d")} />
          <input className={input} placeholder="Explanation (optional)" {...f("e")} />
          <input className={input} placeholder="Topic" {...f("topic")} />
          <div className="flex gap-3">
            <button className={btn} disabled={!valid}>Save question</button>
            {custom.length > 0 && <button type="button" className={chip(false)} onClick={() => setCustom([])}>Delete all custom</button>}
          </div>
        </form>
      </details>
    </section>
  );
}

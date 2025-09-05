import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [quiz, setQuiz] = useState([]);

  // Demo-actions (later vervangen door echte API-calls)
  const makeDummyFlashcards = () => {
    const lines = text.split(/\n+/).filter(Boolean).slice(0, 6);
    const demo = lines.length
      ? lines.map((l, i) => ({
          q: `Belangrijk punt ${i + 1}`,
          a: l.slice(0, 160) + (l.length > 160 ? "..." : ""),
        }))
      : [
          { q: "Definitie", a: "Een kernbegrip uit je tekst. Plak tekst om echte cards te zien." },
          { q: "Stelling", a: "Een bewering die je kan onthouden. Plak tekst om echte cards te zien." },
        ];
    setCards(demo);
  };

  const makeDummyQuiz = () => {
    const demo = [
      { q: "Wat is het hoofddoel van de tekst?", opts: ["Definities", "Bewijzen", "Toepassingen", "Historiek"], correct: 2 },
      { q: "Welke sectie lijkt cruciaal?", opts: ["Sectie 1", "Sectie 2", "Sectie 3", "Appendix"], correct: 1 },
      { q: "Wat moet je zeker kennen?", opts: ["Termen", "Context", "Voorbeelden", "Alles",], correct: 0 },
    ];
    setQuiz(demo);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur">
        <nav className="mx-auto w-full max-w-screen-xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-black" />
            <span className="text-lg font-semibold tracking-tight">Learnly</span>
          </div>
          <div className="text-sm text-gray-600">Your modern study buddy</div>
        </nav>
      </header>

      {/* HERO (volle breedte gradient) */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-screen-xl px-6 py-14">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Turn your course notes into <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">flashcards</span> &{" "}
            <span className="bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">quick quizzes</span>
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Plak tekst uit je cursus of samenvatting. Later kan je ook PDF’s uploaden en gerichte uitleg krijgen.
          </p>
        </div>
      </section>

      {/* INPUT + ACTIONS (brede card) */}
      <section className="w-full">
        <div className="mx-auto max-w-screen-xl px-6 pb-10">
          <div className="rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Je cursus-tekst</h2>
              <p className="text-sm text-gray-600">Plak hier een paragraaf of samenvatting (± 1–5 alinea’s).</p>
            </div>
            <div className="p-6">
              <textarea
                className="w-full min-h-52 md:min-h-56 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="Plak hier je tekst..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={makeDummyFlashcards}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-white hover:opacity-90 active:opacity-80"
                >
                  Maak Flashcards (demo)
                </button>
                <button
                  onClick={makeDummyQuiz}
                  className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 hover:bg-gray-50 active:bg-gray-100"
                >
                  Genereer Quiz (demo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLASHCARDS */}
      {cards.length > 0 && (
        <section className="w-full">
          <div className="mx-auto max-w-screen-xl px-6 pb-8">
            <div className="mb-4 flex items-end justify-between">
              <h3 className="text-2xl font-bold">Flashcards</h3>
              <span className="text-sm text-gray-600">{cards.length} cards</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c, i) => (
                <article key={i} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-semibold">{c.q}</div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">{c.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUIZ */}
      {quiz.length > 0 && (
        <section className="w-full">
          <div className="mx-auto max-w-screen-xl px-6 pb-16">
            <div className="mb-4 flex items-end justify-between">
              <h3 className="text-2xl font-bold">Quiz</h3>
              <span className="text-sm text-gray-600">{quiz.length} vragen</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {quiz.map((q, i) => (
                <article key={i} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-semibold">{q.q}</div>
                  <ul className="mt-3 space-y-2">
                    {q.opts.map((opt, j) => (
                      <li
                        key={j}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          j === q.correct ? "border-green-600 text-green-700 bg-green-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {String.fromCharCode(65 + j)}. {opt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-screen-xl px-6 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Learnly — KU Leuven study buddy (prototype)
        </div>
      </footer>
    </div>
  );
}

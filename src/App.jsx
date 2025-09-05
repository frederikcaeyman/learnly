import { useState, useRef } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [summary, setSummary] = useState("");
  const [examQuestions, setExamQuestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const fileInputRef = useRef(null);

  // PDF upload handler
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Gelieve alleen PDF bestanden te uploaden.");
      return;
    }

    setIsProcessing(true);
    
    // Simulatie van PDF verwerking (hier zou je een echte PDF parser gebruiken)
    setTimeout(() => {
      const demoText = `
      Hoofdstuk 1: Inleiding tot Machine Learning
      
      Machine Learning is een deelgebied van kunstmatige intelligentie dat zich richt op het ontwikkelen van algoritmen die kunnen leren van data zonder expliciet geprogrammeerd te worden voor specifieke taken.
      
      Belangrijke concepten:
      - Supervised Learning: Leren met gelabelde voorbeelden
      - Unsupervised Learning: Patronen vinden in ongelabelde data  
      - Reinforcement Learning: Leren door interactie met omgeving
      
      Toepassingen omvatten beeldherkenning, natuurlijke taalverwerking, en voorspellende analyses.
      `;
      setText(demoText);
      setIsProcessing(false);
      setActiveTab("input");
    }, 2000);
  };

  const generateFlashcards = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const lines = text.split(/\n+/).filter(Boolean);
      const newCards = [
        { q: "Wat is Machine Learning?", a: "Een deelgebied van AI dat algoritmen ontwikkelt die kunnen leren van data zonder expliciet geprogrammeerd te worden." },
        { q: "Wat is Supervised Learning?", a: "Een type machine learning waarbij gelabelde voorbeelden gebruikt worden om het model te trainen." },
        { q: "Noem drie hoofdtypes van Machine Learning", a: "Supervised Learning, Unsupervised Learning, en Reinforcement Learning." },
        { q: "Wat zijn typische toepassingen van ML?", a: "Beeldherkenning, natuurlijke taalverwerking, en voorspellende analyses." },
        { q: "Wat is Unsupervised Learning?", a: "Het vinden van patronen in ongelabelde data zonder vooraf gedefinieerde doelvariabelen." },
        { q: "Wat is Reinforcement Learning?", a: "Leren door interactie met de omgeving en het ontvangen van beloningen of straffen." }
      ];
      setCards(newCards);
      setIsProcessing(false);
      setActiveTab("flashcards");
    }, 1500);
  };

  const generateQuiz = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newQuiz = [
        { 
          q: "Wat is de hoofddoelstelling van Machine Learning?", 
          opts: ["Data opslaan", "Algoritmen laten leren van data", "Websites maken", "Databases beheren"], 
          correct: 1 
        },
        { 
          q: "Welk type ML gebruikt gelabelde data?", 
          opts: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"], 
          correct: 0 
        },
        { 
          q: "Wat is GEEN typische toepassing van ML?", 
          opts: ["Beeldherkenning", "Tekstverwerking", "Voorspellingen", "Koffie zetten"], 
          correct: 3 
        }
      ];
      setQuiz(newQuiz);
      setIsProcessing(false);
      setActiveTab("quiz");
    }, 1500);
  };

  const generateSummary = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newSummary = `
**Samenvatting: Machine Learning Basis**

Machine Learning (ML) is een kernonderdeel van kunstmatige intelligentie waarbij computers leren van data zonder expliciete programmering.

**Drie hoofdtypes:**
1. **Supervised Learning** - Gebruikt gelabelde data voor training
2. **Unsupervised Learning** - Vindt patronen in ongelabelde data  
3. **Reinforcement Learning** - Leert door trial-and-error met beloningen

**Belangrijkste toepassingen:**
- Beeldherkenning en computervision
- Natuurlijke taalverwerking (NLP)
- Voorspellende analyses en data mining
- Aanbevelingssystemen

Deze technieken revolutioneren vele industrieën en maken intelligente systemen mogelijk die kunnen adapteren en verbeteren over tijd.
      `;
      setSummary(newSummary);
      setIsProcessing(false);
      setActiveTab("summary");
    }, 1500);
  };

  const generateExamQuestions = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newExamQuestions = [
        {
          q: "Leg uit wat Machine Learning is en beschrijf kort de drie hoofdtypes. Geef bij elk type een praktisch voorbeeld.",
          points: 10,
          type: "open"
        },
        {
          q: "Vergelijk Supervised en Unsupervised Learning. Wanneer zou je elk type gebruiken?",
          points: 8,
          type: "open"
        },
        {
          q: "Beschrijf drie concrete toepassingen van Machine Learning in het dagelijks leven en leg uit welk type ML waarschijnlijk gebruikt wordt.",
          points: 12,
          type: "open"
        },
        {
          q: "Wat zijn de voordelen en mogelijke nadelen van Reinforcement Learning ten opzichte van andere ML-technieken?",
          points: 10,
          type: "open"
        }
      ];
      setExamQuestions(newExamQuestions);
      setIsProcessing(false);
      setActiveTab("exam");
    }, 1500);
  };

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        activeTab === id 
          ? "bg-black text-white" 
          : "text-gray-600 hover:text-black hover:bg-gray-100"
      }`}
    >
      {label} {count > 0 && <span className="ml-1 text-xs opacity-75">({count})</span>}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 w-full border-b bg-white/90 backdrop-blur">
        <nav className="mx-auto w-full max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
              <div className="text-white text-sm font-bold">L</div>
            </div>
            <span className="text-xl font-bold tracking-tight">Learnly</span>
          </div>
          <div className="text-sm text-gray-600 font-medium">AI-powered study companion</div>
        </nav>
      </header>

      {/* HERO */}
      <section className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Transform je cursus in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                slimme studiematerialen
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Upload je PDF's of plak tekst. Onze AI maakt automatisch flashcards, samenvattingen, 
              quizzes en examenvragen om je studie-ervaring te verbeteren.
            </p>
          </div>
        </div>
      </section>

      {/* INPUT SECTION */}
      <section className="w-full py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-white rounded-3xl shadow-lg border">
            <div className="border-b px-8 py-6">
              <h2 className="text-2xl font-bold mb-2">Upload je cursusmateriaal</h2>
              <p className="text-gray-600">Kies een PDF bestand of plak tekst om te beginnen</p>
            </div>
            
            <div className="p-8">
              {/* File Upload */}
              <div className="mb-8">
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-2xl hover:border-black transition-colors flex flex-col items-center justify-center gap-2 disabled:opacity-50"
                >
                  <div className="text-2xl">📁</div>
                  <span className="font-medium text-gray-700">
                    {isProcessing ? "PDF verwerken..." : "Klik om PDF te uploaden"}
                  </span>
                </button>
              </div>

              <div className="text-center text-gray-500 font-medium mb-8">OF</div>

              {/* Text Input */}
              <textarea
                className="w-full h-80 rounded-2xl border-2 border-gray-200 px-6 py-4 outline-none focus:border-black transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Plak hier je cursustekst, samenvattingen, aantekeningen..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={generateFlashcards}
                  disabled={!text.trim() || isProcessing}
                  className="bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? "Genereren..." : "📚 Flashcards"}
                </button>
                <button
                  onClick={generateQuiz}
                  disabled={!text.trim() || isProcessing}
                  className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? "Genereren..." : "🧠 Quiz"}
                </button>
                <button
                  onClick={generateSummary}
                  disabled={!text.trim() || isProcessing}
                  className="bg-green-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? "Genereren..." : "📝 Samenvatting"}
                </button>
                <button
                  onClick={generateExamQuestions}
                  disabled={!text.trim() || isProcessing}
                  className="bg-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? "Genereren..." : "🎯 Examenvragen"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      {(cards.length > 0 || quiz.length > 0 || summary || examQuestions.length > 0) && (
        <section className="w-full py-8">
          <div className="mx-auto max-w-7xl px-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border w-fit">
              {cards.length > 0 && <TabButton id="flashcards" label="Flashcards" count={cards.length} />}
              {quiz.length > 0 && <TabButton id="quiz" label="Quiz" count={quiz.length} />}
              {summary && <TabButton id="summary" label="Samenvatting" count={0} />}
              {examQuestions.length > 0 && <TabButton id="exam" label="Examenvragen" count={examQuestions.length} />}
            </div>

            {/* Flashcards Tab */}
            {activeTab === "flashcards" && cards.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
                    <div className="font-bold text-lg text-black mb-4">{card.q}</div>
                    <div className="text-gray-700 leading-relaxed">{card.a}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === "quiz" && quiz.length > 0 && (
              <div className="space-y-6">
                {quiz.map((q, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border">
                    <div className="font-bold text-lg mb-4">{q.q}</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {q.opts.map((opt, j) => (
                        <div
                          key={j}
                          className={`p-4 rounded-xl border-2 transition-colors ${
                            j === q.correct 
                              ? "border-green-500 bg-green-50 text-green-800" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="font-semibold">{String.fromCharCode(65 + j)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Summary Tab */}
            {activeTab === "summary" && summary && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="prose max-w-none">
                  {summary.split('\n').map((line, i) => (
                    <div key={i} className="mb-3">
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <h3 className="font-bold text-xl text-black">{line.slice(2, -2)}</h3>
                      ) : line.startsWith('**') ? (
                        <h4 className="font-semibold text-lg text-black mt-4">{line.slice(2)}</h4>
                      ) : line.startsWith('- ') ? (
                        <li className="text-gray-700 ml-4">{line.slice(2)}</li>
                      ) : line.match(/^\d+\./) ? (
                        <div className="text-gray-700 font-medium">{line}</div>
                      ) : line.trim() ? (
                        <p className="text-gray-700 leading-relaxed">{line}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exam Questions Tab */}
            {activeTab === "exam" && examQuestions.length > 0 && (
              <div className="space-y-6">
                {examQuestions.map((eq, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-lg">
                        Vraag {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {eq.points} punten
                      </span>
                    </div>
                    <div className="font-medium text-gray-900 leading-relaxed">{eq.q}</div>
                    <div className="mt-4 h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                      Ruimte voor antwoord...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FEATURES PREVIEW */}
      {!cards.length && !quiz.length && !summary && !examQuestions.length && (
        <section className="w-full py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Wat kan Learnly voor je doen?</h2>
              <p className="text-gray-600 text-lg">Ontdek alle manieren waarop AI je studie kan verbeteren</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold mb-2">Smart Flashcards</h3>
                <p className="text-sm text-gray-600">AI extraheert de belangrijkste begrippen en maakt automatisch flashcards</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold mb-2">Slimme Samenvattingen</h3>
                <p className="text-sm text-gray-600">Lange hoofdstukken worden omgezet in bondige, begrijpbare samenvattingen</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-bold mb-2">Interactieve Quizzes</h3>
                <p className="text-sm text-gray-600">Test je kennis met automatisch gegenereerde meerkeuzevragen</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">Examenvragen</h3>
                <p className="text-sm text-gray-600">Oefen met realistische examenvragen gebaseerd op je cursusmateriaal</p>
              </div>
            </div>

            {/* Coming Soon Features */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">🚀 Binnenkort beschikbaar</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">Progress Tracking</div>
                  <div className="text-sm text-gray-600">Houd je studievooruitgang bij</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-semibold">Study Groups</div>
                  <div className="text-sm text-gray-600">Studeer samen met medestudenten</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🎙️</div>
                  <div className="font-semibold">Voice Notes</div>
                  <div className="text-sm text-gray-600">Audio naar flashcards</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-8 rounded-xl bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
                  <div className="text-white text-sm font-bold">L</div>
                </div>
                <span className="text-xl font-bold">Learnly</span>
              </div>
              <p className="text-gray-600 mb-4">
                De slimste studiecompagnon voor KU Leuven studenten. 
                Transformeer je cursussen in interactieve leermaterialen met AI.
              </p>
              <div className="text-sm text-gray-500">
                Gemaakt met ❤️ door KU Leuven studenten
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Flashcards Generator</li>
                <li>Smart Samenvattingen</li>
                <li>Quiz Creator</li>
                <li>Examenvragen</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Feedback</li>
                <li>Bug Report</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Learnly - AI Study Companion voor KU Leuven
          </div>
        </div>
      </footer>
    </div>
  );
}
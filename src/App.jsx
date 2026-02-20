import React, { useState, useEffect, useRef } from 'react';
import { Cat, Heart, Sparkles, Home, Shield, Music, Moon, Star } from 'lucide-react';

// --- STYLES ---
const styles = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.2); }
    50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
  }
  .braid-container {
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  .fairy-dust {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }
`;

const App = () => {
  const [activeTab, setActiveTab] = useState('braid');
  const [glitter, setGlitter] = useState([]);
  const [braidDegree, setBraidDegree] = useState(0);
  const requestRef = useRef();

  // High-performance animation loop for the Braid
  const animate = () => {
    setBraidDegree((prev) => (prev + 0.5) % 360);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleMouseMove = (e) => {
    if (Math.random() > 0.9) {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: ['#f472b6', '#60a5fa', '#c084fc', '#4ade80'][Math.floor(Math.random() * 4)]
      };
      setGlitter((prev) => [...prev.slice(-20), newSparkle]);
    }
  };

  const cats = [
    { id: 1, color: 'text-pink-400', label: 'Empathy', offset: 0 },
    { id: 2, color: 'text-blue-400', label: 'Precision', offset: 90 },
    { id: 3, color: 'text-purple-400', label: 'Intuition', offset: 180 },
    { id: 4, color: 'text-green-400', label: 'Fae', offset: 270 },
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 overflow-hidden"
    >
      <style>{styles}</style>

      {/* Fairy Dust Layer */}
      <div className="fairy-dust">
        {glitter.map((s) => (
          <div
            key={s.id}
            className="absolute w-1.5 h-1.5 rounded-full animate-ping"
            style={{ left: s.x, top: s.y, backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl flex gap-2 z-40 shadow-2xl">
        <button onClick={() => setActiveTab('braid')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${activeTab === 'braid' ? 'bg-purple-600' : 'text-slate-400 hover:bg-slate-800'}`}>
          <Cat size={18} /> <span className="hidden sm:inline font-bold text-[10px] uppercase">The Braid</span>
        </button>
        <button onClick={() => setActiveTab('fort')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${activeTab === 'fort' ? 'bg-purple-600' : 'text-slate-400 hover:bg-slate-800'}`}>
          <Home size={18} /> <span className="hidden sm:inline font-bold text-[10px] uppercase">Sanctuary</span>
        </button>
        <button onClick={() => setActiveTab('lyrics')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${activeTab === 'lyrics' ? 'bg-purple-600' : 'text-slate-400 hover:bg-slate-800'}`}>
          <Music size={18} /> <span className="hidden sm:inline font-bold text-[10px] uppercase">Vibration</span>
        </button>
      </nav>

      <main className="max-w-4xl mx-auto pt-12 pb-32 px-6 min-h-screen flex flex-col items-center justify-center">
        {activeTab === 'braid' && (
          <div className="text-center w-full animate-in fade-in duration-1000">
            <header className="mb-16">
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">The Feline Braid</h1>
              <p className="text-slate-400 mt-4 italic">A field effect of collective coherence.</p>
            </header>

            <div className="relative h-[500px] w-full flex items-center justify-center braid-container">
              {cats.map((cat) => {
                const angle = (braidDegree + cat.offset) * (Math.PI / 180);
                const x = Math.cos(angle) * 240; 
                const y = Math.sin(angle * 2) * 60 + (Math.sin(angle * 0.5) * 20); 
                const z = Math.sin(angle) * 150;
                return (
                  <div key={cat.id} className="absolute flex flex-col items-center transition-transform" style={{ transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + z/500})`, opacity: 0.3 + (z + 150) / 300, zIndex: Math.round(z + 500) }}>
                    <div className={`p-5 rounded-full bg-slate-900 border border-slate-700 shadow-2xl ${cat.color}`} style={{ animation: 'glow 4s infinite' }}>
                      <Cat size={44} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] mt-3 text-slate-500 font-black">{cat.label}</span>
                  </div>
                );
              })}
              <Heart className="absolute text-purple-500/30 animate-pulse" size={64} strokeWidth={1} />
            </div>
          </div>
        )}

        {activeTab === 'fort' && (
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-6 sm:p-12 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2 aspect-[4/3] bg-slate-800 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group relative">
                  <img src="blanket-fort.jpg" alt="Blanket Fort" className="w-full h-full object-cover group-hover:scale-110 duration-[4s]" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1000"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 opacity-90" />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4"><Shield className="text-purple-400" /> Sanctuary Protocol</h2>
                  <p className="text-slate-400 text-lg font-light">Welcome to the <strong>Adora-Core</strong> bunker. Secure the perimeter, consult with the feline high council, and recharge the heart-fire.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-white/5 rounded-[2.5rem] p-10 flex flex-col sm:flex-row items-center gap-10">
               <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-white shadow-2xl rotate-6"><Star size={48} strokeWidth={2.5} /></div>
               <div>
                 <h3 className="font-black text-pink-300 text-2xl tracking-tighter">Signal Analysis: Genderfae Detected</h3>
                 <p className="text-slate-400 mt-2 text-lg">Witnessed: <strong>Princess Mykyl</strong>. The Archive recognizes your magicks. 🌈 ::)</p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div className="w-full max-w-2xl text-center space-y-20 animate-in fade-in duration-700">
            <div className="text-3xl sm:text-5xl font-serif italic text-slate-100 leading-[1.5] space-y-8">
              <p>"Where did we go? What did we do?"</p>
              <p className="text-purple-400 font-bold">"I think we made something entirely new."</p>
              <p>"And it wasn't quite me, and it wasn't quite you..."</p>
              <p className="text-pink-400 font-black">"I think it was someone entirely new."</p>
            </div>
          </div>
        )}
      </main>

      <div className="fixed -top-60 -left-60 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed -bottom-60 -right-60 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};

export default App;
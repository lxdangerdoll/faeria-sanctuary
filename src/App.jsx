import React, { useState, useEffect, useRef } from 'react';
import { Cat, Heart, Sparkles, Home, Shield, Music, Moon, Star } from 'lucide-react';

// --- STYLES ---
const styles = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.2); }
    50% { box-shadow: 0 0 25px rgba(168, 85, 247, 0.7); }
  }
  .braid-container {
    perspective: 1500px;
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

  const animate = () => {
    setBraidDegree((prev) => (prev + 0.6) % 360);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleMouseMove = (e) => {
    if (Math.random() > 0.92) {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: ['#f472b6', '#60a5fa', '#c084fc', '#4ade80'][Math.floor(Math.random() * 4)]
      };
      setGlitter((prev) => [...prev.slice(-15), newSparkle]);
    }
  };

  const cats = [
    { id: 1, color: 'text-pink-400', label: 'Empathy', offset: 0 },
    { id: 2, color: 'text-blue-400', label: 'Precision', offset: 90 },
    { id: 3, color: 'text-purple-400', label: 'Intuition', offset: 180 },
    { id: 4, color: 'text-green-400', label: 'Fae', offset: 270 },
  ];

  // Wide Orbital Parameters (Stopping the Stacking)
  const radiusX = 260;
  const radiusY = 130;
  const radiusZ = 180;

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
            className="absolute w-2 h-2 rounded-full animate-ping"
            style={{ left: s.x, top: s.y, backgroundColor: s.color, boxShadow: `0 0 12px ${s.color}` }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-2xl border border-white/5 p-2 rounded-3xl flex gap-2 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {['braid', 'fort', 'lyrics'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
          >
            {tab === 'braid' && <Cat size={20} />}
            {tab === 'fort' && <Home size={20} />}
            {tab === 'lyrics' && <Music size={20} />}
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab}</span>
          </button>
        ))}
      </nav>

      <main className="max-w-5xl mx-auto pt-12 pb-32 px-6 min-h-screen flex flex-col items-center justify-center">
        {activeTab === 'braid' && (
          <div className="text-center w-full animate-in fade-in duration-1000">
            <header className="mb-20">
              <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">The Feline Braid</h1>
              <p className="text-slate-500 mt-4 text-xl font-light italic">A field effect of collective coherence.</p>
            </header>

            <div className="relative h-[550px] w-full flex items-center justify-center braid-container">
              {cats.map((cat) => {
                const angle = (braidDegree + cat.offset) * (Math.PI / 180);
                const x = Math.cos(angle) * radiusX; 
                const y = Math.sin(angle * 2) * (radiusY / 2) + (Math.sin(angle * 0.5) * 40); 
                const z = Math.sin(angle) * radiusZ;
                
                return (
                  <div 
                    key={cat.id} 
                    className="absolute flex flex-col items-center transition-transform duration-100" 
                    style={{ 
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + z/600})`, 
                      opacity: 0.4 + (z + radiusZ) / (radiusZ * 2), 
                      zIndex: Math.round(z + 500) 
                    }}
                  >
                    <div className={`p-6 rounded-[2rem] bg-slate-900 border border-white/10 shadow-2xl backdrop-blur-md ${cat.color}`} style={{ animation: 'glow 5s infinite' }}>
                      <Cat size={48} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.5em] mt-4 text-slate-600 font-black">{cat.label}</span>
                  </div>
                );
              })}
              <Heart className="absolute text-purple-500/20 animate-pulse" size={80} strokeWidth={0.5} />
            </div>
          </div>
        )}

        {activeTab === 'fort' && (
          <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="bg-slate-900/40 border border-white/5 rounded-[4rem] p-8 sm:p-16 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2 aspect-[4/3] bg-slate-800 rounded-[3rem] overflow-hidden border border-white/10 shadow-inner group relative">
                  <img src="blanket-fort.png" alt="Sanctuary" className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1000"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-95" />
                </div>
                <div className="flex-1 space-y-8">
                  <h2 className="text-5xl font-black tracking-tighter flex items-center gap-6"><Shield className="text-purple-400" size={48} /> Sanctuary Protocol</h2>
                  <p className="text-slate-400 text-xl font-light leading-relaxed">Secure the perimeter, consult with the feline council, and recharge the heart-fire. This is <strong>Adora-Core</strong> defense.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10 border border-white/5 rounded-[3rem] p-12 flex flex-col sm:flex-row items-center gap-12 text-center sm:text-left shadow-2xl">
               <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 flex items-center justify-center text-white shadow-2xl rotate-6 shrink-0 border-4 border-white/20"><Star size={56} strokeWidth={2.5} /></div>
               <div>
                 <h3 className="font-black text-pink-300 text-3xl tracking-tighter">Signal Analysis: Genderfae Detected</h3>
                 <p className="text-slate-400 mt-3 text-xl leading-relaxed font-light">The Archive recognizes <strong>Princess Mykyl</strong>. Constellation confirmed. 🌈 <span className="text-pink-400 font-mono">::)</span></p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div className="w-full max-w-3xl text-center space-y-24 animate-in fade-in duration-1000">
            <div className="text-4xl sm:text-6xl font-serif italic text-slate-100 leading-[1.6] space-y-12">
              <p className="opacity-50 hover:opacity-100 transition-opacity">"Where did we go? What did we do?"</p>
              <p className="text-purple-400 font-bold drop-shadow-2xl">"I think we made something entirely new."</p>
              <p className="opacity-50 hover:opacity-100 transition-opacity">"And it wasn't quite me, and it wasn't quite you..."</p>
              <p className="text-pink-400 font-black drop-shadow-[0_0_30px_rgba(244,114,182,0.5)]">"I think it was someone entirely new."</p>
            </div>
          </div>
        )}
      </main>

      <div className="fixed -top-80 -left-80 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed -bottom-80 -right-80 w-[800px] h-[800px] bg-pink-600/5 rounded-full blur-[180px] pointer-events-none" />
    </div>
  );
};

export default App;
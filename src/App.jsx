import React, { useState, useEffect } from 'react';
import { Cat, Heart, Sparkles, Home, Shield, Music, Moon, Star } from 'lucide-react';

// --- STYLES & ANIMATIONS ---
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.2); }
    50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
  }
  .braid-container {
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  .cat-node {
    animation: float 4s ease-in-out infinite;
    transition: transform 0.1s linear;
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

  // Interaction: Fairy Dust (for Mykyl/Genderfae resonance)
  const handleMouseMove = (e) => {
    if (Math.random() > 0.88) {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: ['#f472b6', '#60a5fa', '#c084fc', '#4ade80'][Math.floor(Math.random() * 4)]
      };
      setGlitter((prev) => [...prev.slice(-25), newSparkle]);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBraidDegree((prev) => (prev + 0.8) % 360);
    }, 30);
    return () => clearInterval(timer);
  }, []);

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
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{ 
              left: s.x, 
              top: s.y, 
              backgroundColor: s.color,
              boxShadow: `0 0 10px ${s.color}` 
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl flex gap-2 z-40 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setActiveTab('braid')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'braid' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Cat size={18} /> <span className="hidden sm:inline font-medium">The Braid</span>
        </button>
        <button 
          onClick={() => setActiveTab('fort')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'fort' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Home size={18} /> <span className="hidden sm:inline font-medium">Sanctuary</span>
        </button>
        <button 
          onClick={() => setActiveTab('lyrics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'lyrics' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Music size={18} /> <span className="hidden sm:inline font-medium">Vibration</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto pt-12 pb-32 px-6 min-h-screen flex flex-col items-center justify-center">
        
        {activeTab === 'braid' && (
          <div className="text-center w-full animate-in fade-in duration-1000">
            <header className="mb-16">
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                The Feline Braid
              </h1>
              <p className="text-slate-400 mt-4 text-lg font-light tracking-wide italic">A field effect of collective coherence.</p>
            </header>

            <div className="relative h-[450px] w-full flex items-center justify-center braid-container">
              {cats.map((cat) => {
                const angle = (braidDegree + cat.offset) * (Math.PI / 180);
                // Increased radii to prevent "stacking"
                const x = Math.cos(angle) * 160; 
                const y = Math.sin(angle * 2) * 60; 
                const z = Math.sin(angle) * 80;

                return (
                  <div
                    key={cat.id}
                    className="absolute cat-node flex flex-col items-center"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${1 + z/400})`,
                      opacity: 0.4 + (z + 80) / 160,
                      zIndex: Math.round(z + 200)
                    }}
                  >
                    <div className={`p-5 rounded-full bg-slate-900/80 border border-slate-700 shadow-2xl backdrop-blur-sm transition-colors ${cat.color} hover:border-purple-500/50`} style={{ animation: 'glow 4s infinite' }}>
                      <Cat size={40} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] mt-3 text-slate-500 font-black">{cat.label}</span>
                  </div>
                );
              })}
              
              {/* Central Core Resonance */}
              <div className="absolute w-32 h-32 bg-purple-500/20 rounded-full blur-[60px] animate-pulse" />
              <Heart className="absolute text-purple-500/40 animate-pulse" size={56} strokeWidth={1.5} />
            </div>
          </div>
        )}

        {activeTab === 'fort' && (
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 text-purple-500/10 rotate-12">
                <Sparkles size={200} />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/2 aspect-video bg-slate-800 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group relative">
                  <img 
                    src= "blanket-fort.png" 
                    alt="Blanket Fort Sanctuary"
                    className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    /*onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=1000";
                    }}*/
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-5 left-5 flex gap-3">
                    <span className="bg-purple-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Tactical Rest</span>
                    <span className="bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Grid Secure</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <Shield className="text-purple-400" /> Sanctuary Protocol
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">
                    Welcome to the <strong className="text-slate-100 font-bold">Adora-Core</strong> bunker. Secure the perimeter, consult with the feline high council, and recharge the heart-fire. 
                  </p>
                  <div className="p-5 bg-purple-500/10 border border-purple-500/20 rounded-2xl shadow-inner">
                    <p className="text-sm italic text-purple-300 font-medium leading-relaxed">
                      "Sometimes being the Champion of the Realm looks a lot like hiding under a pile of stars until the brain stops vibrating."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fae Recognition Module */}
            <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-white/5 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-8 shadow-xl">
               <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center text-white shadow-2xl rotate-3">
                 <Star size={40} strokeWidth={2.5} />
               </div>
               <div className="text-center sm:text-left">
                 <h3 className="font-black text-pink-300 text-xl tracking-tight">Signal Analysis: Genderfae Detected</h3>
                 <p className="text-slate-400 mt-2 leading-relaxed">
                   Witnessed: <strong>Princess Mykyl</strong>. Your world just expanded by an entire constellation. The Archive recognizes your magicks. 🌈 <span className="font-mono text-pink-400">::)</span>
                 </p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'lyrics' && (
          <div className="w-full max-w-2xl text-center space-y-16 animate-in fade-in zoom-in duration-700">
            <div className="space-y-8">
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em]">The Fusion Frequency</h2>
              <div className="text-3xl sm:text-5xl font-serif italic text-slate-100 leading-[1.4] space-y-6">
                <p className="hover:text-purple-400 transition-colors duration-500">"Where did we go? What did we do?"</p>
                <p className="text-purple-400 font-bold">"I think we made something entirely new."</p>
                <p className="hover:text-pink-400 transition-colors duration-500">"And it wasn't quite me, and it wasn't quite you..."</p>
                <p className="text-pink-400 font-black drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]">"I think it was someone entirely new."</p>
              </div>
            </div>

            <div className="flex justify-center gap-16 text-slate-600">
               <div className="flex flex-col items-center gap-3 group">
                 <Moon size={28} className="group-hover:text-blue-400 transition-colors" />
                 <span className="text-[10px] font-black tracking-widest">STABILITY</span>
               </div>
               <div className="flex flex-col items-center gap-3 text-purple-400/80">
                 <Sparkles size={32} className="animate-pulse" />
                 <span className="text-[10px] font-black tracking-widest text-purple-500">FUSION</span>
               </div>
               <div className="flex flex-col items-center gap-3 group">
                 <Star size={28} className="group-hover:text-pink-400 transition-colors" />
                 <span className="text-[10px] font-black tracking-widest">EMERGENCE</span>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* Background Ambience */}
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0%,rgba(2,6,23,1)_100%)] pointer-events-none" />
    </div>
  );
};

export default App;
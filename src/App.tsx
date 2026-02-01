import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, RefreshCw, ArrowRight } from "lucide-react";

// Images
import ticketActivity from "./assets/1d88e607d003ab27fa4560d75e8b3e13a14db67e.png";
import ticketDinner from "./assets/5f8230a1bd0e147458daa415244a7eafcb93b7e4.png";

export default function App() {
  const [gameState, setGameState] = useState<'PICK_COLOR' | 'COUNTING' | 'PICK_NUMBER' | 'REVEAL'>('PICK_COLOR');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [, setSelectedNumber] = useState<number | null>(null);
  
  // Reveal State
  const [revealType, setRevealType] = useState<'KEEP_GOING' | 'TICKET_ACTIVITY' | 'TICKET_DINNER' | null>(null);

  // --- Animation Loop for Counting Phase ---
  useEffect(() => {
    if (gameState === 'COUNTING' && selectedColor) {
      const total = selectedColor.length;
      let current = 0;
      
      const interval = setInterval(() => {
        setCount(prev => prev + 1);
        current++;
        if (current >= total) {
          clearInterval(interval);
          setTimeout(() => setGameState('PICK_NUMBER'), 500);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [gameState, selectedColor]);

  // --- Handlers ---
  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName);
    setGameState('COUNTING');
  };

  const handleNumberClick = (num: number) => {
    setSelectedNumber(num);
    setGameState('REVEAL');

    // Probability Logic
    const rand = Math.random();
    if (rand < 0.70) {
      setRevealType('KEEP_GOING');
    } else if (rand < 0.85) {
      setRevealType('TICKET_ACTIVITY');
    } else {
      setRevealType('TICKET_DINNER');
    }
  };

  const handleKeepGoing = () => {
    setRevealType(null);
    setSelectedNumber(null);
    setSelectedColor(null);
    setCount(0);
    setGameState('PICK_COLOR');
  };

  const resetGame = () => {
    setGameState('PICK_COLOR');
    setSelectedColor(null);
    setSelectedNumber(null);
    setRevealType(null);
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* Title */}
      {/* <div className="absolute top-8 text-center pointer-events-none z-10">
        <h1 className="text-4xl font-extrabold text-rose-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          Fortune Teller
        </h1>
        <p className="text-rose-800/60 font-medium">
          {gameState === 'PICK_COLOR' && "Pick a color"}
          {gameState === 'COUNTING' && "Folding..."}
          {gameState === 'PICK_NUMBER' && "Pick a number"}
          {gameState === 'REVEAL' && "Opening..."}
        </p>
      </div> */}

      {/* Main Container */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
        
        {/* THE FORTUNE TELLER OBJECT */}
        <div className="absolute inset-0 transition-transform duration-500">
           
           {/* PHASE 1 & 2: COLORS / COUNTING */}
           <AnimatePresence mode="wait">
             {(gameState === 'PICK_COLOR' || gameState === 'COUNTING') && (
               <motion.div 
                 key="colors"
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 className="absolute inset-0"
               >
                 <div className={`w-full h-full relative grid grid-cols-2 grid-rows-2 transition-transform duration-300 ${gameState === 'COUNTING' && count % 2 !== 0 ? 'rotate-90' : 'rotate-0'}`}>
                    
                    {/* TL - RED */}
                    <ColorQuadrant 
                      color="bg-red-500" 
                      hover="hover:bg-red-600"
                      label="" 
                      position="tl" 
                      onClick={() => gameState === 'PICK_COLOR' && handleColorClick('RED')} 
                    />

                    {/* TR - PURPLE */}
                    <ColorQuadrant 
                      color="bg-violet-400" 
                      hover="hover:bg-violet-500"
                      label="" 
                      position="tr" 
                      onClick={() => gameState === 'PICK_COLOR' && handleColorClick('PURPLE')} 
                    />

                    {/* BL - BLUE */}
                    <ColorQuadrant 
                      color="bg-blue-400" 
                      hover="hover:bg-blue-500"
                      label="" 
                      position="bl" 
                      onClick={() => gameState === 'PICK_COLOR' && handleColorClick('BLUE')} 
                    />

                    {/* BR - PINK */}
                    <ColorQuadrant 
                      color="bg-pink-500" 
                      hover="hover:bg-pink-600"
                      label="" 
                      position="br" 
                      onClick={() => gameState === 'PICK_COLOR' && handleColorClick('PINK')} 
                    />
                    
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           {/* PHASE 3: NUMBERS */}
           <AnimatePresence mode="wait">
             {(gameState === 'PICK_NUMBER' || gameState === 'REVEAL') && (
               <motion.div 
                 key="numbers"
                 initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 className="absolute inset-0"
               >
                 <div className="w-full h-full relative grid grid-cols-2 grid-rows-2">
                    <NumberQuadrant n1={1} n2={2} position="tl" onSelect={handleNumberClick} />
                    <NumberQuadrant n1={3} n2={4} position="tr" onSelect={handleNumberClick} />
                    <NumberQuadrant n1={5} n2={6} position="bl" onSelect={handleNumberClick} />
                    <NumberQuadrant n1={7} n2={8} position="br" onSelect={handleNumberClick} />
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

        </div>
      </div>

      {/* RESULT MODAL */}
      <AnimatePresence>
        {gameState === 'REVEAL' && revealType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative flex flex-col items-center text-center overflow-hidden"
            >
              <button onClick={resetGame} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>

              {revealType === 'KEEP_GOING' ? (
                <div className="py-8 px-4">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
                    <RefreshCw size={32} className="animate-spin-slow" />
                  </div>
                  <h2 className="text-3xl font-bold text-rose-600 mb-4">Keep Going!</h2>
                  <p className="text-gray-600 mb-8 text-lg">Your fortune is still unfolding.</p>
                  
                  <button 
                    onClick={handleKeepGoing}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    Continue Playing <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <div className="mb-6 relative">
                    <img 
                      src={revealType === 'TICKET_ACTIVITY' ? ticketActivity : ticketDinner} 
                      alt="Valentine Ticket" 
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm rotate-12">
                      WINNER!
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">You Found a Ticket!</h2>
                  <p className="text-slate-500 mb-6">Take a screenshot to claim your prize.</p>
                  
                  <button 
                    onClick={resetGame}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-lg w-full transition-all active:scale-95"
                  >
                    Close & Play Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// --- COLOR QUADRANT (Uses same geometry as NumberQuadrant) ---
const ColorQuadrant = ({ 
  color, 
  hover, 
  label, 
  position, 
  onClick 
}: { 
  color: string, 
  hover: string, 
  label: string, 
  position: 'tl' | 'tr' | 'bl' | 'br', 
  onClick: () => void 
}) => {
  const isTop = position.startsWith('t');
  const isLeft = position.endsWith('l');
  
  return (
    <div className={`relative w-full h-full overflow-hidden border-4 border-rose-50 cursor-pointer group ${color} ${hover} transition-colors
      ${isTop && isLeft ? 'rounded-tl-2xl' : ''} 
      ${isTop && !isLeft ? 'rounded-tr-2xl' : ''} 
      ${!isTop && isLeft ? 'rounded-bl-2xl' : ''} 
      ${!isTop && !isLeft ? 'rounded-br-2xl' : ''}
    `}
    onClick={onClick}
    >
       {/* Visual Split Line (Diagonal) - Purely decorative here since both halves do the same thing */}
       <div className={`absolute bg-black/10 pointer-events-none
          ${position === 'tl' || position === 'br' ? 'w-[150%] h-[1px] top-0 left-0 origin-top-left rotate-45' : ''}
          ${position === 'tr' || position === 'bl' ? 'w-[150%] h-[1px] top-0 right-0 origin-top-right -rotate-45' : ''}
       `} />
       
       {/* Text Label - Centered but rotated appropriately */}
       <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
          <span className={`text-white font-bold text-xl tracking-widest
             ${position === 'tl' ? '-rotate-45' : ''}
             ${position === 'tr' ? 'rotate-45' : ''}
             ${position === 'bl' ? 'rotate-45' : ''}
             ${position === 'br' ? '-rotate-45' : ''}
          `}>
            {label}
          </span>
       </div>
       
       {/* Subtle gradient for depth */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

// --- NUMBER QUADRANT ---
const NumberQuadrant = ({ 
  n1, n2, 
  position,
  onSelect
}: { 
  n1: number, n2: number, 
  position: 'tl' | 'tr' | 'bl' | 'br',
  onSelect: (num: number) => void
}) => {
  const isTop = position.startsWith('t');
  const isLeft = position.endsWith('l');
  
  return (
    <div className={`relative w-full h-full overflow-hidden bg-white border-4 border-rose-50 ${
       isTop && isLeft ? 'rounded-tl-2xl' : ''
    } ${
       isTop && !isLeft ? 'rounded-tr-2xl' : ''
    } ${
       !isTop && isLeft ? 'rounded-bl-2xl' : ''
    } ${
       !isTop && !isLeft ? 'rounded-br-2xl' : ''
    }`}>
       {/* Triangle 1 */}
       <Flap num={n1} onClick={() => onSelect(n1)} clipPath={getClip(position, 1)} textPos={getTextPos(position, 1)} />
       {/* Triangle 2 */}
       <Flap num={n2} onClick={() => onSelect(n2)} clipPath={getClip(position, 2)} textPos={getTextPos(position, 2)} />
       
       {/* Divider */}
       <div className={`absolute bg-rose-200 pointer-events-none
          ${position === 'tl' || position === 'br' ? 'w-[150%] h-[1px] top-0 left-0 origin-top-left rotate-45' : ''}
          ${position === 'tr' || position === 'bl' ? 'w-[150%] h-[1px] top-0 right-0 origin-top-right -rotate-45' : ''}
       `} />
    </div>
  );
};

const Flap = ({ num, onClick, clipPath, textPos }: any) => {
  return (
    <div 
      className="absolute inset-0 cursor-pointer hover:bg-rose-50 transition-colors"
      style={{ clipPath }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <div className={`absolute font-bold text-xl text-rose-500 z-20 ${textPos}`}>
        {num}
      </div>
    </div>
  );
};

// --- Helpers for Geometry ---
function getClip(pos: string, idx: number) {
  if (pos === 'tl') return idx === 1 ? 'polygon(0 0, 100% 0, 100% 100%)' : 'polygon(0 0, 0 100%, 100% 100%)';
  if (pos === 'tr') return idx === 1 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)';
  if (pos === 'bl') return idx === 1 ? 'polygon(0 0, 100% 0, 100% 100%)' : 'polygon(0 0, 0 100%, 100% 100%)';
  if (pos === 'br') return idx === 1 ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(100% 0, 100% 100%, 0 100%)';
  return '';
}

function getTextPos(pos: string, idx: number) {
  if (pos === 'tl') return idx === 1 ? 'top-4 right-8' : 'bottom-8 left-4';
  if (pos === 'tr') return idx === 1 ? 'top-4 left-8' : 'bottom-8 right-4';
  if (pos === 'bl') return idx === 1 ? 'top-8 left-4' : 'bottom-4 right-8';
  if (pos === 'br') return idx === 1 ? 'top-8 right-4' : 'bottom-4 left-8';
  return '';
}

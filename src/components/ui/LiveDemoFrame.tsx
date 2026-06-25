import { useState, useEffect, useRef } from "react";
import { Video, RefreshCw, AlertTriangle, ExternalLink, Activity } from "lucide-react";

type LiveDemoFrameProps = {
  title: string;
  url: string | null;
  accent?: "green" | "blue" | "violet" | "yellow";
};

export default function LiveDemoFrame({
  title,
  url,
  accent = "blue",
}: LiveDemoFrameProps) {
  const [viewMode, setViewMode] = useState<"blueprint" | "live">(url ? "live" : "blueprint");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // InvoiceFlow states
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-089", rec: "TATA MOTORS", val: 1240000, status: "Awaiting Verification", date: "2026-06-21" },
    { id: "INV-2026-074", rec: "RELIANCE IND", val: 850000, status: "Awaiting Verification", date: "2026-06-24" },
    { id: "INV-2026-051", rec: "INFOSYS TECH", val: 1560000, status: "Funded", date: "2026-05-18" }
  ]);
  const [discountedLimit, setDiscountedLimit] = useState(1560000);
  const [verifiedCount, setVerifiedCount] = useState(1);

  // Jarvis states
  const [jarvisLogs, setJarvisLogs] = useState<string[]>([
    "~/jarvis/core $ boot.system()",
    "SYSTEM_INIT // LOCALHOST // ACTIVE",
    "Groq API connection verified (Llama-3-70b)",
    "Awaiting command input..."
  ]);
  const [jarvisIsListening, setJarvisIsListening] = useState(false);
  const [jarvisSphereScale, setJarvisSphereScale] = useState(1);

  // Friday states
  const [fridayActive, setFridayActive] = useState(false);
  const [fridayCoordinates, setFridayCoordinates] = useState({ x: 120, y: 150 });
  const [trackedObject, setTrackedObject] = useState("User (Operator)");
  const viewportRef = useRef<HTMLDivElement>(null);

  // SortMySkills states
  const [atsScore, setAtsScore] = useState(78);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedSkills, setDetectedSkills] = useState(["React", "TypeScript", "Astro", "GSAP"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 5 seconds loading timeout for live frame
  useEffect(() => {
    if (isLoading && viewMode === "live" && url) {
      const timer = setTimeout(() => {
        setIsTimeout(true);
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, viewMode, url]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIsTimeout(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Border Accent Color mappings
  const borderColors = {
    green: "rgba(61, 217, 160, 0.22)",
    blue: "rgba(79, 124, 255, 0.22)",
    violet: "rgba(139, 92, 246, 0.22)",
    yellow: "rgba(255, 209, 102, 0.22)",
  };

  const glowColors = {
    green: "rgba(61, 217, 160, 0.12)",
    blue: "rgba(79, 124, 255, 0.12)",
    violet: "rgba(139, 92, 246, 0.12)",
    yellow: "rgba(255, 209, 102, 0.12)",
  };

  const textAccents = {
    green: "text-[#3dd9a0]",
    blue: "text-[#4f7cff]",
    violet: "text-[#8b5cf6]",
    yellow: "text-[#ffd166]",
  };

  const bgAccents = {
    green: "bg-[#3dd9a0]",
    blue: "bg-[#4f7cff]",
    violet: "bg-[#8b5cf6]",
    yellow: "bg-[#ffd166]",
  };

  const borderColor = borderColors[accent];
  const shadowColor = glowColors[accent];

  // MSME Invoicing logic: Click to approve invoice
  const verifyInvoice = (index: number) => {
    if (invoices[index].status === "Funded") return;
    const nextInvoices = [...invoices];
    nextInvoices[index].status = "Funded";
    setInvoices(nextInvoices);
    setDiscountedLimit(prev => prev + invoices[index].val);
    setVerifiedCount(prev => prev + 1);
  };

  // Jarvis command inputs
  const runJarvisCommand = (command: string) => {
    setJarvisLogs(prev => [...prev, `~/jarvis/core $ ${command}`]);
    
    setTimeout(() => {
      let response = "";
      if (command === "check.signal()") {
        response = "SIGNAL // OK // LATENCY < 15MS";
      } else if (command === "respond.fast()") {
        response = "GROQ_LLAMA_PIPELINE // SECURE_RESPONSE_INIT";
      } else if (command === "operator.status()") {
        response = "OPERATOR Yathin G: LEVEL_ADMIN // STACK_ACTIVE";
      } else if (command === "clear") {
        setJarvisLogs([]);
        return;
      } else {
        response = "EXECUTED // EXCELLENT";
      }
      setJarvisLogs(prev => [...prev, response]);
    }, 250);
  };

  // Friday coordinate mouse interaction
  const handleFridayMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fridayActive || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setFridayCoordinates({ x, y });
    
    // Random target object changes based on pointer
    if (x % 30 === 0) {
      const items = ["Operator's Retinal Vector", "Object: Keyboard Shell", "Gesture: Active Tracking", "Visual: Human Hand"];
      setTrackedObject(items[Math.floor((x / 30) % items.length)]);
    }
  };

  // SortMySkills resume scan simulator
  const startResumeScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    let progress = 78;
    const interval = setInterval(() => {
      progress += 4;
      setAtsScore(Math.min(progress, 96));
      if (progress >= 96) {
        clearInterval(interval);
        setIsScanning(false);
        setDetectedSkills(prev => [...prev, "Next.js", "Docker", "Node.js"]);
      }
    }, 200);
  };

  // Render InvoiceFlow Dashboard Simulation
  const renderInvoiceFlowSimulation = () => (
    <div className="w-full h-full p-4 bg-[#07080d] flex flex-col gap-3 font-mono text-[10px] text-[#9aa4b2] box-border select-none">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-bold text-[#3dd9a0]">INVOICE_FLOW // DECENTRALIZED FINTECH</span>
        <span className="bg-[#3dd9a0]/10 text-[#3dd9a0] px-1.5 py-0.5 rounded text-[8px] font-bold">MUTUAL DECK v2</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2">
          <div className="text-[8px] text-[#626b78]">TOTAL FUNDED LIMIT</div>
          <div className="text-[12px] font-bold text-white mt-1">₹{(discountedLimit / 100000).toFixed(2)}L</div>
        </div>
        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2">
          <div className="text-[8px] text-[#626b78]">VERIFIED ASSETS</div>
          <div className="text-[12px] font-bold text-[#3dd9a0] mt-1">{verifiedCount} // 3 ACTIVE</div>
        </div>
        <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2">
          <div className="text-[8px] text-[#626b78]">POOL INTEREST</div>
          <div className="text-[12px] font-bold text-cyan-400 mt-1">9.25% APR</div>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-lg p-2 flex justify-between items-center text-[9px]">
        <div>
          <div className="text-[8px] text-[#626b78]">TRANSACTION CHANNEL</div>
          <div className="text-white mt-0.5">MSME Invoice ➔ Discount Pool ➔ Ledger Ledger</div>
        </div>
        <div className="text-[#3dd9a0] font-bold">LEGAL CONTRACT SIGNED</div>
      </div>

      <div className="flex-1 bg-black/30 border border-white/5 rounded-lg p-2 flex flex-col overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1.2fr_1.1fr_1fr] text-[#626b78] border-b border-white/5 pb-1 mb-1.5 font-bold">
          <span>INVOICE ID</span>
          <span>BUYER</span>
          <span>VAL</span>
          <span>STATUS</span>
        </div>
        <div className="flex-grow overflow-y-auto flex flex-col gap-1.5 pr-1">
          {invoices.map((inv, i) => (
            <div key={inv.id} className="grid grid-cols-[1.5fr_1.2fr_1.1fr_1fr] items-center border-b border-white/[0.02] pb-1">
              <span className="text-white font-semibold">{inv.id}</span>
              <span>{inv.rec}</span>
              <span className="text-[#3dd9a0]">₹{inv.val.toLocaleString("en-IN")}</span>
              <div>
                {inv.status === "Funded" ? (
                  <span className="text-[#3dd9a0] font-bold">● FUNDED</span>
                ) : (
                  <button 
                    onClick={() => verifyInvoice(i)}
                    className="bg-[#3dd9a0]/15 hover:bg-[#3dd9a0]/30 border border-[#3dd9a0]/40 text-[#3dd9a0] text-[8px] px-1 py-0.5 rounded cursor-pointer transition-colors font-bold uppercase"
                  >
                    DISCOUNT
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render J.A.R.V.I.S Terminal Simulation
  const renderJarvisSimulation = () => (
    <div className="w-full h-full p-4 bg-[#030305] flex flex-col gap-3 font-mono text-[10px] text-[#9aa4b2] box-border select-none relative">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-bold text-[#ffd166]">J.A.R.V.I.S // LOCAL CO-PROCESSOR</span>
        <span className="bg-[#ffd166]/10 text-[#ffd166] px-1.5 py-0.5 rounded text-[8px] font-bold">CORE ONLINE</span>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_1.2fr] gap-3 overflow-hidden">
        {/* Left: Terminal Output */}
        <div className="bg-black/40 border border-white/5 rounded-lg p-2.5 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-1.5 select-text pr-1">
            {jarvisLogs.map((log, i) => (
              <div key={i} className={log.startsWith("~") ? "text-white/80" : log.includes("Error") ? "text-red-400" : "text-[#ffd166]"}>
                {log}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 border-t border-white/5 pt-1.5 mt-1.5 select-none">
            <span className="text-cyan-400">$</span>
            <input 
              type="text" 
              placeholder="Enter command..."
              className="bg-transparent border-none outline-none text-white text-[10px] w-full font-mono"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.currentTarget;
                  if (target.value.trim()) {
                    runJarvisCommand(target.value.trim());
                    target.value = "";
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Right: Soundwave Aura Sphere */}
        <div className="bg-[#07080d] border border-white/5 rounded-lg p-3 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div 
            className="w-24 h-24 rounded-full border border-[#ffd166]/30 flex items-center justify-center cursor-pointer transition-transform duration-300 relative group"
            style={{ 
              transform: `scale(${jarvisSphereScale})`,
              background: "radial-gradient(circle, rgba(255, 209, 102, 0.08) 0%, transparent 70%)" 
            }}
            onMouseEnter={() => {
              setJarvisSphereScale(1.1);
              setJarvisIsListening(true);
            }}
            onMouseLeave={() => {
              setJarvisSphereScale(1.0);
              setJarvisIsListening(false);
            }}
          >
            {/* Core center dot */}
            <div className="w-4 h-4 rounded-full bg-[#ffd166] shadow-[0_0_12px_#ffd166] animate-pulse"></div>
            
            {/* Pulse rings */}
            <div className="absolute inset-2 border border-[#ffd166]/20 rounded-full animate-ping" style={{ animationDuration: "2s" }}></div>
            <div className="absolute inset-[-6px] border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: "10s" }}></div>
          </div>
          
          <div className="text-center z-10">
            <div className="text-[#ffd166] font-bold tracking-wider">{jarvisIsListening ? "VOICE RECEPTION ACTIVE" : "VOICE ENGINE STANDBY"}</div>
            <div className="text-[8px] text-[#626b78] mt-1">Hover sphere to initiate voice channel</div>
          </div>

          <div className="flex gap-1.5">
            {["check.signal()", "respond.fast()", "clear"].map((cmd) => (
              <button 
                key={cmd}
                onClick={() => runJarvisCommand(cmd)}
                className="bg-white/5 hover:bg-[#ffd166]/10 border border-white/10 hover:border-[#ffd166]/30 text-white hover:text-[#ffd166] text-[8px] px-1.5 py-0.5 rounded cursor-pointer transition-all font-mono"
              >
                {cmd.replace("()", "")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render F.R.I.D.A.Y Camera & HUD Simulation
  const renderFridaySimulation = () => (
    <div className="w-full h-full p-4 bg-[#07080d] flex flex-col gap-3 font-mono text-[10px] text-[#9aa4b2] box-border select-none relative">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-bold text-[#8b5cf6]">F.R.I.D.A.Y // MULTIMODAL AUDITOR</span>
        <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] px-1.5 py-0.5 rounded text-[8px] font-bold">WEBRTC FEED</span>
      </div>

      <div className="flex-1 grid grid-cols-[1.2fr_1fr] gap-3 overflow-hidden">
        {/* Left: Viewport */}
        <div 
          ref={viewportRef}
          onMouseMove={handleFridayMouseMove}
          onMouseEnter={() => setFridayActive(true)}
          onMouseLeave={() => setFridayActive(false)}
          className="bg-black border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center cursor-crosshair group"
        >
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

          {fridayActive ? (
            <>
              {/* Laser crosshair guides */}
              <div className="absolute left-0 right-0 h-[0.5px] bg-[#8b5cf6]/35" style={{ top: fridayCoordinates.y }}></div>
              <div className="absolute top-0 bottom-0 w-[0.5px] bg-[#8b5cf6]/35" style={{ left: fridayCoordinates.x }}></div>

              {/* Bounding box marker */}
              <div 
                className="absolute border border-[#8b5cf6] bg-[#8b5cf6]/5 transition-all duration-75 flex flex-col justify-between p-1.5"
                style={{ 
                  left: Math.max(10, fridayCoordinates.x - 30), 
                  top: Math.max(10, fridayCoordinates.y - 30),
                  width: "60px",
                  height: "60px"
                }}
              >
                <div className="flex justify-between">
                  <span className="w-1 h-1 bg-[#8b5cf6]"></span>
                  <span className="w-1 h-1 bg-[#8b5cf6]"></span>
                </div>
                <div className="text-[6px] text-[#8b5cf6] font-bold overflow-hidden text-center truncate">
                  {trackedObject}
                </div>
                <div className="flex justify-between">
                  <span className="w-1 h-1 bg-[#8b5cf6]"></span>
                  <span className="w-1 h-1 bg-[#8b5cf6]"></span>
                </div>
              </div>

              {/* Bounding coordinate label */}
              <div className="absolute top-2 left-2 bg-black/65 border border-white/10 rounded px-1.5 py-0.5 text-[7px] text-white">
                LOC: [{fridayCoordinates.x}, {fridayCoordinates.y}]
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center p-4">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 animate-pulse text-[#8b5cf6]">
                <Video size={14} />
              </div>
              <span className="text-white text-[9px] font-bold uppercase tracking-wider">HUD FEED STANDBY</span>
              <span className="text-[7px] text-[#626b78] max-w-[120px] leading-relaxed">Hover layout window to initialize camera mapping</span>
            </div>
          )}

          {/* Rec indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/45 border border-white/5 px-1.5 py-0.5 rounded">
            <span className={`w-1.5 h-1.5 rounded-full ${fridayActive ? "bg-red-500 animate-ping" : "bg-red-500"}`}></span>
            <span className="text-[6px] text-white font-bold">STREAM</span>
          </div>
        </div>

        {/* Right: Technical Stats */}
        <div className="flex flex-col gap-2.5">
          <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2 flex flex-col gap-1.5">
            <span className="text-[8px] text-[#626b78]">LIVEKIT CONNECTION</span>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">STREAM STATE:</span>
              <span className={fridayActive ? "text-[#3dd9a0] font-bold" : "text-rose-400 font-bold"}>
                {fridayActive ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
            <div className="flex justify-between items-center text-[8px]">
              <span>VOICE STREAM:</span>
              <span>24KB/S // SECURE</span>
            </div>
            <div className="flex justify-between items-center text-[8px]">
              <span>LATENCY:</span>
              <span className="text-[#3dd9a0]">32MS</span>
            </div>
          </div>

          <div className="bg-[#030305] border border-white/5 rounded-lg p-2.5 flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5">
              <span className="text-[8px] text-[#626b78] font-bold">OCR CONTEXT EXTRACTOR</span>
              <span className="text-[#8b5cf6] font-bold">[ONLINE]</span>
            </div>
            <div className="text-[8px] text-[#9aa4b2] space-y-1 overflow-y-auto flex-1 select-text">
              <p className="text-[#626b78] font-mono"># processing visual text stream...</p>
              <p className="text-white">ocr.read() ➔ "I BUILD THINGS THAT THINK."</p>
              <p className="text-[#626b78]"># tracking face nodes matches: 99.8%</p>
              <p className="text-cyan-400">assistant_reply() ➔ "Operator recognized. Yathin G initialized."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render SortMySkills Dashboard Simulation
  const renderSortMySkillsSimulation = () => (
    <div className="w-full h-full p-4 bg-[#07080d] flex flex-col gap-3 font-mono text-[10px] text-[#9aa4b2] box-border select-none">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-bold text-[#4f7cff]">SORT_MY_SKILLS // ATS INTELLIGENCE</span>
        <span className="bg-[#4f7cff]/10 text-[#4f7cff] px-1.5 py-0.5 rounded text-[8px] font-bold">PARSER v1.0</span>
      </div>

      <div className="grid grid-cols-[1fr_1.1fr] gap-3 flex-grow overflow-hidden">
        {/* Left Column: ATS Score gauge */}
        <div className="bg-[#030305] border border-white/5 rounded-lg p-2 flex flex-col justify-between items-center text-center">
          <span className="text-[8px] text-[#626b78]">ATS JOB MATCH SCORE</span>
          
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Simple circle loader border SVG */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.03)" strokeWidth="3.5" fill="transparent" />
              <circle 
                cx="32" 
                cy="32" 
                r="26" 
                stroke="var(--blue)" 
                strokeWidth="3.5" 
                fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - atsScore / 100)}`}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-[12px] font-bold text-white">{atsScore}%</div>
              <div className="text-[5px] text-green-400 font-bold uppercase">GOOD FIT</div>
            </div>
          </div>

          <button 
            onClick={startResumeScan}
            disabled={isScanning}
            className="w-full bg-[#4f7cff]/15 hover:bg-[#4f7cff]/35 border border-[#4f7cff]/40 text-[#4f7cff] text-[8px] py-1 rounded cursor-pointer transition-all flex items-center justify-center gap-1 font-bold"
          >
            <RefreshCw size={8} className={isScanning ? "animate-spin" : ""} />
            <span>{isScanning ? "RE-CALCULATING..." : "RE-SCAN RESUME"}</span>
          </button>
        </div>

        {/* Right Column: Detected Skills & Missing gaps */}
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2 flex flex-col gap-1 overflow-hidden">
            <span className="text-[8px] text-[#626b78] font-bold">DETECTED RESUME STACK</span>
            <div className="flex flex-wrap gap-1 mt-1 max-h-[50px] overflow-y-auto pr-1">
              {detectedSkills.map((sk) => (
                <span key={sk} className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[7px] text-white">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.015] border border-white/5 rounded-lg p-2 flex-grow flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-[8px] border-b border-white/5 pb-1">
              <span className="text-[#ef4444] font-bold">▲ DETECTED STACK GAPS</span>
              <span>{isScanning ? "RE-ASSESSING..." : "3 GAPS"}</span>
            </div>
            <div className="space-y-1 mt-1 flex-grow overflow-y-auto pr-1">
              {[
                { name: "Docker Containerization", priority: "HIGH" },
                { name: "CI/CD Action Pipelines", priority: "MEDIUM" },
                { name: "System Architecture Design", priority: "LOW" }
              ].map((gap, i) => (
                <div key={i} className="flex justify-between items-center text-[7px] bg-red-500/5 border border-red-500/15 rounded p-1 text-[#ff8fa3]">
                  <span>▲ {gap.name}</span>
                  <span className="text-[6px] bg-red-500/10 px-1 rounded font-bold">{gap.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSimulatedApp = () => {
    const t = title.toLowerCase();
    if (t.includes("invoiceflow")) return renderInvoiceFlowSimulation();
    if (t.includes("jarvis")) return renderJarvisSimulation();
    if (t.includes("friday")) return renderFridaySimulation();
    if (t.includes("sortmyskills")) return renderSortMySkillsSimulation();
    return (
      <div className="w-full h-full bg-[#07080d] flex items-center justify-center p-4">
        <span className="font-mono text-xs text-[#9aa4b2]">SIMULATION_SKETCH // {title.toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div
      className="demo-mockup-wrapper"
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "24px",
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.35), 0 0 40px ${shadowColor}`,
        background: "#07080d",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "4/3",
      }}
    >
      {/* Browser Mockup Header */}
      <div
        className="demo-mockup-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.85rem 1.5rem",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 10,
        }}
      >
        <div className="demo-dots" style={{ display: "flex", gap: "0.4rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#27c93f" }} />
        </div>
        
        <div
          className="demo-address-bar"
          style={{
            flexGrow: 1,
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "0.7rem",
            color: "rgba(255, 255, 255, 0.35)",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "0.3rem",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.03)",
            maxWidth: "280px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: "0 auto",
          }}
        >
          {url ? url.replace("https://", "") : `${title.toLowerCase().replace(/[^a-z0-9]/g, "")}.local`}
        </div>

        {/* View mode toggle selector */}
        <div
          className="demo-mode-toggle"
          style={{
            display: "flex",
            gap: "0.25rem",
            background: "rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            padding: "0.2rem",
            borderRadius: "8px",
            zIndex: 20,
          }}
        >
          <button
            onClick={() => setViewMode("blueprint")}
            className="cursor-pointer font-bold font-mono transition-all border-none rounded"
            style={{
              padding: "0.25rem 0.5rem",
              fontSize: "0.55rem",
              background: viewMode === "blueprint" ? `var(--${accent})` : "transparent",
              color: viewMode === "blueprint" ? "#000" : "rgba(255, 255, 255, 0.45)",
            }}
          >
            SIMULATOR
          </button>
          {url && (
            <button
              onClick={() => {
                setViewMode("live");
                setIsLoading(true);
                setIsTimeout(false);
                setHasError(false);
              }}
              className="cursor-pointer font-bold font-mono transition-all border-none rounded"
              style={{
                padding: "0.25rem 0.5rem",
                fontSize: "0.55rem",
                background: viewMode === "live" ? `var(--${accent})` : "transparent",
                color: viewMode === "live" ? "#000" : "rgba(255, 255, 255, 0.45)",
              }}
            >
              LIVE BUILD
            </button>
          )}
        </div>
      </div>

      {/* Frame Content */}
      <div
        className="demo-mockup-body"
        style={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          height: "100%",
        }}
      >
        {isMobile ? (
          /* Mobile View */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none"
            style={{ background: "rgba(3, 3, 5, 0.9)" }}
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 mb-3 text-[#9aa4b2]">
              <Video size={16} />
            </div>
            <h4 className="text-white text-sm font-bold mb-1">{title}</h4>
            <p className="text-[10px] text-[#9aa4b2] max-w-[200px] leading-relaxed mb-4">
              Detailed blueprint preview simulation is optimized for desktop view.
            </p>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-sans font-bold text-xs bg-white text-black px-4 py-2 rounded-lg no-underline"
              >
                <span>Launch Site</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        ) : (
          /* Desktop View */
          <>
            {/* Background static preview fallback */}
            <div className="absolute inset-0 z-0">
              {renderSimulatedApp()}
            </div>

            {viewMode === "live" && url && (
              <>
                {/* Loading Indicator Overlay */}
                {isLoading && (
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#030305]/85 border border-white/10 px-2.5 py-1 rounded-lg z-[15] shadow-lg">
                    <Activity size={10} className="animate-pulse text-cyan-400" />
                    <span className="text-[8px] text-[#9aa4b2] font-mono tracking-wider uppercase font-bold">
                      RESOLVING SECURE PORT...
                    </span>
                  </div>
                )}

                {/* Error or Timeout alert block */}
                {(hasError || isTimeout) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40 backdrop-blur-sm z-10">
                    <div className="bg-[#07080d]/96 border border-white/10 p-5 rounded-2xl max-w-[280px] shadow-2xl">
                      <AlertTriangle size={18} className="mx-auto mb-2 text-yellow-500 animate-bounce" />
                      <h4 className="text-white text-[10px] font-mono font-bold uppercase mb-1">
                        {isTimeout ? "GATEWAY TIMEOUT" : "CONNECTION BLOCKED"}
                      </h4>
                      <p className="text-[8px] text-[#9aa4b2] font-mono leading-relaxed mb-3">
                        {isTimeout 
                          ? "The production build took too long to load. Review the local simulation module instead." 
                          : "This platform's security headers (CORS) prevent embedding. Open the repository live."}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 font-mono font-bold text-[8px] px-3 py-1.5 rounded text-black ${bgAccents[accent]}`}
                      >
                        <span>OPEN IN NEW TAB</span>
                        <ExternalLink size={8} />
                      </a>
                    </div>
                  </div>
                )}

                {/* Main Interactive Preview Frame */}
                <div
                  className="iframe-scroll-wrapper absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-500 z-[2]"
                  data-lenis-prevent="true"
                  style={{ opacity: isLoading || hasError || isTimeout ? 0 : 1 }}
                >
                  <iframe
                    src={url}
                    title={title}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    className="w-full h-full border-none bg-[#030305]"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

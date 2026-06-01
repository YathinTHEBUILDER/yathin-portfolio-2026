import React, { useState, useEffect, useRef } from "react";

interface HistoryItem {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export default function PortfolioTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isFocused, setIsFocused] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    setHistory([
      {
        id: "welcome",
        output: (
          <div className="font-mono text-xs leading-relaxed text-[#9aa4b2]">
            <p className="text-white font-semibold">YATHIN OS [Version 2.0.26]</p>
            <p>(c) Yathin G. Safe sandbox simulation environment.</p>
            <p className="text-[#626b78]">No real system command execution. Safe zone.</p>
            <p className="mt-2 text-cyan-400">
              Type <span className="font-bold underline text-[#3dd9a0]">"help"</span> to view a list of available commands.
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus terminal input
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Keyboard shortcut to focus on any click inside the terminal block
  const handleTerminalClick = () => {
    focusInput();
  };

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    // Special: clear command
    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const promptLine = `~/yathin/lab $ ${trimmed}`;
    let output: React.ReactNode = null;

    if (command === "help") {
      output = (
        <div className="space-y-2 font-mono text-xs text-[#9aa4b2]">
          <p className="text-cyan-400 font-semibold uppercase tracking-wider">Available Commands</p>
          <div className="grid grid-cols-[110px_1fr] gap-y-1.5 gap-x-2">
            <span className="text-[#3dd9a0] font-semibold font-mono">help</span>
            <span>Display this interactive command listing.</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">whoami</span>
            <span>Get biography, background, and research areas.</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">projects</span>
            <span>List primary and experimental products.</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">stack</span>
            <span>Showcase the complete software and AI tech stack.</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">open [project]</span>
            <span>Get the live site preview link (e.g. open sortmyskills).</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">contact</span>
            <span>Obtain active links to email and LinkedIn.</span>

            <span className="text-[#3dd9a0] font-semibold font-mono">clear</span>
            <span>Flush all lines from console view.</span>
          </div>
        </div>
      );
    } else if (command === "whoami") {
      output = (
        <div className="font-mono text-xs text-[#9aa4b2] space-y-2 leading-relaxed">
          <p className="text-white font-bold text-sm">Yathin G</p>
          <p>
            <span className="text-[#ffd166]">Role:</span> CSE Student &amp; AI Product Builder
          </p>
          <p>
            <span className="text-[#ffd166]">Focus:</span> Deeply interested in developing intelligent, high-performance web products, full-stack systems, and exploring local LLMs.
          </p>
          <p>
            I synthesize systems utilizing Astro, React, Python, FastAPI, and next-gen AI pipelines to solve tangible productivity challenges.
          </p>
        </div>
      );
    } else if (command === "projects") {
      output = (
        <div className="font-mono text-xs text-[#9aa4b2] space-y-2">
          <p className="text-cyan-400 font-semibold uppercase tracking-wider">Portfolio Projects</p>
          <div className="space-y-3 pl-1">
            <div className="border-l-2 border-[#3dd9a0]/30 pl-2">
              <span className="text-[#3dd9a0] font-bold">InvoiceFlow</span>
              <span className="text-[10px] text-[#626b78] ml-2 font-mono">// FINTECH</span>
              <p className="text-[#9aa4b2] mt-0.5">Verified invoice financing for Indian MSMEs.</p>
            </div>
            <div className="border-l-2 border-[#4f7cff]/30 pl-2">
              <span className="text-[#4f7cff] font-bold">SortMySkills</span>
              <span className="text-[10px] text-[#626b78] ml-2 font-mono">// AI CAREER</span>
              <p className="text-[#9aa4b2] mt-0.5">Resume clarity, job-fit analysis, and career roadmaps.</p>
            </div>
            <div className="border-l-2 border-[#ffd166]/30 pl-2">
              <span className="text-[#ffd166] font-bold">J.A.R.V.I.S</span>
              <span className="text-[10px] text-[#626b78] ml-2 font-mono">// VOICE CO-PROCESSOR</span>
              <p className="text-[#9aa4b2] mt-0.5">A personal local AI assistant experiment.</p>
            </div>
            <div className="border-l-2 border-[#8b5cf6]/30 pl-2">
              <span className="text-[#8b5cf6] font-bold">F.R.I.D.A.Y</span>
              <span className="text-[10px] text-[#626b78] ml-2 font-mono">// VISION CO-PROCESSOR</span>
              <p className="text-[#9aa4b2] mt-0.5">Realtime multimodal AI assistant with visual context.</p>
            </div>
          </div>
          <p className="text-[10px] text-[#626b78] mt-2 italic">
            Execute <span className="text-cyan-400 font-bold">"open [slug]"</span> (e.g. <span className="text-cyan-400 font-bold">"open invoiceflow"</span>) for direct hyper-links.
          </p>
        </div>
      );
    } else if (command === "stack") {
      output = (
        <div className="font-mono text-xs text-[#9aa4b2] space-y-2">
          <p className="text-cyan-400 font-semibold uppercase tracking-wider">Engineered Technologies</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {["Python", "Astro", "React", "Next.js", "Supabase", "GSAP", "Lenis", "Groq", "Gemini"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/95 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      );
    } else if (command === "open") {
      if (!arg) {
        output = (
          <div className="font-mono text-xs text-rose-400">
            Error: Please specify a project. Usage: <span className="font-bold">open [invoiceflow | sortmyskills | jarvis | friday]</span>
          </div>
        );
      } else if (arg === "invoiceflow") {
        output = (
          <div className="space-y-2 mt-1">
            <div className="font-mono text-xs text-[#9aa4b2]">
              Executing secure sandbox link to <span className="text-[#3dd9a0] font-bold">InvoiceFlow</span>...
            </div>
            <div className="p-3 border border-[#3dd9a0]/20 rounded-xl bg-[#3dd9a0]/5 max-w-sm space-y-2 backdrop-blur-md">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-white">InvoiceFlow</span>
                <span className="px-1.5 py-0.5 rounded bg-[#3dd9a0]/10 text-[#3dd9a0] text-[9px] font-mono uppercase tracking-wider font-semibold">
                  Sandbox Link
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#9aa4b2] leading-relaxed">
                Verified invoice financing platform for Indian MSMEs.
              </p>
              <a
                href="https://invoiceflowindia.tech"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#3dd9a0] hover:text-[#3dd9a0]/80 transition-all font-semibold"
              >
                <span>Launch Link (invoiceflowindia.tech)</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        );
      } else if (arg === "sortmyskills") {
        output = (
          <div className="space-y-2 mt-1">
            <div className="font-mono text-xs text-[#9aa4b2]">
              Executing secure sandbox link to <span className="text-[#4f7cff] font-bold">SortMySkills</span>...
            </div>
            <div className="p-3 border border-[#4f7cff]/20 rounded-xl bg-[#4f7cff]/5 max-w-sm space-y-2 backdrop-blur-md">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-white">SortMySkills</span>
                <span className="px-1.5 py-0.5 rounded bg-[#4f7cff]/10 text-[#4f7cff] text-[9px] font-mono uppercase tracking-wider font-semibold">
                  Sandbox Link
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#9aa4b2] leading-relaxed">
                AI resume analysis, job-fit metrics, and adaptive study roadmaps.
              </p>
              <a
                href="https://sortmyskills.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#4f7cff] hover:text-[#4f7cff]/80 transition-all font-semibold"
              >
                <span>Launch Link (sortmyskills.vercel.app)</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        );
      } else if (arg === "jarvis" || arg === "friday") {
        const isJarvis = arg === "jarvis";
        const name = isJarvis ? "J.A.R.V.I.S" : "F.R.I.D.A.Y";
        output = (
          <div className="space-y-2 mt-1">
            <div className="font-mono text-xs text-[#9aa4b2]">
              Accessing repository registry for <span className="text-[#ffd166] font-bold">{name}</span>...
            </div>
            <div className="p-3 border border-white/10 rounded-xl bg-white/5 max-w-sm space-y-2 backdrop-blur-md">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-white">{name}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[#ffd166] text-[9px] font-mono uppercase tracking-wider font-semibold">
                  Local System
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#9aa4b2] leading-relaxed">
                Experimental co-processor built to operate locally. Live web interface does not exist for this sandbox.
              </p>
              <a
                href="https://github.com/YathinTHEBUILDER"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-400/80 transition-all font-semibold"
              >
                <span>Inspect GitHub Repo</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        );
      } else {
        output = (
          <div className="font-mono text-xs text-rose-400">
            Error: Unknown project "{arg}". Try: <span className="font-bold">open sortmyskills</span> or <span className="font-bold">open invoiceflow</span>
          </div>
        );
      }
    } else if (command === "contact") {
      output = (
        <div className="font-mono text-xs text-[#9aa4b2] space-y-2">
          <p className="text-cyan-400 font-semibold uppercase tracking-wider">Secure Communication Links</p>
          <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1.5 pl-1">
            <span className="text-[#ffd166]">Email:</span>
            <a href="mailto:yathing52@gmail.com" className="text-[#3dd9a0] hover:underline transition-all">
              yathing52@gmail.com
            </a>

            <span className="text-[#ffd166]">LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/yathin-gnaneshwar-5133b4367"
              target="_blank"
              rel="noreferrer"
              className="text-[#3dd9a0] hover:underline transition-all inline-flex items-center gap-1"
            >
              <span>yathin-gnaneshwar-5133b4367</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      );
    } else {
      output = (
        <div className="font-mono text-xs text-rose-400/90 leading-relaxed">
          <p className="font-semibold">shell error: command not found "{trimmed}"</p>
          <p className="text-[#626b78] mt-0.5">
            Type <span className="text-cyan-400 font-bold underline font-mono">"help"</span> to output a directory of safe operations.
          </p>
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: promptLine,
        output,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  // Support listening to trigger events from the outer Astro components
  useEffect(() => {
    const handleCommandTrigger = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        executeCommand(customEvent.detail);
      }
    };

    window.addEventListener("run-terminal-command", handleCommandTrigger);
    return () => {
      window.removeEventListener("run-terminal-command", handleCommandTrigger);
    };
  }, []);

  return (
    <div
      onClick={handleTerminalClick}
      className={`relative flex flex-col w-full h-[380px] bg-[#030305]/85 border rounded-2xl overflow-hidden font-mono text-xs cursor-text shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none transition-all duration-300 ${
        isFocused ? "border-[#3dd9a0]/40 shadow-[0_0_20px_rgba(51,230,255,0.12)]" : "border-white/10"
      }`}
    >
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] opacity-40 z-10"></div>

      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-bottom border-white/10 bg-white/[0.02] shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-[#626b78] tracking-widest uppercase font-bold font-mono">
          ~/yathin/lab
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-[#3dd9a0] bg-[#3dd9a0]/10 border border-[#3dd9a0]/25 px-1.8 py-0.5 rounded font-bold tracking-wider">
          <span className="w-1 h-1 rounded-full bg-[#3dd9a0] animate-ping" />
          <span>SAFE SIMULATION</span>
        </div>
      </div>

      {/* Console output display */}
      <div className="flex-1 overflow-y-auto px-4.5 py-4 space-y-3.5 custom-scrollbar z-0 select-text">
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5 animate-reveal">
            {item.command && (
              <div className="flex items-center gap-2 font-mono text-[#3dd9a0] font-semibold">
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-1 text-white/90">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Bottom Command Prompt Input bar */}
      <div className="flex items-center gap-2 px-4.5 py-3.5 border-t border-white/5 bg-white/[0.01] shrink-0 z-0">
        <span className="text-[#3dd9a0] font-bold font-mono select-none">~/yathin/lab $</span>
        <div className="relative flex-1 flex items-center font-mono">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              boxShadow: "none",
              color: "#f5f7fb",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              caretColor: "#3dd9a0",
              width: "100%",
              padding: 0,
            }}
            autoFocus
            autoComplete="off"
            spellCheck="false"
            placeholder="Type a command..."
          />
        </div>
      </div>

      {/* Embedded Component CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.25s var(--ease-out) forwards;
        }
      ` }} />
    </div>
  );
}

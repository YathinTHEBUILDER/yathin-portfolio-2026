import { useState, useEffect } from "react";

type LiveDemoFrameProps = {
  title: string;
  url: string;
  label?: string;
  accent?: "green" | "blue" | "violet" | "yellow";
};

export default function LiveDemoFrame({
  title,
  url,
  accent = "blue",
}: LiveDemoFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 5 seconds loading timeout
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsTimeout(true);
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIsTimeout(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Color mappings
  const borderColors = {
    green: "rgba(61, 217, 160, 0.2)",
    blue: "rgba(79, 124, 255, 0.2)",
    violet: "rgba(139, 92, 246, 0.2)",
    yellow: "rgba(255, 209, 102, 0.2)",
  };

  const glowColors = {
    green: "rgba(61, 217, 160, 0.1)",
    blue: "rgba(79, 124, 255, 0.1)",
    violet: "rgba(139, 92, 246, 0.1)",
    yellow: "rgba(255, 209, 102, 0.1)",
  };

  const borderColor = borderColors[accent];
  const shadowColor = glowColors[accent];

  const isInvoiceFlow = title.toLowerCase().includes("invoiceflow");
  const isSortMySkills = title.toLowerCase().includes("sortmyskills");

  // Render InvoiceFlow Fallback Preview
  const renderInvoiceFlowFallback = () => (
    <div style={{
      width: "100%",
      height: "100%",
      padding: "1.25rem",
      background: "#07080d",
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      fontFamily: "monospace",
      fontSize: "0.7rem",
      color: "#9aa4b2",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#3dd9a0" }}>INVOICE_FLOW // FINTECH ENGINE</span>
        <span style={{ background: "rgba(61, 217, 160, 0.1)", color: "#3dd9a0", padding: "2px 6px", borderRadius: "4px", fontSize: "0.55rem" }}>SECURE BUILD</span>
      </div>

      {/* Grid of stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
        {[{ label: "TOTAL DISC LIMIT", val: "₹45,00,000", col: "#fff" },
          { label: "VERIFIED INVOICES", val: "18 // ACTIVE", col: "#3dd9a0" },
          { label: "AVG INTEREST RATE", val: "9.25% APR", col: "#33e6ff" }
        ].map((stat, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "8px" }}>
            <div style={{ fontSize: "0.5rem", color: "#626b78" }}>{stat.label}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: stat.col, marginTop: "2px" }}>{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Rupee Discounting Flow Line */}
      <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "0.55rem", color: "#626b78" }}>TRANSACTION PATHWAY</span>
          <span style={{ color: "#fff", fontSize: "0.65rem" }}>MSME Vendor ➔ Smart discount pool ➔ HNI Investor</span>
        </div>
        <div style={{ color: "#3dd9a0", fontWeight: "bold", fontSize: "0.75rem" }}>₹ ➔ SmartContract ➔ ₹</div>
      </div>

      {/* Invoice list table */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "4px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", padding: "6px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", color: "#626b78", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "4px", marginBottom: "2px", fontWeight: "bold" }}>
          <span>INVOICE NO</span>
          <span>RECIPIENT</span>
          <span>DISC VALUE</span>
        </div>
        {[
          { id: "INV-2026-089", rec: "TATA MOTORS", val: "₹12,40,000", stat: "VERIFIED" },
          { id: "INV-2026-074", rec: "RELIANCE IND", val: "₹8,50,000", stat: "VERIFIED" },
          { id: "INV-2026-051", rec: "INFOSYS TECH", val: "₹15,60,000", stat: "FUNDED" }
        ].map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", borderBottom: "1px dashed rgba(255,255,255,0.02)", paddingBottom: "2px", padding: "4px 0" }}>
            <span style={{ color: "#fff" }}>{item.id}</span>
            <span>{item.rec}</span>
            <span style={{ color: "#3dd9a0" }}>{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Render SortMySkills Fallback Preview
  const renderSortMySkillsFallback = () => (
    <div style={{
      width: "100%",
      height: "100%",
      padding: "1.25rem",
      background: "#07080d",
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      fontFamily: "monospace",
      fontSize: "0.7rem",
      color: "#9aa4b2",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
        <span style={{ fontWeight: "bold", color: "#4f7cff" }}>SORT_MY_SKILLS // AI RADAR</span>
        <span style={{ background: "rgba(79, 124, 255, 0.1)", color: "#4f7cff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.55rem" }}>AI MODEL READY</span>
      </div>

      {/* Parse view */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "0.75rem", flexGrow: 1 }}>
        {/* Left Column: ATS Score & Skills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px" }}>
          <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.55rem", color: "#626b78" }}>ATS FIT SCORE</span>
            <span style={{ color: "#3dd9a0", fontWeight: "bold" }}>92% MATCH</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px" }}>
            <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #4f7cff, #3dd9a0)", borderRadius: "99px" }}></div>
          </div>

          <div style={{ fontSize: "0.55rem", color: "#626b78", marginTop: "4px" }}>DETECTED STACK:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {["React", "Astro", "TypeScript", "GSAP", "FastAPI"].map((s) => (
              <span key={s} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "4px", padding: "2px 5px", fontSize: "0.55rem", color: "#fff" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Missing Gaps & Roadmaps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px" }}>
          <span style={{ fontSize: "0.55rem", color: "#ef4444", fontWeight: "bold" }}>⚡ DETECTED SKILL GAPS</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {["Docker (Containerization)", "CI/CD Workflows", "System Design"].map((gap) => (
              <div key={gap} style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px solid rgba(239,68,68,0.12)", color: "#ef4444", padding: "3px 6px", borderRadius: "4px", fontSize: "0.55rem" }}>
                ▲ {gap}
              </div>
            ))}
          </div>

          <div style={{ fontSize: "0.55rem", color: "#626b78", marginTop: "2px" }}>ADAPTIVE STUDY PLAN:</div>
          <div style={{ background: "rgba(79, 124, 255, 0.05)", border: "1px dashed rgba(79,124,255,0.2)", borderRadius: "4px", padding: "4px", fontSize: "0.55rem", color: "#fff" }}>
            ● Dockerized Backend Project (4 hrs)
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="demo-mockup-wrapper"
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "24px",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 40px ${shadowColor}`,
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
          gap: "1.5rem",
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
            maxWidth: "360px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: "0 auto",
          }}
        >
          {url.replace("https://", "")}
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
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              textAlign: "center",
              background: "rgba(3, 3, 5, 0.8)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                color: "#9aa4b2",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#f5f7fb", margin: "0 0 0.5rem 0" }}>
              {title}
            </h4>
            <p style={{ fontSize: "0.8rem", color: "#9aa4b2", maxWidth: "240px", margin: "0 0 1.5rem 0", lineHeight: "1.5" }}>
              Live preview is disabled on mobile.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "600",
                padding: "0.75rem 1.25rem",
                background: "#f5f7fb",
                color: "#030305",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <span>Open Live Site</span>
            </a>
          </div>
        ) : (
          /* Desktop View */
          <>
            {/* Background static preview fallback */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              {isInvoiceFlow ? renderInvoiceFlowFallback() : null}
              {isSortMySkills ? renderSortMySkillsFallback() : null}
            </div>

            {/* Loading Indicator Overlay */}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(3, 3, 5, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  zIndex: 15,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    borderTopColor: accent === "green" ? "#3dd9a0" : "#4f7cff",
                    animation: "demo-spin 1s linear infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.58rem",
                    color: "#9aa4b2",
                    fontFamily: "monospace",
                    letterSpacing: "0.02em",
                  }}
                >
                  SECURE SANDBOX LINK...
                </span>
              </div>
            )}

            {/* Error or Timeout alert block */}
            {(hasError || isTimeout) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  textAlign: "center",
                  background: "rgba(3, 3, 5, 0.4)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    background: "rgba(7, 8, 13, 0.96)",
                    border: `1px solid ${borderColor}`,
                    padding: "1.3rem",
                    borderRadius: "16px",
                    maxWidth: "310px",
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${shadowColor}`,
                  }}
                >
                  <h4 style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#fff", margin: "0 0 0.4rem 0", fontFamily: "monospace" }}>
                    {isTimeout ? "SANDBOX TIMEOUT" : "CONNECTION REFUSED"}
                  </h4>
                  <p style={{ fontSize: "0.72rem", color: "#9aa4b2", margin: "0 0 1rem 0", lineHeight: "1.4", fontFamily: "monospace" }}>
                    {isTimeout 
                      ? "The live build took too long to respond. You can inspect the sandbox skeleton or load the live platform." 
                      : "Your browser security policy does not allow iframe embeds. Open the live site securely in a new window."}
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      padding: "0.6rem 1.1rem",
                      background: accent === "green" ? "#3dd9a0" : "#4f7cff",
                      color: "#030305",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    <span>Open Live Site</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Main Interactive Preview Frame */}
            <div
              className="iframe-scroll-wrapper"
              data-lenis-prevent="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                opacity: isLoading || hasError || isTimeout ? 0 : 1,
                transition: "opacity 0.5s ease",
                zIndex: 2,
              }}
            >
              <iframe
                src={url}
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "#030305",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes demo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      ` }} />
    </div>
  );
}

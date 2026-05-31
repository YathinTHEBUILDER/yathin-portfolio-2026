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
  label,
  accent = "blue",
}: LiveDemoFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Color variables based on accent
  const glowColors = {
    green: "rgba(61, 217, 160, 0.15)",
    blue: "rgba(79, 124, 255, 0.15)",
    violet: "rgba(139, 92, 246, 0.15)",
    yellow: "rgba(255, 209, 102, 0.15)",
  };

  const borderColors = {
    green: "rgba(61, 217, 160, 0.25)",
    blue: "rgba(79, 124, 255, 0.25)",
    violet: "rgba(139, 92, 246, 0.25)",
    yellow: "rgba(255, 209, 102, 0.25)",
  };

  const shadowColor = glowColors[accent];
  const borderColor = borderColors[accent];

  return (
    <div
      className="demo-mockup-wrapper"
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "24px",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 40px ${shadowColor}`,
        background: "rgba(13, 15, 23, 0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
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
        }}
      >
        <div className="demo-dots" style={{ display: "flex", gap: "0.4rem" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
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
          /* Mobile Fallback View */
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#f5f7fb",
                margin: "0 0 0.5rem 0",
              }}
            >
              {title}
            </h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#9aa4b2",
                maxWidth: "240px",
                margin: "0 0 1.5rem 0",
                lineHeight: "1.5",
              }}
            >
              Live preview is disabled on mobile to preserve bandwidth.
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
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span>Open Live Site</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        ) : (
          /* Desktop Viewport with dynamic loaders and iframe check */
          <>
            {/* Loading Shimmer Skeleton */}
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  background: "rgba(3, 3, 5, 0.9)",
                  zIndex: 3,
                }}
              >
                <div className="shimmer-loader" style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255, 255, 255, 0.05)",
                      borderTopColor: "var(--text)",
                      animation: "demo-spin 1s linear infinite",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.05em",
                  }}
                >
                  CONNECTING SECURE SANDBOX...
                </span>
              </div>
            )}

            {/* Error fallback view */}
            {hasError ? (
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
                  background: "rgba(3, 3, 5, 0.95)",
                  zIndex: 4,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(255, 143, 163, 0.08)",
                    border: "1px solid rgba(255, 143, 163, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    color: "#ff8fa3",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#ff8fa3",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Live Frame Blocked
                </h4>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    maxWidth: "280px",
                    margin: "0 0 1.5rem 0",
                    lineHeight: "1.5",
                  }}
                >
                  The browser blocked the iframe connection. Open the project in a new window instead.
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
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "var(--text)",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <span>Open Site Externally</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            ) : null}

            {/* Main Interactive Preview Frame */}
            <div
              className="iframe-scroll-wrapper"
              data-lenis-prevent="true"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
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

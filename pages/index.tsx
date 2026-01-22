import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [type, setType] = useState<"business" | "user">("business");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Responsive helpers (updates on resize)
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isBusiness = type === "business";

  const contactMeta = useMemo(() => {
    if (isBusiness) {
      return {
        title: "Contact",
        desc: "Business owner — send a message. We’ll reply fast.",
        namePh: "Restaurant / owner name",
        msgPh: "Tell us about your business and what deal you’d like to offer...",
        submit: "Send partnership request",
      };
    }
    return {
      title: "Contact",
      desc: "User — send feedback or report an issue. We’ll reply fast.",
      namePh: "Your name",
      msgPh: "Tell us your feedback (or what went wrong) and we’ll fix it...",
      submit: "Send feedback",
    };
  }, [isBusiness]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePartnerClick = () => {
    setType("business");
    setStatus("idle");
    scrollToContact();
  };

  const handleUserClick = () => {
    setType("user");
    setStatus("idle");
    scrollToContact();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, email, message }),
      });

      if (!res.ok) throw new Error("failed");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const currentYear = new Date().getFullYear();

  // Dynamic layout values
  const h1Size = isMobile ? 44 : isTablet ? 50 : 56;
  const heroPadTop = isMobile ? 32 : 56;
  const containerMax = isTablet ? 980 : 1100;
  const wideMax = isTablet ? 1100 : 1550;

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <span style={styles.brandDot} />
            <span style={styles.brandText}>Krowz</span>
          </div>

          <div style={styles.headerRight}>
            <a href="#contact" style={styles.headerLink}>
              Contact
            </a>
            <a href="mailto:hello@krowz.ca" style={styles.headerPill}>
              hello@krowz.ca
            </a>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* HERO */}
        <div style={{ ...styles.container, maxWidth: containerMax }}>
          <section style={{ ...styles.hero, paddingTop: heroPadTop }}>
            <div style={styles.heroTag}>Based in Canada 🇨🇦</div>

            <h1 style={{ ...styles.h1, fontSize: h1Size, lineHeight: isMobile ? 1.05 : 1.02 }}>
              Save money on food.
              <br />
              <span style={styles.h1Soft}>Redeem in seconds.</span>
            </h1>

            <p style={{ ...styles.sub, fontSize: isMobile ? 15 : 16 }}>
              Krowz gives users real discounts at local spots — and gives businesses measurable foot traffic.
            </p>

            <div style={styles.ctaRow}>
              <button
                type="button"
                onClick={handlePartnerClick}
                style={{
                  ...styles.primaryBtn,
                  opacity: isBusiness ? 1 : 0.8,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Partner with Krowz
              </button>

              <button
                type="button"
                onClick={handleUserClick}
                style={{
                  ...styles.secondaryBtn,
                  opacity: !isBusiness ? 1 : 0.8,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                I&apos;m a user → feedback
              </button>
            </div>
          </section>
        </div>

        {/* STEPS (responsive) */}
        <div style={{ ...styles.wide, maxWidth: wideMax }}>
          <div style={styles.steps}>
            <div style={styles.stepCard}>
              <div style={styles.stepTop}>01</div>
              <div style={styles.stepTitle}>Pick a deal</div>
              <div style={styles.stepText}>Restaurants & cafés</div>
              <img src="/app/pick-a-deal.png" alt="Pick a deal" style={styles.stepImage} />
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepTop}>02</div>
              <div style={styles.stepTitle}>Show QR</div>
              <div style={styles.stepText}>Customer present</div>
              <img src="/app/show-qr.png" alt="Show QR" style={styles.stepImage} />
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepTop}>03</div>
              <div style={styles.stepTitle}>Staff scans</div>
              <div style={styles.stepText}>Instant verify</div>
              <img src="/app/staff-verify.png" alt="Staff verification" style={styles.stepImage} />
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div style={{ ...styles.container, maxWidth: containerMax }}>
          <section id="contact" style={styles.contactWrap}>
            <div style={styles.contactCard}>
              <div style={styles.contactHeader}>
                <div>
                  <div style={styles.contactTitle}>{contactMeta.title}</div>
                  <div style={styles.contactDesc}>{contactMeta.desc}</div>
                </div>

                <div style={styles.contactMini}>
                  <div style={styles.miniLabel}>Email</div>
                  <a href="mailto:hello@krowz.ca" style={styles.miniValue}>
                    hello@krowz.ca
                  </a>
                </div>
              </div>

              <form onSubmit={submit} style={styles.form}>
                <div style={{ ...styles.grid2, gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                  <div style={styles.field}>
                    <label style={styles.label}>You are</label>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value as "business" | "user");
                        setStatus("idle");
                      }}
                      style={styles.input}
                    >
                      <option value="business">Business</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.label}>Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={styles.input}
                      placeholder={contactMeta.namePh}
                    />
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                    placeholder="you@email.com"
                    type="email"
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ ...styles.input, minHeight: 110, resize: "vertical" as const }}
                    placeholder={contactMeta.msgPh}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    ...styles.submit,
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "sending" ? "Sending..." : contactMeta.submit}
                </button>

                {status === "sent" && <div style={styles.ok}>Sent. We’ll reply soon.</div>}

                {status === "error" && (
                  <div style={styles.err}>
                    Failed to send. Email us at{" "}
                    <a href="mailto:hello@krowz.ca" style={styles.errLink}>
                      hello@krowz.ca
                    </a>
                    .
                  </div>
                )}
              </form>
            </div>

            <footer style={styles.footer}>
              <div style={styles.footerLine} />
              <div style={styles.footerText}>© {currentYear} Krowz</div>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}

const GOLD = "#FFD700";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    backdropFilter: "blur(10px)",
    background: "rgba(0,0,0,0.65)",
    borderBottom: "1px solid #111",
  },
  headerInner: {
    maxWidth: 1600,
    margin: "0 auto",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: GOLD,
    boxShadow: "0 0 18px rgba(255,215,0,0.35)",
  },
  brandText: { fontWeight: 900, letterSpacing: 0.2 },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  headerLink: { color: "#ddd", textDecoration: "none", fontWeight: 700, fontSize: 13 },
  headerPill: {
    color: "#000",
    background: GOLD,
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 13,
  },

  main: { width: "100%", padding: "24px 18px 60px" },

  container: { maxWidth: 1100, margin: "0 auto", width: "100%" },
  wide: { maxWidth: 1550, margin: "0 auto", width: "100%", paddingTop: 14 },

  hero: { padding: "56px 0 10px" },
  heroTag: {
    display: "inline-block",
    padding: "7px 10px",
    borderRadius: 999,
    border: "1px solid #222",
    color: "#ccc",
    fontWeight: 700,
    fontSize: 12,
  },
  h1: { margin: "16px 0 10px", fontSize: 56, letterSpacing: -1.2, lineHeight: 1.02 },
  h1Soft: { color: "#cfcfcf" },
  sub: { margin: 0, maxWidth: 680, color: "#bdbdbd", fontSize: 16, lineHeight: 1.55 },

  ctaRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 },
  primaryBtn: {
    background: GOLD,
    color: "#000",
    padding: "12px 16px",
    borderRadius: 14,
    fontWeight: 900,
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 14,
    fontWeight: 900,
    border: "1px solid #222",
    cursor: "pointer",
  },

  // auto-fit makes it 1-col on mobile, 2 on tablet, 3 on desktop
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
    marginTop: 28,
  },

  stepCard: {
    border: "1px solid #111",
    background: "#0b0b0b",
    borderRadius: 18,
    padding: 16,
  },
  stepTop: { color: GOLD, fontWeight: 900, fontSize: 12, letterSpacing: 1.4 },
  stepTitle: { marginTop: 10, fontWeight: 900, fontSize: 16 },
  stepText: { marginTop: 6, color: "#a7a7a7", fontSize: 13 },

  // makes screenshots look clean on mobile + desktop
  stepImage: {
    width: "100%",
    marginTop: 14,
    borderRadius: 14,
    border: "1px solid #151515",
    display: "block",
    boxShadow: "0 0 40px rgba(255,215,0,0.05)",
  },

  contactWrap: { paddingTop: 40 },
  contactCard: { border: "1px solid #111", background: "#0b0b0b", borderRadius: 18, padding: 18 },
  contactHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  contactTitle: { fontWeight: 900, fontSize: 22 },
  contactDesc: { marginTop: 6, color: "#a7a7a7", maxWidth: 560, fontSize: 13, lineHeight: 1.5 },

  contactMini: { border: "1px solid #141414", borderRadius: 14, padding: 12, minWidth: 220 },
  miniLabel: { color: "#888", fontSize: 12, fontWeight: 800 },
  miniValue: { display: "block", marginTop: 6, color: GOLD, textDecoration: "none", fontWeight: 900 },

  form: { marginTop: 14, display: "grid", gap: 12 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field: { display: "grid", gap: 6 },
  label: { fontSize: 12, fontWeight: 900, color: "#cfcfcf" },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #151515",
    background: "#070707",
    color: "#fff",
    outline: "none",
  },

  submit: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "none",
    background: GOLD,
    color: "#000",
    fontWeight: 900,
    fontSize: 15,
  },

  ok: { color: "#00ff6a", fontWeight: 900, fontSize: 13 },
  err: { color: "#ff5b5b", fontWeight: 900, fontSize: 13 },
  errLink: { color: GOLD, textDecoration: "none" },

  footer: { paddingTop: 26 },
  footerLine: { height: 1, background: "#111", width: "100%" },
  footerText: { paddingTop: 14, textAlign: "center", color: "#777", fontSize: 12, fontWeight: 800 },
};

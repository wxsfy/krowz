import Head from "next/head";
import { useState, type FormEvent } from "react";

const APP_STORE_ID = "6784631221";
const APP_STORE_URL = `https://apps.apple.com/ca/app/krowz/id${APP_STORE_ID}`;
// Apple's official badge, loaded from Apple (their marketing guidelines don't allow a redrawn version).
const APP_STORE_BADGE =
  "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83";

// What Krowz covers, shown as coupons. Deliberately not tied to today's listings.
const KINDS = [
  { kind: "Restaurants", line: "Money off your meal", stub: "Dine in or take out" },
  { kind: "Cafés", line: "Your usual order, for less", stub: "Coffee, drinks and bites" },
  { kind: "Dessert spots", line: "Treat yourself for less", stub: "Sweets, ice cream and more" },
];

function AppStoreBadge({ height }: { height: number }) {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download Krowz on the App Store" className="badge">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={APP_STORE_BADGE} alt="Download on the App Store" style={{ height, width: "auto", display: "block" }} />
    </a>
  );
}

export default function Home() {
  const [type, setType] = useState<"business" | "user">("business");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent) => {
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

  const year = new Date().getFullYear();
  const isBusiness = type === "business";

  return (
    <>
      <Head>
        <title>Krowz – local deals, in your pocket</title>
        <meta
          name="description"
          content="Real discounts at local restaurants, cafés and dessert spots. Show the QR at the counter, staff scan it, done."
        />
        {/* iPhone Safari shows a native "Open / Get" bar for the app at the top of the page. */}
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
      </Head>

      <div className="page">
        <header className="top">
          <a href="#" className="brand" aria-label="Krowz home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={30} height={30} />
            <span>Krowz</span>
          </a>
          <nav className="nav" aria-label="Main">
            <a href="#deals">Deals</a>
            <a href="#restaurants">For restaurants</a>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="nav-app">
              Get the app
            </a>
          </nav>
        </header>

        <main>
          <section className="hero wrap">
            <div className="hero-copy">
            <h1>
              Local deals,
              <br />
              in your pocket.
            </h1>
            <p className="lede">
              Real discounts at local restaurants, cafés and dessert spots. Pick a deal in the app, show the QR at the
              counter, and staff scan it.
            </p>
            <div className="hero-cta">
              <AppStoreBadge height={54} />
            </div>
            </div>
            <div className="hero-phone" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/app/show-qr.png" alt="" />
            </div>
          </section>

          <section id="deals" className="wrap board-section" aria-labelledby="deals-title">
            <div className="board-head">
              <h2 id="deals-title">Where you&apos;ll save</h2>
              <p>Local spots near you, with new ones joining all the time.</p>
            </div>
            <ul className="board">
              {KINDS.map((k) => (
                <li key={k.kind} className="coupon">
                  <div className="coupon-main">
                    <div className="coupon-where">
                      <span className="coupon-name">{k.kind}</span>
                    </div>
                    <p className="coupon-offer">{k.line}</p>
                  </div>
                  <div className="coupon-stub">
                    <span>{k.stub}</span>
                    <span className="coupon-how">In the app</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="wrap how" aria-labelledby="how-title">
            <h2 id="how-title">How it works</h2>
            <ol className="shots">
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app/pick-a-deal.png" alt="A deal open in the Krowz app" />
                <p>
                  <strong>Pick a deal.</strong> Browse what&apos;s on near you.
                </p>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app/show-qr.png" alt="The Krowz QR code screen" />
                <p>
                  <strong>Show your QR</strong> at the counter, before you order.
                </p>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app/staff-verify.png" alt="The staff verification page" />
                <p>
                  <strong>Staff scan it</strong> with any phone camera. That&apos;s it.
                </p>
              </li>
            </ol>
          </section>

          <section id="restaurants" className="for-biz" aria-labelledby="biz-title">
            <div className="wrap biz-grid">
              <div className="biz-copy">
                <h2 id="biz-title">Run a restaurant, café or dessert spot?</h2>
                <p>
                  Put a deal on Krowz and bring new customers through the door. Your staff verify each redemption by
                  scanning the customer&apos;s QR with a phone. No app to install and no hardware.
                </p>
                <p>
                  Tell us about your place and the deal you&apos;d like to run, and we&apos;ll get back to you. Or email{" "}
                  <a href="mailto:hello@krowz.ca">hello@krowz.ca</a>.
                </p>
              </div>

              <form onSubmit={submit} className="form" aria-label="Contact Krowz">
                <div className="who" role="radiogroup" aria-label="I am">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isBusiness}
                    className={isBusiness ? "on" : ""}
                    onClick={() => {
                      setType("business");
                      setStatus("idle");
                    }}
                  >
                    A business
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!isBusiness}
                    className={!isBusiness ? "on" : ""}
                    onClick={() => {
                      setType("user");
                      setStatus("idle");
                    }}
                  >
                    A Krowz user
                  </button>
                </div>

                <label>
                  <span>{isBusiness ? "Business name" : "Your name"}</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    maxLength={200}
                    autoComplete="email"
                  />
                </label>
                <label>
                  <span>{isBusiness ? "Your place and the deal you have in mind" : "Your feedback or what went wrong"}</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={4000} rows={5} />
                </label>

                <button type="submit" className="send" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                {status === "sent" && <p className="ok">Message sent. We&apos;ll reply soon.</p>}
                {status === "error" && (
                  <p className="err">
                    Couldn&apos;t send that. Email us at <a href="mailto:hello@krowz.ca">hello@krowz.ca</a>.
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>

        <footer className="foot wrap">
          <AppStoreBadge height={40} />
          <div className="foot-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="mailto:hello@krowz.ca">hello@krowz.ca</a>
          </div>
          <p>© {year} Krowz</p>
        </footer>
      </div>

      <style jsx>{`
        .page {
          --bg: #050505;
          --ink: #ffffff;
          --muted: #a7a7a7;
          --line: #2a2a2a;
          --card: #111111;
          --yellow: #ffd21f;
          --coupon-ink: #050505;
          --display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Arial, sans-serif;
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Arial, sans-serif;
        }
        .wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding-left: 20px;
          padding-right: 20px;
        }
        a {
          color: inherit;
        }
        :global(a:focus-visible),
        :global(button:focus-visible),
        :global(input:focus-visible),
        :global(textarea:focus-visible) {
          outline: 2px solid var(--yellow);
          outline-offset: 3px;
        }

        /* header */
        .top {
          max-width: 1120px;
          margin: 0 auto;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-family: var(--display);
          font-weight: 900;
          font-size: 21px;
          letter-spacing: -0.02em;
        }
        .brand img {
          border-radius: 8px;
          display: block;
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 22px;
          font-size: 15px;
          font-weight: 600;
        }
        .nav a {
          text-decoration: none;
          color: var(--muted);
        }
        .nav a:hover {
          color: var(--ink);
        }
        .nav .nav-app {
          color: var(--yellow);
        }

        /* hero */
        .hero {
          padding-top: 36px;
          padding-bottom: 28px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 40px;
        }
        h1 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(44px, 6vw, 76px);
          line-height: 1;
          letter-spacing: -0.035em;
          margin: 0;
        }
        /* the app, cropped at the bottom and fading into the page */
        .hero-phone {
          width: 205px;
          height: 325px;
          overflow: hidden;
          border: 1px solid var(--line);
          border-bottom: 0;
          border-radius: 30px 30px 0 0;
          position: relative;
          margin-right: 24px;
        }
        .hero-phone img {
          width: 100%;
          display: block;
        }
        .hero-phone::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 90px;
          background: linear-gradient(to bottom, rgba(5, 5, 5, 0), var(--bg));
        }
        .lede {
          max-width: 34em;
          margin: 18px 0 0;
          font-size: 18px;
          line-height: 1.55;
          color: #d6d6d6;
        }
        .hero-cta {
          margin-top: 24px;
        }
        .badge {
          display: inline-block;
          line-height: 0;
        }

        /* coupon board */
        .board-section {
          padding-top: 8px;
          padding-bottom: 72px;
        }
        .board-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px 24px;
          border-top: 1px solid var(--line);
          padding-top: 18px;
          margin-bottom: 18px;
        }
        h2 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(28px, 3.4vw, 38px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .board-head p {
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          font-weight: 600;
        }
        .board {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 18px;
        }
        .coupon {
          --notch: 11px;
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--yellow);
          color: var(--coupon-ink);
          border-radius: 6px;
        }
        .coupon-main {
          padding: 16px 20px 18px;
          flex: 1;
        }
        .coupon-where {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }
        .coupon-name {
          font-weight: 800;
          font-size: 15px;
        }
        .coupon-cat {
          font-size: 13px;
          font-weight: 600;
          opacity: 0.7;
          white-space: nowrap;
        }
        .coupon-offer {
          margin: 10px 0 0;
          font-family: var(--display);
          font-weight: 900;
          font-size: 25px;
          line-height: 1.12;
          letter-spacing: -0.025em;
        }
        /* the tear line, with a punched notch on each side */
        .coupon-stub {
          position: relative;
          border-top: 2px dashed rgba(5, 5, 5, 0.45);
          padding: 12px 20px 14px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .coupon-stub::before,
        .coupon-stub::after {
          content: "";
          position: absolute;
          top: calc(-1 * var(--notch) - 1px);
          width: calc(var(--notch) * 2);
          height: calc(var(--notch) * 2);
          border-radius: 50%;
          background: var(--bg);
        }
        .coupon-stub::before {
          left: calc(-1 * var(--notch));
        }
        .coupon-stub::after {
          right: calc(-1 * var(--notch));
        }
        .coupon-how {
          opacity: 0.7;
          white-space: nowrap;
        }

        /* how it works */
        .how {
          padding-bottom: 88px;
        }
        .how h2 {
          border-top: 1px solid var(--line);
          padding-top: 22px;
          margin-bottom: 28px;
        }
        .shots {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .shots img {
          width: 100%;
          max-width: 250px;
          display: block;
          border-radius: 28px;
          border: 1px solid var(--line);
        }
        .shots p {
          margin: 14px 0 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.5;
          max-width: 250px;
        }
        .shots strong {
          color: var(--ink);
        }

        /* for restaurants */
        .for-biz {
          background: var(--card);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 72px 0;
        }
        .biz-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .biz-copy p {
          color: #d6d6d6;
          font-size: 17px;
          line-height: 1.6;
          margin: 18px 0 0;
          max-width: 32em;
        }
        .biz-copy a {
          color: var(--yellow);
          font-weight: 700;
        }
        .form {
          display: grid;
          gap: 16px;
        }
        .who {
          display: inline-flex;
          justify-self: start;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 3px;
          background: var(--bg);
        }
        .who button {
          border: 0;
          background: none;
          color: var(--muted);
          font: inherit;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 14px;
          border-radius: 7px;
          cursor: pointer;
        }
        .who button.on {
          background: var(--yellow);
          color: var(--coupon-ink);
        }
        label {
          display: grid;
          gap: 7px;
        }
        label span {
          font-size: 14px;
          font-weight: 700;
          color: var(--muted);
        }
        input,
        textarea {
          width: 100%;
          background: var(--bg);
          color: var(--ink);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 12px 14px;
          font: inherit;
          font-size: 16px;
        }
        textarea {
          resize: vertical;
          min-height: 120px;
        }
        input:focus,
        textarea:focus {
          border-color: var(--yellow);
        }
        .send {
          justify-self: start;
          background: var(--yellow);
          color: var(--coupon-ink);
          border: 0;
          border-radius: 10px;
          padding: 14px 22px;
          font: inherit;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
        }
        .send:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .ok {
          margin: 0;
          color: #35d07f;
          font-weight: 700;
        }
        .err {
          margin: 0;
          color: #ff4d4d;
          font-weight: 700;
        }
        .err a {
          color: inherit;
        }

        /* footer */
        .foot {
          padding-top: 40px;
          padding-bottom: 48px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px 28px;
        }
        .foot-links {
          display: flex;
          gap: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .foot-links a {
          color: var(--muted);
          text-decoration: none;
        }
        .foot-links a:hover {
          color: var(--ink);
        }
        .foot p {
          margin: 0 0 0 auto;
          color: var(--muted);
          font-size: 13px;
        }

        @media (max-width: 820px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .hero-phone {
            display: none;
          }
          .biz-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          /* phones: swipe sideways through the three screens */
          .shots {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding: 0 20px;
            margin: 0 -20px;
            padding: 0 20px 8px;
            scrollbar-width: none;
          }
          .shots::-webkit-scrollbar {
            display: none;
          }
          .shots li {
            flex: 0 0 62%;
            scroll-snap-align: start;
          }
          .shots img {
            max-width: none;
            border-radius: 22px;
          }
          .shots p {
            font-size: 15px;
          }
          .foot p {
            margin-left: 0;
            width: 100%;
          }
        }
        @media (max-width: 560px) {
          .nav a:not(.nav-app) {
            display: none;
          }
          .hero {
            padding-top: 28px;
            padding-bottom: 28px;
          }
          .lede {
            font-size: 17px;
          }
          .board {
            grid-template-columns: 1fr;
          }
          .coupon-offer {
            font-size: 24px;
          }
          .for-biz {
            padding: 56px 0;
          }
        }
      `}</style>
    </>
  );
}

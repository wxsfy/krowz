import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Krowz</title>
      </Head>

      <main className="page">
        <section className="card">
          <p className="eyebrow">Krowz</p>
          <h1>Terms & Conditions</h1>
          <p className="updated">Last updated: July 5, 2026</p>

          <p>By using Krowz, you agree to these Terms & Conditions.</p>

          <h2>About Krowz</h2>
          <p>
            Krowz helps users discover local businesses and redeem offers, discounts, and
            promotions from participating businesses.
          </p>

          <h2>Accounts</h2>
          <p>
            You are responsible for maintaining access to your account and using Krowz
            honestly. You may not create duplicate accounts, abuse redemptions, or attempt to
            bypass account limits.
          </p>

          <h2>Offers and Redemptions</h2>
          <p>
            Offers are provided by participating businesses and may be subject to availability,
            business hours, restrictions, or changes. Businesses may modify, refuse, or
            discontinue offers at their discretion.
          </p>

          <h2>No Guarantee of Offers</h2>
          <p>
            Krowz does not guarantee that any specific offer will always be available. We are
            not responsible if a business is closed, unavailable, refuses service, or changes
            an offer.
          </p>

          <h2>Fair Use</h2>
          <p>
            You may not misuse Krowz, manipulate redemptions, share unauthorized access, or use
            the app in a way that harms Krowz, users, or participating businesses.
          </p>

          <h2>Account Suspension</h2>
          <p>
            We may suspend or remove accounts that abuse the app, violate these Terms, or
            attempt to bypass redemption limits.
          </p>

          <h2>Changes to the App</h2>
          <p>
            Krowz may update features, offers, redemption limits, pricing, or availability at
            any time.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Krowz is provided as-is. We are not responsible for losses, issues, or disputes
            arising from the use of offers, businesses, or third-party services.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href="mailto:support@krowz.ca">support@krowz.ca</a>.
          </p>
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(255, 199, 44, 0.12), transparent 35%),
            #050505;
          color: #f5f5f5;
          padding: 56px 20px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .card {
          max-width: 820px;
          margin: 0 auto;
          background: rgba(15, 15, 15, 0.92);
          border: 1px solid rgba(255, 199, 44, 0.22);
          border-radius: 28px;
          padding: 42px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
        }

        .eyebrow {
          color: #ffc72c;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0 0 12px;
        }

        h1 {
          font-size: 44px;
          line-height: 1.05;
          margin: 0;
          color: #ffc72c;
        }

        .updated {
          color: #9b9b9b;
          margin: 12px 0 32px;
        }

        h2 {
          color: #ffffff;
          font-size: 22px;
          margin: 32px 0 10px;
        }

        p {
          color: #d8d8d8;
          font-size: 16px;
          line-height: 1.7;
        }

        a {
          color: #ffc72c;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .card {
            padding: 28px 22px;
            border-radius: 22px;
          }

          h1 {
            font-size: 34px;
          }
        }
      `}</style>
    </>
  );
}
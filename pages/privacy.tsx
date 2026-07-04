import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Krowz</title>
      </Head>

      <main className="page">
        <section className="card">
          <p className="eyebrow">Krowz</p>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: July 5, 2026</p>

          <p>
            Krowz is a local discovery and deals app that helps users find and redeem offers
            from participating businesses.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect your email address, account information, device identifier,
            redemption history, and basic app usage information.
          </p>

          <h2>How We Use Information</h2>
          <p>
            We use this information to create and manage accounts, provide access to deals,
            track redemptions, prevent abuse, improve the app, and support users.
          </p>

          <h2>Redemption Data</h2>
          <p>
            When you redeem an offer, Krowz may record the business, offer, date, and account
            used for the redemption.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Krowz may use trusted third-party services such as Supabase for authentication,
            database, and account management.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share limited information only
            when needed to operate the app, prevent fraud, comply with law, or support
            participating businesses.
          </p>

          <h2>Data Security</h2>
          <p>
            We take reasonable steps to protect your information, but no system is guaranteed
            to be completely secure.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may contact us to request account deletion or ask questions about your data.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
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
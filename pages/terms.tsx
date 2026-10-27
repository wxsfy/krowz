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
          <p className="updated">Last updated: October 27, 2026</p>

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

          <h2>Krowz Pro Subscription</h2>
          <p>
            Krowz Pro is an optional auto-renewing subscription, available in the Krowz iPhone
            app. With Krowz Pro you can redeem deals at participating restaurants, cafés and
            dessert spots, up to 3 times at each spot per calendar month, with no overall
            monthly cap. The current plan details are shown in the app before you subscribe.
          </p>
          <ul>
            <li>
              <strong>Plans and price:</strong> Krowz Pro Monthly is CA$4.99 per month and Krowz
              Pro Yearly is CA$39.99 per year. Prices outside Canada, and any applicable taxes,
              are shown in the app before you buy.
            </li>
            <li>
              <strong>Payment:</strong> payment is charged to your Apple ID account when you
              confirm the purchase.
            </li>
            <li>
              <strong>Automatic renewal:</strong> your subscription renews automatically for
              the same length and price unless you turn off auto-renew at least 24 hours before
              the end of the current period. Your account is charged for the renewal within the
              24 hours before the current period ends.
            </li>
            <li>
              <strong>Managing and cancelling:</strong> you can manage or cancel your
              subscription at any time in your iPhone Settings → your name → Subscriptions, or
              from the Account tab in the Krowz app. If you cancel, Krowz Pro stays active
              until the end of the period you already paid for.
            </li>
            <li>
              <strong>Refunds:</strong> purchases are processed by Apple. Krowz does not
              provide refunds for unused time in a billing period. To request a refund, contact
              Apple at{" "}
              <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
                reportaproblem.apple.com
              </a>
              .
            </li>
            <li>
              <strong>Deleting your account:</strong> deleting your Krowz account does not
              cancel your subscription. Cancel it in your iPhone Settings first.
            </li>
            <li>
              <strong>Price changes:</strong> if we change the price of Krowz Pro, you will be
              notified in advance as required by Apple, and you can cancel before the new price
              applies.
            </li>
          </ul>
          <p>
            Krowz Pro gives you access to redeem offers; it does not guarantee that any
            particular business or offer will be available (see below). Purchases made through
            the App Store are also subject to Apple&apos;s{" "}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Licensed Application End User License Agreement
            </a>
            .
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
            any time. Changes to an active Krowz Pro subscription&apos;s price follow the notice
            rules described above.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Krowz is provided as-is. We are not responsible for losses, issues, or disputes
            arising from the use of offers, businesses, or third-party services.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href="mailto:hello@krowz.ca">hello@krowz.ca</a>.
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

        ul {
          margin: 0 0 16px;
          padding-left: 22px;
        }

        li {
          color: #d8d8d8;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 10px;
        }

        strong {
          color: #ffffff;
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
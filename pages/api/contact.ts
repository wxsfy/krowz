import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { type, name, email, message } = req.body ?? {};

    if (!type || !name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in .env.local");
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@krowz.ca";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const sendResult = await resend.emails.send({
      // ✅ domain verified, so send from your domain
      from: "Krowz <no-reply@krowz.ca>",
      to: [toEmail],
      // ✅ replies go to the person who submitted the form
      replyTo: String(email),
      subject: `[Krowz Contact] ${String(type).toUpperCase()} — ${String(name)}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message}`,
    });

    console.log("Resend send result:", sendResult);

    if (sendResult.error) {
      console.error("Resend error:", sendResult.error);
      return res.status(500).json({ error: sendResult.error.message });
    }

    return res.status(200).json({ ok: true, id: sendResult.data?.id });
  } catch (err) {
    console.error("CONTACT EMAIL ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

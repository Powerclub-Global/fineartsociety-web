import { RestClient } from "@signalwire/compatibility-api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  const client = RestClient(
    process.env.SIGNALWIRE_PROJECT_ID,
    process.env.SIGNALWIRE_API_TOKEN,
    { signalwireSpaceUrl: process.env.SIGNALWIRE_SPACE_URL }
  );

  const smsBody = `New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;

  try {
    const smsResponse = await client.messages.create({
      from: process.env.SIGNALWIRE_FROM_NUMBER,
      to: process.env.SIGNALWIRE_TO_NUMBER,
      body: smsBody,
    });

    console.log("SMS sent:", smsResponse.sid);
    return res.status(200).json({ success: true, sid: smsResponse.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).json({ error: "Failed to send SMS" });
  }
}

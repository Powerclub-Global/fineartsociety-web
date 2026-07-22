import { RestClient } from "@signalwire/compatibility-api";

// Force Node.js runtime (not Edge)
export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check for required env vars
  const requiredEnvVars = [
    "SIGNALWIRE_PROJECT_ID",
    "SIGNALWIRE_API_TOKEN",
    "SIGNALWIRE_SPACE_URL",
    "SIGNALWIRE_FROM_NUMBER",
    "SIGNALWIRE_TO_NUMBER"
  ];

  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  if (missingVars.length > 0) {
    return res.status(500).json({
      error: "Missing environment variables",
      missing: missingVars
    });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
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

    const smsResponse = await client.messages.create({
      from: process.env.SIGNALWIRE_FROM_NUMBER,
      to: process.env.SIGNALWIRE_TO_NUMBER,
      body: smsBody,
    });

    console.log("SMS sent:", smsResponse.sid);
    return res.status(200).json({ success: true, sid: smsResponse.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).json({
      error: "Failed to send SMS",
      message: error.message,
      code: error.code
    });
  }
}

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

  const smsBody = `New Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;

  const projectId = process.env.SIGNALWIRE_PROJECT_ID;
  const apiToken = process.env.SIGNALWIRE_API_TOKEN;
  const spaceUrl = process.env.SIGNALWIRE_SPACE_URL;

  try {
    const response = await fetch(
      `https://${spaceUrl}/api/laml/2010-04-01/Accounts/${projectId}/Messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " + Buffer.from(`${projectId}:${apiToken}`).toString("base64")
        },
        body: new URLSearchParams({
          From: process.env.SIGNALWIRE_FROM_NUMBER,
          To: process.env.SIGNALWIRE_TO_NUMBER,
          Body: smsBody
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("SignalWire error:", data);
      return res.status(500).json({
        error: "Failed to send SMS",
        details: data
      });
    }

    console.log("SMS sent:", data.sid);
    return res.status(200).json({ success: true, sid: data.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).json({
      error: "Failed to send SMS",
      message: error.message
    });
  }
}

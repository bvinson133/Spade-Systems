import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";

// Initialize environment variables manually in dev and prod
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API Route for health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route for lead submission
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const { gymName, ownerName, email, phone, location, memberCount, origin } = req.body;

      // Construct notification text
      const subject = `New Lead: ${gymName} - ${ownerName}`;
      const textMessage = `
New Lead from ${origin}:
Property/Facility: ${gymName}
Contact Name: ${ownerName}
Email: ${email}
Phone: ${phone}
Location: ${location}
Daily Occupants: ${memberCount}
      `;

      console.log("Processing lead:", textMessage);

      // Attempt to send email
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Spade Systems" <${process.env.SMTP_USER}>`,
          to: "bvinson133@gmail.com",
          subject: subject,
          text: textMessage,
        });
        console.log("Email notification sent.");
      } else {
        console.log("Email notification skipped: Missing SMTP credentials.");
      }

      // Attempt to send SMS
      if (
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_FROM_NUMBER
      ) {
        const client = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        await client.messages.create({
          body: `New Lead: ${ownerName} at ${gymName} (${location}). Phone: ${phone}`,
          from: process.env.TWILIO_FROM_NUMBER,
          to: "+19254827566", // Notification target phone number
        });
        console.log("SMS notification sent.");
      } else {
        console.log("SMS notification skipped: Missing Twilio credentials.");
      }

      res.status(200).json({ success: true, message: "Lead submitted and notifications triggered." });
    } catch (error) {
      console.error("Error processing lead submission:", error);
      res.status(500).json({ success: false, message: "Error submitting lead." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

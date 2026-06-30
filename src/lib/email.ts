import nodemailer from "nodemailer";

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

let cachedConfig: EmailConfig | null = null;

async function getEmailConfig(): Promise<EmailConfig | null> {
  if (cachedConfig) return cachedConfig;

  try {
    const { prisma } = await import("@/lib/prisma");
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { in: ["smtpHost", "smtpPort", "smtpUser", "smtpPass", "smtpFrom", "smtpTo"] },
      },
    });

    const map = new Map(settings.map((s) => [s.key, s.value]));

    if (!map.get("smtpHost") || !map.get("smtpUser")) return null;

    cachedConfig = {
      host: map.get("smtpHost") || "",
      port: parseInt(map.get("smtpPort") || "587"),
      user: map.get("smtpUser") || "",
      pass: map.get("smtpPass") || "",
      from: map.get("smtpFrom") || map.get("smtpUser") || "",
      to: map.get("smtpTo") || "",
    };

    return cachedConfig;
  } catch {
    return null;
  }
}

export async function sendEmailNotification(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  try {
    const config = await getEmailConfig();
    if (!config || !config.to) return false;

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${config.from}>`,
      to: config.to,
      subject: `Pesan Baru dari ${data.name}${data.subject ? ` - ${data.subject}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Pesan Baru dari Portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Nama</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${data.email}" style="color: #6366f1;">${data.email}</a>
              </td>
            </tr>
            ${data.subject ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subjek</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${data.subject}</td>
            </tr>
            ` : ""}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
            <h3 style="margin-top: 0;">Pesan:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Email ini dikirim otomatis dari portfolio website.
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return false;
  }
}
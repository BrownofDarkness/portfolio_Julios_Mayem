import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email().max(200),
  message: z.string().min(10).max(5000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

function emailHtml(name: string, email: string, message: string): string {
  const escaped = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0f1014;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1014;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- Header -->
  <tr>
    <td style="background:#08090B;padding:24px 32px;border-radius:8px 8px 0 0;border:1px solid #22262F;border-bottom:none;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>
          <span style="display:inline-block;width:7px;height:7px;background:#4EBFC9;border-radius:50%;vertical-align:middle;margin-right:8px;box-shadow:0 0 8px #4EBFC9;"></span>
          <span style="color:#E8EAEE;font-family:'Courier New',Courier,monospace;font-size:14px;font-weight:600;vertical-align:middle;letter-spacing:-0.01em;">julios.mayem</span>
        </td>
        <td align="right">
          <span style="color:#4A4F5A;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.06em;">PORTFOLIO · CONTACT</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td style="background:linear-gradient(90deg,#5A9BD8 0%,#4EBFC9 100%);height:2px;"></td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="background:#12141A;padding:32px 32px 28px;border:1px solid #22262F;border-top:none;border-bottom:none;">

      <!-- Kicker -->
      <p style="margin:0 0 20px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#4EBFC9;letter-spacing:0.1em;text-transform:uppercase;">
        — Nouveau message reçu
      </p>

      <!-- Title -->
      <h1 style="margin:0 0 28px;font-size:20px;font-weight:600;color:#E8EAEE;letter-spacing:-0.02em;line-height:1.3;">
        Message de <span style="color:#5A9BD8;">${name}</span>
      </h1>

      <!-- Sender card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#1E222C;border:1px solid #2D3240;border-radius:6px;margin-bottom:28px;">
        <tr>
          <td style="padding:18px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-bottom:0;">
                  <span style="display:block;font-family:'Courier New',Courier,monospace;font-size:10px;color:#7C818C;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Nom</span>
                  <span style="font-size:14px;color:#E8EAEE;font-weight:500;">${name}</span>
                </td>
                <td width="50%">
                  <span style="display:block;font-family:'Courier New',Courier,monospace;font-size:10px;color:#7C818C;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Email</span>
                  <a href="mailto:${email}" style="font-size:14px;color:#5A9BD8;text-decoration:none;font-weight:500;">${email}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Message label -->
      <p style="margin:0 0 10px;font-family:'Courier New',Courier,monospace;font-size:10px;color:#7C818C;letter-spacing:0.08em;text-transform:uppercase;">Message</p>

      <!-- Message content -->
      <div style="background:#191C24;border-left:2px solid #5A9BD8;padding:18px 20px;border-radius:0 4px 4px 0;margin-bottom:28px;">
        <p style="margin:0;font-size:15px;color:#B5BAC4;line-height:1.7;">${escaped}</p>
      </div>

      <!-- CTA button -->
      <a href="mailto:${email}?subject=Re: votre message" style="display:inline-block;background:#5A9BD8;color:#08090B;text-decoration:none;padding:11px 22px;border-radius:5px;font-size:13px;font-weight:600;letter-spacing:0.01em;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        Répondre à ${name} →
      </a>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#08090B;padding:16px 32px;border-radius:0 0 8px 8px;border:1px solid #22262F;border-top:1px solid #22262F;">
      <p style="margin:0;font-size:11px;color:#4A4F5A;font-family:'Courier New',Courier,monospace;">
        portfolio.julios.dev &nbsp;·&nbsp; Yaoundé, Cameroun &nbsp;·&nbsp; sept. 2026
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = schema.parse(body);

    const { error } = await resend.emails.send({
      from:    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to:      process.env.CONTACT_TO_EMAIL   ?? "maesjulios@gmail.com",
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      html:    emailHtml(name, email, message),
      text:    `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact/route] Resend:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    console.error("[contact/route]", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

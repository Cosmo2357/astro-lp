import type { APIRoute } from "astro";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message }: ContactFormData = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const mailgunEndpoint = `https://api.mailgun.net/v3/${import.meta.env.MAILGUN_DOMAIN}/messages`;

    const formData = new URLSearchParams();
    formData.append("from", `${name} <${import.meta.env.MAILGUN_SENDER}>`);
    formData.append("to", import.meta.env.MAILGUN_RECEIVER || "");
    formData.append("subject", "LP問い合わせが届きました");
    formData.append("text", `名前: ${name}\nメール: ${email}\n\nメッセージ:\n${message}`);

    const res = await fetch(mailgunEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`api:${import.meta.env.MAILGUN_API_KEY}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: "Email sent!" }), { status: 200 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error", details: error }),
      { status: 500 }
    );
  }
};

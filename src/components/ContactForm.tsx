import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setStatus(result.success ? "Email sent successfully!" : result.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        メールアドレス:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        メッセージ:
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </label>
      <button type="submit">送信</button>
      {status && <p>{status}</p>}
    </form>
  );
}

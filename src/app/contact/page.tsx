"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    // Prefer env var if available; fallback to existing key
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "2cb04515-c91b-4371-a7ed-08db9ac063be"
    );

    try {
      const payload = JSON.stringify(Object.fromEntries(formData as any));
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data?.success ?? true)) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="mb-6 text-gray-600">Fill out the form below and I’ll get back to you soon.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Submit Form"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-600">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}
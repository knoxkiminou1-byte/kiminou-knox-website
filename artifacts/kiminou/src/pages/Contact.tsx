import { useState } from "react";
import { PageHero, Section } from "@/components/Page";
import Seo from "@/components/Seo";

/**
 * /contact — posts to the existing /api/contact serverless handler.
 * Handles the unconfigured-SMTP case gracefully with a direct-email fallback.
 */

const inquiryTypes = [
  { value: "speaking", label: "Speaking / Appearance" },
  { value: "press", label: "Press / Media" },
  { value: "book", label: "Book / Author" },
  { value: "basketball", label: "Basketball / Athlete" },
  { value: "other", label: "Other" },
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "fallback"; email: string }
  | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-sm border border-(--kk-ink)/20 bg-transparent px-4 py-3 text-(--kk-ink) placeholder:text-(--kk-ink)/35 focus:border-(--kk-brass) focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: "sent" });
        form.reset();
      } else if (res.status === 503 && json.fallbackEmail) {
        setStatus({ kind: "fallback", email: json.fallbackEmail });
      } else {
        setStatus({
          kind: "error",
          message: json.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <>
      <Seo
        title="Contact - Kiminou Knox"
        description="Contact Kiminou Knox for speaking, press, book, basketball, interview, school, and creative collaboration inquiries."
        path="/contact"
        image="/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg"
      />
      <main className="bg-(--kk-paper) text-(--kk-ink)">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start the <em className="italic">conversation.</em>
          </>
        }
        lede="Booking, press, books, basketball, or anything else — this goes straight to Kiminou. Say what you need and what the room should leave with."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16 max-w-6xl">
          <div>
            {status.kind === "sent" ? (
              <div className="rounded-sm border border-(--kk-brass)/50 bg-(--kk-card) p-8 md:p-10">
                <h2 className="font-serif text-3xl">Message received.</h2>
                <p className="mt-4 text-lg text-(--kk-ink)/70 leading-relaxed">
                  Thank you — your note is on its way. Expect a personal reply
                  soon.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                      Name
                    </span>
                    <input name="name" required minLength={1} autoComplete="name" className={inputClass} placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                      Email
                    </span>
                    <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
                  </label>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                      I'm reaching out about
                    </span>
                    <select name="inquiryType" required defaultValue="speaking" className={inputClass}>
                      {inquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                      Organization <span className="normal-case tracking-normal">(optional)</span>
                    </span>
                    <input name="organization" autoComplete="organization" className={inputClass} placeholder="School, team, outlet…" />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                    Subject <span className="normal-case tracking-normal">(optional)</span>
                  </span>
                  <input name="subject" className={inputClass} placeholder="What is this about?" />
                </label>
                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-(--kk-ink)/55 mb-2">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    rows={6}
                    className={inputClass}
                    placeholder="Audience, date window, and what you want the room to leave with…"
                  />
                </label>

                {status.kind === "fallback" && (
                  <p className="rounded-sm border border-(--kk-brass)/50 bg-(--kk-card) p-5 text-(--kk-ink)/80 leading-relaxed">
                    The form couldn't send just now — email him directly at{" "}
                    <a href={`mailto:${status.email}`} className="font-semibold underline underline-offset-4">
                      {status.email}
                    </a>{" "}
                    and he'll get back to you.
                  </p>
                )}
                {status.kind === "error" && (
                  <p className="rounded-sm border border-red-800/40 bg-red-950/10 p-5 text-(--kk-ink)/80">
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status.kind === "sending"}
                  className="inline-flex items-center rounded-full bg-(--kk-ink) px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-(--kk-paper) transition-colors hover:bg-(--kk-ink-soft) disabled:opacity-50"
                >
                  {status.kind === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-8">
            <div className="border-t border-(--kk-ink)/15 pt-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/55">
                For booking
              </h2>
              <p className="mt-3 text-(--kk-ink)/70 leading-relaxed">
                Include the audience, the date window, and what you want the
                room to leave with. The more specific, the faster the answer.
              </p>
            </div>
            <div className="border-t border-(--kk-ink)/15 pt-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/55">
                For press
              </h2>
              <p className="mt-3 text-(--kk-ink)/70 leading-relaxed">
                Interviews, features, and fact-checking go through this form
                too — choose "Press / Media" above.
              </p>
            </div>
            <div className="border-t border-(--kk-ink)/15 pt-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-(--kk-ink)/55">
                Elsewhere
              </h2>
              <ul className="mt-3 space-y-2 text-(--kk-ink)/70">
                <li>
                  <a className="underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass)" href="https://www.youtube.com/@KiminouKnoxOfficial" target="_blank" rel="noopener noreferrer">
                    YouTube — @KiminouKnoxOfficial
                  </a>
                </li>
                <li>
                  <a className="underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass)" href="https://www.tiktok.com/@kiminou.knox" target="_blank" rel="noopener noreferrer">
                    TikTok — @kiminou.knox
                  </a>
                </li>
                <li>
                  <a className="underline underline-offset-4 decoration-(--kk-brass)/60 hover:decoration-(--kk-brass)" href="https://www.linkedin.com/in/kiminou-knox-50691a394/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </main>
    </>
  );
}

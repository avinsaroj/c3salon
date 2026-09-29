"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CATEGORIES, SERVICES } from "@/lib/services";
import { EASE, waLink } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-line bg-sand/60 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:bg-white focus:outline-none";
const label = "mb-2 block text-sm font-semibold";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function BookingForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const known = SERVICES.some((s) => s.name === preset);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      "Hi C3 Unisex Salon, I would like to book an appointment.",
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Service: ${d.get("service")}`,
      `Preferred date: ${d.get("date")}`,
      `Preferred time: ${d.get("time")}`,
      d.get("message") ? `Message: ${d.get("message")}` : "",
    ].filter(Boolean);
    // No server is configured: the request is delivered to the salon via WhatsApp.
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setDone(true);
  }

  return (
    <div className="rounded-[2rem] bg-cream p-6 text-ink shadow-[var(--shadow-soft)] sm:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <m.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="py-10 text-center"
          >
            <CheckCircle2 className="mx-auto size-14 text-bronze" aria-hidden />
            <p className="display mt-6 text-4xl">Thank you! Our team will contact you shortly.</p>
            <button type="button" onClick={() => setDone(false)} className="mt-8 text-sm font-semibold underline underline-offset-4">
              Send another request
            </button>
          </m.div>
        ) : (
          <m.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Book an appointment">
            <div className="sm:col-span-2">
              <h3 className="display text-3xl">Book an appointment</h3>
              <p className="mt-1 text-sm text-muted">We’ll confirm your slot on WhatsApp or by phone.</p>
            </div>
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone</label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" title="10-digit mobile number" placeholder="10-digit mobile" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="service" className={label}>Service</label>
              <select id="service" name="service" required defaultValue={known ? preset : ""} className={field}>
                <option value="" disabled>Select a service</option>
                {CATEGORIES.map((c) => (
                  <optgroup key={c.id} label={c.title}>
                    {SERVICES.filter((s) => s.category === c.id).map((s) => (
                      <option key={s.name} value={s.name}>{s.name} · from {s.from}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className={label}>Preferred date</label>
              <input id="date" name="date" type="date" required min={today()} className={field} />
            </div>
            <div>
              <label htmlFor="time" className={label}>Preferred time</label>
              <input id="time" name="time" type="time" required className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={label}>Message <span className="font-normal text-muted">(optional)</span></label>
              <textarea id="message" name="message" rows={3} placeholder="Anything we should know?" className={`${field} resize-none`} />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="min-h-14 w-full rounded-full bg-ink px-8 font-semibold text-cream transition-colors duration-300 hover:bg-bronze">
                Request Appointment
              </button>
              <p className="mt-3 text-center text-xs text-muted">Your request opens in WhatsApp so our team receives it directly.</p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

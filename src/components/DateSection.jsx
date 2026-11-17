import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const INITIAL_FORM = {
  name: "",
  phone: "",
  day: "",
  month: "",
  year: "",
  website: "", // honeypot
};

// Shared styles
const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F3D3A]/70";
const inputClass =
  "w-full border-b border-[#0F3D3A]/25 bg-transparent py-3 text-sm text-[#0F3D3A] outline-none transition-colors placeholder:text-[#0F3D3A]/35 focus:border-[#6C151E]";

// Builds YYYY-MM-DD and confirms it is a real calendar date
function buildDate({ day, month, year }) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);

  if (!d || !m || year.length !== 4 || y < 1800) return null;

  const check = new Date(y, m - 1, d);
  const isReal =
    check.getFullYear() === y &&
    check.getMonth() === m - 1 &&
    check.getDate() === d;

  if (!isReal) return null;

  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function DateSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  // Digits only, auto-jump to the next box when full
  const handleDatePart = (event) => {
    const { name, value } = event.target;
    const digits = value.replace(/\D/g, "");
    const maxLength = name === "year" ? 4 : 2;

    setForm((current) => ({ ...current, [name]: digits.slice(0, maxLength) }));

    if (digits.length >= maxLength) {
      if (name === "day") monthRef.current?.focus();
      if (name === "month") yearRef.current?.focus();
    }
  };

  const fail = (text) => {
    setStatus("error");
    setMessage(text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot spam protection
    if (form.website) return;

    if (!SCRIPT_URL) {
      return fail("Enquiry form is not configured yet. Please try again later.");
    }

    const phone = form.phone.trim();
    const phoneRegex = /^[0-9+\s()-]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      return fail("Please enter a valid mobile number.");
    }

    if (!form.name.trim() || !form.day || !form.month || !form.year) {
      return fail("Please complete all required fields.");
    }

    const date = buildDate(form);

    if (!date) {
      return fail("Please enter a valid date (day, month and 4-digit year).");
    }

    setStatus("sending");
    setMessage("");

    // Date stays as YYYY-MM-DD for the Apps Script endpoint
    const payload = new URLSearchParams({
      name: form.name.trim(),
      phone,
      date,
      website: "",
    });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      // no-cors: confirms the request was sent, not that the sheet saved it.
      setStatus("success");
      setMessage(
        "Your enquiry has been sent. If you don't hear from us, please contact us directly."
      );
      setForm(INITIAL_FORM);
    } catch (error) {
      console.error("Date enquiry submission error:", error);
      fail("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <section
      id="your-date"
      className="bg-[#F5DABF] px-5 py-14 font-['Plus_Jakarta_Sans'] md:px-12 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        {/* Story */}
        <div className="max-w-xl">
          {/* <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6C151E]">
            A date with a story
          </p> */}

          <h2 className="font-['Cinzel'] text-3xl leading-snug text-[#0F3D3A] md:text-5xl">
            What if a banknote
            <br className="hidden md:block" /> carried{" "}
            <span className="italic text-[#6C151E]">your date?</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#0F3D3A]/75">
            A birthday. An anniversary. The year everything changed. Some dates
            are worth holding on to. Tell us yours, and we'll explore whether we
            can find a banknote that shares it.
          </p>
        </div>

        {/* Form card */}
        <div className="border border-[#0F3D3A]/15 bg-[#F9E8D7] p-6 md:p-8">
          <div className="mb-6 border-b border-[#0F3D3A]/15 pb-5">
            <h3 className="font-['Cinzel'] text-xl text-[#0F3D3A]">
              Share your date
            </h3>
            <p className="mt-1 text-xs text-[#0F3D3A]/60">
              We'd love to hear the date that means something to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="date-name" className={labelClass}>
                Your name
              </label>
              <input
                id="date-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="date-phone" className={labelClass}>
                Mobile number
              </label>
              <input
                id="date-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={inputClass}
              />
            </div>

            {/* Date: day / month / year */}
            <fieldset>
              <legend className={labelClass}>The date that matters to you</legend>

              <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-4">
                <input
                  name="day"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="Day"
                  placeholder="DD"
                  required
                  value={form.day}
                  onChange={handleDatePart}
                  className={`${inputClass} text-center`}
                />
                <input
                  ref={monthRef}
                  name="month"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="Month"
                  placeholder="MM"
                  required
                  value={form.month}
                  onChange={handleDatePart}
                  className={`${inputClass} text-center`}
                />
                <input
                  ref={yearRef}
                  name="year"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="Year"
                  placeholder="YYYY"
                  required
                  value={form.year}
                  onChange={handleDatePart}
                  className={`${inputClass} text-center`}
                />
              </div>
            </fieldset>

            {/* Honeypot */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="date-website">Leave this field empty</label>
              <input
                id="date-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <p className="text-[11px] leading-5 text-[#0F3D3A]/55">
              Your details will only be used to respond to this enquiry.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-between bg-[#0F3D3A] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F5DABF] transition-colors hover:bg-[#6C151E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {status === "sending" ? "Sending enquiry..." : "Send date enquiry"}
              </span>
              <ArrowUpRight size={17} />
            </button>

            {/* Status message */}
            {message && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={`text-xs leading-6 ${
                  status === "error" ? "text-[#6C151E]" : "text-[#0F3D3A]"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
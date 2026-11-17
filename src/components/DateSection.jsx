
import React, { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function DateSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    website: "",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Honeypot spam protection
    if (form.website) return;

    // Check configuration
    if (!SCRIPT_URL) {
      setStatus("error");
      setMessage(
        "Enquiry form is not configured yet. Please try again later."
      );
      return;
    }

    // Validate phone number using JavaScript
    const phone = form.phone.trim();
    const phoneRegex = /^[0-9+\s()-]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      setStatus("error");
      setMessage("Please enter a valid mobile number.");
      return;
    }

    // Check required values
    if (!form.name.trim() || !form.date) {
      setStatus("error");
      setMessage("Please complete all required fields.");
      return;
    }

    setStatus("sending");
    setMessage("");

    // Keep date as YYYY-MM-DD for the Apps Script endpoint
    const payload = new URLSearchParams({
      name: form.name.trim(),
      phone,
      date: form.date,
      website: "",
    });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      // no-cors does not allow the browser to read the server response.
      // This indicates the request was sent, not that the sheet saved it.
      setStatus("success");
      setMessage(
        "Your enquiry has been sent. If you don't hear from us, please contact us directly."
      );

      setForm({
        name: "",
        phone: "",
        date: "",
        website: "",
      });
    } catch (error) {
      console.error("Date enquiry submission error:", error);

      setStatus("error");
      setMessage(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  return (
    <section
      id="your-date"
      className="bg-[#F5DABF] px-5 py-14 md:px-12 md:py-10"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[1fr_0.9fr] lg:gap-16">

        {/* Story section */}
        <div className="max-w-xl">
          <p className="mb-4 font-['Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6C151E]">
            A date with a story
          </p>

          <h2 className="font-['Cinzel'] text-3xl leading-snug text-[#0F3D3A] md:text-5xl">
            What if a banknote
            <br className="hidden md:block" />
            carried <span className="italic text-[#6C151E]">your date?</span>
          </h2>

          <p className="mt-5 max-w-md font-['Jakarta_Sans'] text-sm leading-7 text-[#0F3D3A]/75">
            A birthday. An anniversary. The year everything changed.
            Some dates are worth holding on to. Tell us yours, and
            we'll explore whether we can find a banknote that shares it.
          </p>
        </div>

        {/* Enquiry form */}
        <div className="border border-[#0F3D3A]/15 bg-[#F9E8D7] p-6 md:p-8">

          <div className="mb-6 border-b border-[#0F3D3A]/15 pb-5">
            <h3 className="font-['Cinzel'] text-lg text-[#0F3D3A]">
              Share your date
            </h3>

            <p className="mt-1 font-['Jakarta_Sans'] text-[11px] text-[#0F3D3A]/60">
              We'd love to hear the date that means something to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="date-name"
                className="mb-2 block font-['Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest text-[#0F3D3A]/70"
              >
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
                className="w-full border-b border-[#0F3D3A]/25 bg-transparent px-0 py-3 font-['Jakarta_Sans'] text-sm text-[#0F3D3A] outline-none placeholder:text-[#0F3D3A]/35 focus:border-[#6C151E]"
              />
            </div>

            {/* Phone number */}
            <div>
              <label
                htmlFor="date-phone"
                className="mb-2 block font-['Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest text-[#0F3D3A]/70"
              >
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
                className="w-full border-b border-[#0F3D3A]/25 bg-transparent px-0 py-3 font-['Jakarta_Sans'] text-sm text-[#0F3D3A] outline-none placeholder:text-[#0F3D3A]/35 focus:border-[#6C151E]"
              />
            </div>

            {/* Special date */}
            <div>
              <label
                htmlFor="meaningful-date"
                className="mb-2 block font-['Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-widest text-[#0F3D3A]/70"
              >
                The date that matters to you (DD/MM/YYYY)
              </label>

              <div className="relative">
                <input
                  id="meaningful-date"
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border-b border-[#0F3D3A]/25 bg-transparent px-0 py-3 pr-10 font-['Jakarta_Sans'] text-sm text-[#0F3D3A] outline-none focus:border-[#6C151E]"
                />

                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#6C151E]"
                />
              </div>
            </div>

            {/* Honeypot spam protection */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="date-website">
                Leave this field empty
              </label>

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

            <p className="font-['Jakarta_Sans'] text-[10px] leading-5 text-[#0F3D3A]/55">
              Your details will only be used to respond to this enquiry.
            </p>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-between bg-[#0F3D3A] px-5 py-4 font-['Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F5DABF] transition-colors hover:bg-[#6C151E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {status === "sending"
                  ? "Sending enquiry..."
                  : "Send date enquiry"}
              </span>

              <ArrowUpRight size={17} />
            </button>

            {/* Submission message */}
            {message && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={`font-['Jakarta_Sans'] text-xs leading-6 ${
                  status === "error"
                    ? "text-[#6C151E]"
                    : "text-[#0F3D3A]"
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

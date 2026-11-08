"use client";

import Image from "./Image";
import { useState, type FormEvent } from "react";
import type { SiteLinks } from "@/lib/cms";
import { siteConfig } from "@/lib/site";
import { getVisitorId } from "@/lib/tracking";


export function Footer({ links }: { links: SiteLinks }) {
  // Only the profiles that have an address in the admin get a button, so there are no dead buttons.
  const socials = siteConfig.socials.map((s) => ({ ...s, href: links[s.key] })).filter((s) => s.href);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    setSending(true);
    try {
      const res = await fetch(`${siteConfig.apiUrl}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, visitorId: getVisitorId() ?? undefined }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.issues?.email?.[0] || json.error || "Subscription failed");
      form.reset();
      setMsg({ ok: true, text: json.alreadySubscribed ? "You’re already subscribed." : "Thanks for subscribing!" });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Subscription failed" });
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className="relative mt-[3.75rem] overflow-hidden rounded-t-[5rem] bg-ink px-4 pb-[3.75rem] pt-[6.25rem] backdrop-blur-[0.1875rem] max-md:rounded-t-[2.5rem] max-md:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-[-2.0625rem] left-0 h-[39.375rem] w-[120.125rem] mix-blend-luminosity max-[1920px]:left-1/2 max-[1920px]:-translate-x-1/2">
          <Image src="/images/texture-hero.jpg" alt="" fill sizes="1922px" className="object-fill" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[19.125rem] -scale-y-100 overflow-hidden mix-blend-luminosity">
          <Image src="/images/texture-top.png" alt="" fill sizes="100vw" className="!top-[-9.83%] !h-[119.65%] object-fill" />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[53.875rem] flex-col items-center gap-[1.5625rem] text-center">
        <h2 className="display text-silver leading-[0.9] tracking-[-0.02em]">
          <em className="font-bold italic">Good Business</em> StartsWith
          <br />a Connection.
        </h2>
        <p className="text-[1rem] leading-none text-muted max-sm:leading-snug">
          Get occasional updates on our latest work, creative insights, and studio news.
        </p>
      </div>

      {socials.length > 0 && (
        <ul aria-label="Social media" className="relative mt-[3.125rem] flex flex-wrap justify-center gap-[0.625rem]">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={`${s.label} (opens in a new tab)`}
                target="_blank"
                rel="noopener noreferrer"
                data-track="social_click"
                data-track-label={s.label}
                className="pill-dark !size-[2.75rem] !rounded-[0.625rem] !p-0 justify-center bg-[linear-gradient(180deg,rgba(224,222,230,0.15),rgba(27,27,27,0.15))] transition-transform hover:-translate-y-0.5"
              >
                <Image src={s.icon} alt="" width={s.size[0]} height={s.size[1]} className="relative" />
              </a>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubscribe} className="relative mx-auto mt-[3.75rem] flex max-w-[29rem] gap-[0.625rem]">
        <label htmlFor="newsletter-email" className="sr-only">
          Your email address
        </label>
        <div className="relative flex-1">
          <Image src="/images/icon-email.svg" alt="" width={16} height={14} className="absolute left-[0.99375rem] top-1/2 -translate-y-1/2" />
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="field pl-[2.625rem] pr-4"
          />
        </div>
        <button type="submit" disabled={sending} className="btn btn-light disabled:opacity-60">
          {sending ? "…" : "Subscribe"}
        </button>
      </form>
      <p aria-live="polite" className={`absolute inset-x-0 bottom-[1.875rem] text-center text-[0.875rem] leading-none ${msg?.ok ? "text-emerald-400" : "text-red-400"}`}>
        {msg?.text}
      </p>
    </footer>
  );
}

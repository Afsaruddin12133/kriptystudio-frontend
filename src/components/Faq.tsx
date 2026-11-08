"use client";

import Image from "./Image";
import { useState } from "react";
import type { Faq as FaqItem } from "@/lib/cms";
import { PillLight } from "./ui";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-[90rem] scroll-mt-20 px-4 pt-[7.5rem] 2xl:px-0">
      <div className="mx-auto flex max-w-[55.125rem] flex-col items-center gap-[1.875rem] text-center">
        <PillLight>GOT QUESTIONS?</PillLight>
        <div className="flex flex-col items-center gap-[1.25rem]">
          <h2 id="faq-title" className="display leading-[1.1] tracking-[-0.04em] text-ink">
            Frequently Asked <em className="font-bold italic">Questions</em>
          </h2>
          <p className="text-[1rem] leading-none text-ink-2 max-sm:leading-snug">
            Everything you need to know before starting your next project with us.
          </p>
        </div>
      </div>

      <dl className="mt-[6.25rem] grid items-start gap-[1.25rem] lg:grid-cols-2">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          return (
            <div key={item.q} className="overflow-hidden rounded-[1.125rem] bg-white">
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  id={`${id}-button`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full items-center justify-between gap-6 px-[1.875rem] text-left text-[1.125rem] leading-none text-ink ${isOpen ? "pt-[1.5625rem]" : "min-h-[5.25rem] py-[1.25rem]"}`}
                >
                  <span className={isOpen ? "py-[0.3125rem]" : ""}>{item.q}</span>
                  <Image
                    src="/images/icon-chevron-circle.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </dt>
              <dd
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
                className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[37.5rem] px-[1.875rem] pb-[1.25rem] pt-[1.5625rem] text-[1.125rem] leading-none text-ink/50 max-sm:leading-snug">
                    {item.a}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

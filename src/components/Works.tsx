import Image from "./Image";
import type { Work } from "@/lib/cms";
import { ArrowUpRight, DarkTextures, PillDark } from "./ui";

export function Works({ works, portfolioUrl = "" }: { works: Work[]; portfolioUrl?: string }) {
  // "See More Case Studies" opens the portfolio set in the admin; until one is set it goes to the contact form.
  const portfolioProps = portfolioUrl
    ? { href: portfolioUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": "See more case studies (opens in a new tab)" }
    : { href: "#contact" };

  return (
    <section id="works" aria-labelledby="works-title" className="relative scroll-mt-20 pb-[5.125rem] pt-[6.25rem]">
      <DarkTextures />

      <div className="relative mx-auto flex max-w-[53.875rem] flex-col items-center gap-[3.125rem] px-4 text-center">
        <PillDark>Selected Works</PillDark>
        <div className="flex flex-col items-center gap-[1.5625rem]">
          <h2 id="works-title" className="display text-silver leading-none tracking-[-0.02em]">
            Closer Look at <em className="font-bold italic">Our Works.</em>
          </h2>
          <p className="text-[1rem] leading-none text-muted max-sm:leading-snug">
            Explore the ideas, strategy, and creativity behind the digital experiences we create.
          </p>
        </div>
      </div>

      {/* Auto-scrolling showcase; pauses on hover. */}
      <div className="group relative mt-[6.875rem] overflow-hidden">
        <ul
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "90s" }}
        >
          {[...works, ...works].map((work, i) => {
            const duplicate = i >= works.length; // the second copy only exists to make the loop seamless
            const image = (
              <Image
                src={work.src}
                // Images uploaded through the admin are served by the API, not by Next, so skip the optimizer.
                unoptimized={!work.src.startsWith("/")}
                alt={duplicate ? "" : work.alt}
                fill
                sizes="(max-width: 768px) 384px, 640px"
                className="object-cover transition-transform duration-700 ease-out group-hover/work:scale-[1.04]"
              />
            );
            return (
              <li
                key={i}
                aria-hidden={duplicate || undefined}
                className="relative mr-[1.5625rem] h-[31.25rem] w-[40rem] shrink-0 overflow-hidden rounded-[3.75rem] max-md:mr-4 max-md:h-[18.75rem] max-md:w-[24rem] max-md:rounded-[2.25rem]"
              >
                {work.url ? (
                  // A project with a link: the whole card opens it in a new tab.
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={duplicate ? -1 : undefined}
                    aria-label={duplicate ? undefined : `${work.alt} (opens in a new tab)`}
                    data-track="work_click"
                    data-track-label={work.alt}
                    className="group/work absolute inset-0 block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                  >
                    {image}
                    <span
                      aria-hidden
                      className="absolute bottom-6 right-6 flex translate-y-2 items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-[0.875rem] leading-none text-ink opacity-0 shadow-[0_0.625rem_1.875rem_rgba(0,0,0,0.35)] backdrop-blur transition duration-300 group-hover/work:translate-y-0 group-hover/work:opacity-100 group-focus-visible/work:translate-y-0 group-focus-visible/work:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
                    >
                      View project
                      <ArrowUpRight />
                    </span>
                  </a>
                ) : (
                  image
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative mt-[6.25rem] flex justify-center">
        <a {...portfolioProps} className="btn btn-light" data-track="cta_more_case_studies">
          See More Case Studies
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}

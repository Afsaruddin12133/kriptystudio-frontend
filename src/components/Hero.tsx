import Image from "./Image";
import { BrandMarquee } from "./BrandMarquee";
import { RotatingWord } from "./RotatingWord";
import { ArrowUpRight, PillLight } from "./ui";

// Words that flip in the headline: "We Create ___ that Drive Businesses Forward."
const HERO_WORDS = ["Designs", "Websites", "Templates", "Animations"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" data-curtain-hero className="curtain-hero relative overflow-x-clip pb-[7.5rem]">
      <div className="relative mx-auto h-[35.6875rem] max-w-[120rem] max-md:h-auto max-md:pb-16">
        {/* Purple glows */}
        <Image
          src="/images/hero-glow-right.svg"
          alt=""
          aria-hidden
          width={620}
          height={820}
          className="pointer-events-none absolute left-[calc(50%+29.875rem)] top-[17.78125rem] max-w-none -translate-1/2 rotate-30"
          priority
        />
        <Image
          src="/images/hero-glow-left.svg"
          alt=""
          aria-hidden
          width={620}
          height={820}
          className="pointer-events-none absolute left-[calc(50%-21.625rem)] top-[21.53125rem] max-w-none -translate-1/2 -rotate-30"
          priority
        />

        <div className="relative flex flex-col items-center px-4 pt-[5rem] text-center">
          <PillLight>A Digital Design Agency</PillLight>

          <h1
            id="hero-title"
            className="display mt-[2.5rem] leading-[1.1] tracking-[-0.04em] text-ink"
          >
            We Create{" "}
            <span className="designs-wrap">
              <span className="designs-hl">
                <RotatingWord words={HERO_WORDS} />
              </span>
            </span>{" "}
            that Drive
            <br className="max-sm:hidden" /> Businesses Forward.
          </h1>

          <p className="mt-[1.25rem] max-w-[58.625rem] text-[1rem] leading-none text-ink-2 max-sm:leading-snug">
            Achieving meaningful growth requires a blend of strategy and creativity.
          </p>

          <div className="mt-[3.125rem] flex flex-wrap items-center justify-center gap-[0.625rem]">
            <a href="#works" className="btn btn-glass" data-track="cta_our_portfolio">
              Our Portfolio
              <Image src="/images/icon-arrow-right.svg" alt="" width={14} height={11} />
            </a>
            <a href="#contact" className="btn btn-dark" data-track="cta_start_project">
              Start a Project
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <div className="relative flex flex-col items-center gap-[2.5rem]">
        <h2 className="px-4 text-center text-[1.625rem] leading-none text-ink-2">Trusted by Top iGaming Brands</h2>
        <BrandMarquee />
      </div>
    </section>
  );
}

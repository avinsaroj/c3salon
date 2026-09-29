import { Reveal, SplitReveal } from "./motion";
import { Eyebrow } from "./ui";

/** Standard section header: eyebrow, split-reveal title, optional lead and action. */
export function SectionHeading({
  id,
  eyebrow,
  lines,
  accent,
  lead,
  action,
  center = false,
  dark = false,
}: {
  id?: string;
  eyebrow: string;
  lines: string[];
  accent?: number;
  lead?: string;
  action?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <Eyebrow className={dark ? "!text-gold" : ""}>{eyebrow}</Eyebrow>
        <h2 id={id} className="display mt-5 text-[clamp(2.5rem,6vw,4.75rem)]">
          <SplitReveal lines={lines} accent={accent} accentClass={dark ? "italic text-gold" : undefined} />
        </h2>
        {lead && (
          <Reveal className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${dark ? "text-cream/70" : "text-muted"}`}>
            {lead}
          </Reveal>
        )}
      </div>
      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}

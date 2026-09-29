import { LogoMark } from "@/components/Logo";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-sand/60 px-5 text-center">
      <div>
        <LogoMark draw="mount" className="mx-auto w-32 text-ink" />
        <p className="mt-10 text-sm font-bold tracking-[0.2em] text-bronze">404</p>
        <h1 className="display mt-3 text-[clamp(2.8rem,7vw,5rem)]">
          This page has <span className="italic text-bronze">stepped out.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-9">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}

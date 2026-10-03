import { Link } from "wouter";

/**
 * Homepage welfare summary. One screen, no icons, no cards: the point is carried by
 * the order (animals first) and the plain statements, and the link goes to /welfare
 * for the full account.
 */

const rows = [
  {
    who: "The animals",
    what: "Low oxygen flagged the moment it is logged, disease signs checked against the water history, and survival counted from a real record.",
  },
  {
    who: "The pond",
    what: "Feed matched to what the shrimp actually ate, a warning before a banned substance goes in the water, and records an audit can read.",
  },
  {
    who: "The people",
    what: "Guidance in the worker's own language, work that is seen and verified, and a sensor being built so nobody has to walk the pond bank at 3 am.",
  },
];

export default function WelfareSection() {
  return (
    <section className="px-6 py-20 md:py-28 bg-white" aria-labelledby="welfare-summary-title">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16">
        <div>
          <h2
            id="welfare-summary-title"
            className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] text-[#0E2A33] max-w-[16ch]"
          >
            Better for the shrimp, the pond and the people
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#557079] max-w-[40ch]">
            Healthier animals and a healthier crop come from the same thing: noticing what the water is doing before
            the shrimp do.
          </p>
          <Link
            href="/welfare"
            className="mt-8 inline-block text-[15px] font-semibold text-[#0067B1] underline underline-offset-4 decoration-2"
          >
            How Neerani supports shrimp welfare
          </Link>
        </div>

        <dl>
          {rows.map((row, i) => (
            <div
              key={row.who}
              className={`grid sm:grid-cols-[10rem_minmax(0,1fr)] gap-2 sm:gap-8 py-7 ${i > 0 ? "border-t border-[#D5E2E3]" : "sm:pt-2"}`}
            >
              <dt className="text-lg font-bold text-[#0E2A33]">{row.who}</dt>
              <dd className="text-lg leading-relaxed text-[#557079]">{row.what}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

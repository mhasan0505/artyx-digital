import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#FFFFFF] px-6 pt-28 pb-20 text-[#0D1333]">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-medium tracking-[0.08em] text-[#1A56DB]">
          404 — Not Found
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold text-[#0D1333] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-[#3D4A6B]">
          The page you are looking for doesn&apos;t exist. Return to the
          homepage or reach out to our Dhaka team.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-semibold text-[#1A56DB] hover:underline"
          >
            Talk to Us →
          </Link>
        </div>
      </div>
    </section>
  );
}

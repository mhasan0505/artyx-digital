import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#05091A] px-6 pt-28 pb-20 text-white">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-medium text-[#00C2FF]">404 — Not Found</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-[#8A9BC4]">
          The page you are looking for doesn&apos;t exist. Head back to our
          landing page or get in touch with our Dhaka team.
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
            className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

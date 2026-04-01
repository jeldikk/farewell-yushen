export default function WhatWeFeelPage() {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-base-200 via-base-100 to-base-200 px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl items-center justify-center">
        <div className="card w-full border border-base-300 bg-base-100/90 shadow-2xl backdrop-blur">
          <div className="card-body items-center text-center">
            <h1 className="text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              What We Feel Page
            </h1>
            <p className="mt-2 max-w-2xl text-pretty text-base-content/80 sm:text-lg">
              We have curated some questionnaire items to understand how
              everyone felt about your departure and to collect thoughtful
              feedback for your farewell discussion. Please stay tuned.
            </p>
            <p className="badge badge-primary">
              You can use the username tabs to view the responses from other
              team members.
            </p>
            <div className="divider my-3 w-full max-w-md" />
            <p className="text-sm text-base-content/60">
              Thank you for sharing your memories and kind words.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

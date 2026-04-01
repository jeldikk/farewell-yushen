export default function AdminPage() {
  return (
    <main className="bg-linear-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="badge badge-primary badge-outline mb-3">
            Admin Dashboard
          </div>
          <h1 className="text-balance text-3xl font-extrabold sm:text-4xl">
            Welcome to your Dashboard
          </h1>
        </div>

        {/* Intro Card */}
        <div className="card mb-6 border border-base-300 bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg">
              <span>💛</span> About this project
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              As you all know, our Onshore Lead Yushen is leaving us soon. We
              are planning to do something special for her — a website where
              everyone can share their feelings, memories, and photos. This is
              our tribute to Yushen and a way to express our gratitude and love.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card border border-base-300 bg-base-100 shadow-md transition-shadow hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-base">
                <span>💭</span> What We Feel
              </h2>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Answer a curated set of questions to share your feelings and
                favourite memories with Yushen.
              </p>
            </div>
          </div>

          <div className="card border border-base-300 bg-base-100 shadow-md transition-shadow hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-base">
                <span>🖼️</span> Gallery
              </h2>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Upload your AI-generated photos with Yushen and share them with
                the rest of the team.
              </p>
            </div>
          </div>
          <div className="card border border-base-300 bg-base-100 shadow-md transition-shadow hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-base">
                <span>📝</span> Note
              </h2>
              <p className="text-sm text-base-content/70 leading-relaxed">
                Write a note to Yushen and share your thoughts with the rest of
                the team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="relative min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto glass-strong rounded-3xl p-6 sm:p-10 space-y-6 animate-pop-in">
        <div className="text-center">
          <h1 className="text-2xl font-black text-gradient">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: June 2026
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold">1. Data Collection</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            SuiteSurvivor collects minimal data necessary to operate the room
            management features. This includes room codes, nicknames, and
            optional feedback ratings. We do not collect government IDs,
            financial information, or biometric data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold">2. How We Use Data</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Data is used solely to match roommates, track shared expenses, and
            aggregate anonymous feedback. We do not sell, rent, or share
            personal information with third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold">3. Data Storage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Room and review data is stored securely via Supabase Postgres with
            Row Level Security enabled. Local session state is stored in your
            browser and can be cleared at any time by signing out.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold">4. Your Rights</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You can request deletion of your data by contacting the
            administrator. Because this is a prototype/demo environment, data
            may be reset periodically for quality assurance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold">5. Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            For privacy concerns, reach out via the in-app feedback channel or
            contact the project maintainers directly.
          </p>
        </section>

        <div className="pt-4 text-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

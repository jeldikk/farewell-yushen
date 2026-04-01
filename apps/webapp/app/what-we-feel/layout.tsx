import ActiveTabLink from "@/components/active-tab-link/active-tab-link.component";

export default async function WhatWeFeelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-11/12 mx-auto">
      <div role="tablist" className="tabs tabs-border">
        <ActiveTabLink href="/what-we-feel" className="tab">
          Introduction
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/ambuj" className="tab">
          Ambuj
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/amit" className="tab">
          Amit
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/hardik" className="tab">
          Hardik
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/kathir" className="tab">
          Kathir
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/kamal" className="tab">
          Kamal
        </ActiveTabLink>
        <ActiveTabLink href="/what-we-feel/krishna" className="tab">
          Krishna
        </ActiveTabLink>
      </div>
      {children}
    </div>
  );
}

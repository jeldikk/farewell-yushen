import ActiveTabLink from "@/components/active-tab-link/active-tab-link.component";
import { getAuthUserDetails } from "@/utils/amplify.server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authDetails = await getAuthUserDetails();
  const email = authDetails?.authUser?.signInDetails?.loginId || "";
  const username = email.split("@")[0];
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl font-bold p-4">
        Hello, {username.charAt(0).toUpperCase() + username.slice(1)}
      </h1>
      <div role="tablist" className="tabs tabs-border">
        <ActiveTabLink href="/admin" className="tab">
          What is this ?
        </ActiveTabLink>
        <ActiveTabLink href="/admin/what-we-feel" className="tab">
          What do we feel ?
        </ActiveTabLink>
        <ActiveTabLink href="/admin/gallery" className="tab">
          Upload Images
        </ActiveTabLink>
      </div>
      {children}
    </div>
  );
}

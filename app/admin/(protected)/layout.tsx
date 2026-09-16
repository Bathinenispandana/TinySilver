import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Construct absolute URL for redirecting out of the admin subdomain
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const mainDomain = host.replace("admin.", "");
  const redirectUrl = `${protocol}://${mainDomain}/`;

  // 1. Check if user is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin");
  }

  // 2. Fetch user profile to check role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f6]">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-200 text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl font-bold">!</span>
          </div>
          <h1 className="text-[#25314d] font-bold text-xl mb-2">Access Denied</h1>
          <p className="text-[#827e9c] text-sm">You do not have administrator privileges to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f6]">
      {/* Admin Header spans full width */}
      <AdminHeader email={session.user.email || ""} />

      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../../components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../context/user";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main className="w-full">
          <UserProvider>
            <div className="w-[80%]">{children}</div>
          </UserProvider>
          <Toaster />
        </main>
      </SidebarProvider>
    </>
  );
}

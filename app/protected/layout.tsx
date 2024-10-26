import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../../components/app-sidebar";

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
          <div className="w-[80%]">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}

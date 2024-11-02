import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../../components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../context/user";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import Loader from './loading'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <UserProvider>
          <Suspense fallback={<Loader className="animate-spin" />}>
            <div className="w-full flex flex-col items-center ">
              <Navbar></Navbar>
              {children}
            </div>
          </Suspense>
        </UserProvider>
        <Toaster />
      </SidebarProvider>
    </>
  );
}

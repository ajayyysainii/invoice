import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header";
import ClientApplication from "@/components/ClientApplication";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientApplication>
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen">

              <Header />
              {children}
            </main>
          </SidebarProvider>
        </ClientApplication>
      </body>
    </html>
  );
}

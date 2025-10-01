export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <header className="flex justify-between items-center p-1 bg-gray-10">
      <span className="text-4xl font-bold text-indigo-10">
        Connecting people
      </span>
      <div className="header-images">
        <div className="header-image" />
        <div className="logo-image" />
      </div>
    </header>

    <main className="flex-1">{children}</main>

    <footer className="p-1 text-right bg-gray-100 text-sm text-gray-600">
      chatApp gruppe 5 (det her er vorefooter)
    </footer>
  </div>
);

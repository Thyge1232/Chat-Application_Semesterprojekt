export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">

    <header className="flex justify-between items-center p-40 bg-gray-100">
  <span className="text-4xl font-bold text-indigo-400">Her eren header</span>
  <img src="/Images/LogoChatApp.png" alt="Logo" className="h-20 w-20 object-contain" />
</header>


    <main className="flex-1">{children}</main>

    <footer className="p-24 text-right bg-gray-100 text-sm text-gray-600">
      chatApp gruppe 5 (det her er vorefooter)
    </footer>
  </div>
);
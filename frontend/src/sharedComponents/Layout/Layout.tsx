import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideButtons = () =>
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="flex flex-col h-screen z-0">
      <Header hideButtons={hideButtons()} />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      <Footer hideButtons={hideButtons()} />
    </div>
  );
};

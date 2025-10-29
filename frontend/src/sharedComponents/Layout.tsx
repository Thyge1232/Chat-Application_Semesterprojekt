import { Button } from "./Button";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import frog from "../assets/Images/frog.gif";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideButtons =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="flex flex-col h-screen z-0">
      {/* HEADER */}
      <header className="flex items-center justify-between p-[0.2rem] bg-[rgba(191,222,231,0.699)]">
        <img
          src={frog}
          alt="connecting people img"
          className="w-[clamp(40px,8vw,120px)] h-auto object-contain"
        />

        <div className="flex flex-1 relative justify-center">
          {!hideButtons && (
            <div className="absolute left-0 ml-44 flex gap-2">
              <Link to="/conversations">
                <Button className="text-[1.5rem] font-semibold rounded-md shadow px-4 py-2 bg-red-300 text-white cursor-pointer hover:bg-red-400 transition">
                  Samtaler
                </Button>
              </Link>
              <Link to="/home">
                <Button className="text-[1.5rem] font-semibold rounded-md shadow px-4 py-2 bg-blue-300 text-black cursor-pointer hover:bg-blue-400 transition">
                  Personlig side
                </Button>
              </Link>
              <Link to="/users">
                <Button className="text-[1.5rem] font-semibold rounded-md shadow px-4 py-2 bg-amber-500 text-white cursor-pointer hover:bg-amber-600 transition">
                  Brugere
                </Button>
              </Link>
            </div>
          )}
        </div>

        <img
          src={logo}
          alt="Logo"
          className="w-[clamp(40px,8vw,120px)] h-auto object-contain"
        />
      </header>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>

      {/* FOOTER */}
      <footer className="flex items-center justify-between p-[0.1rem] bg-gray-100 text-sm text-[#647997]">
        {!hideButtons && (
          <Link to="/">
            <Button className="text-[1.5rem] font-semibold rounded-md shadow px-4 py-2 bg-purple-400 text-white cursor-pointer hover:bg-purple-500 transition">
              Log ud
            </Button>
          </Link>
        )}
        <span>chatApp gruppe 5 (det her er vorefooter)</span>
      </footer>
    </div>
  );
};

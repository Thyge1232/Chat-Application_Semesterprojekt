import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideButtons =
    location.pathname === "/" || location.pathname === "/registration";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-0 bg-gray-100 z-0">
        <img
          src="/Images/header.jpg"
          alt="connecting people img"
          className="h-40 w-40 object-contain"
        />

        <div className="flex flex-1 justify-center relative">
          <span className="text-4xl font-bold text-indigo-400 absolute left-1/2 -translate-x-1/2">
            Connecting people
          </span>

          {!hideButtons && (
            <div className="flex gap-2 absolute left-0 ml-44">
              <Link to="/conversations">
                <Button className="text-2xl bg-red-200 text-white rounded-lg shadow-md">
                  Samtaler
                </Button>
              </Link>
              <Link to="/home">
                <Button className="text-2xl bg-blue-300 text-black rounded-lg shadow-md">
                  Personlig side
                </Button>
              </Link>
              <Link to="/users">
                <Button className="text-2xl bg-amber-500 text-white rounded-lg shadow-md">
                  Brugere
                </Button>
              </Link>
              <Link to="/settings">
                <Button className="text-2xl bg-amber-200 text-black rounded-lg shadow-md">
                  Indstillinger
                </Button>
              </Link>
            </div>
          )}
        </div>

        <img
          src="/Images/LogoChatApp.png"
          alt="Logo"
          className="h-40 w-40 object-contain"
        />
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="flex items-center justify-between p-1 bg-gray-100 text-sm text-gray-600">
        {!hideButtons && (
          <Link to="/">
            <Button className="text-2xl bg-purple-500 text-white rounded-lg shadow-md">
              Log ud
            </Button>
          </Link>
        )}
        <span>chatApp gruppe 5 (det her er vorefooter)</span>
      </footer>
    </div>
  );
};

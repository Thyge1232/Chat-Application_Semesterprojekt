import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./LayoutStyle.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideButtons =
    location.pathname === "/" || location.pathname === "/registration";

  return (
    <div className="layout">
      <header className="header">
        <img
          src="/Images/header.jpg"
          alt="connecting people img"
          className="header__image"
        />

        <div className="header__center">
          <span className="header__title">Connecting people</span>

          {!hideButtons && (
            <div className="header__nav">
              <Link to="/conversations">
                <Button className="nav-button nav-button--red">Samtaler</Button>
              </Link>
              <Link to="/home">
                <Button className="nav-button nav-button--blue">
                  Personlig side
                </Button>
              </Link>
              <Link to="/users">
                <Button className="nav-button nav-button--amber">
                  Brugere
                </Button>
              </Link>
              <Link to="/settings">
                <Button className="nav-button nav-button--amber-light">
                  Indstillinger
                </Button>
              </Link>
            </div>
          )}
        </div>

        <img
          src="/Images/LogoChatApp.png"
          alt="Logo"
          className="header__image"
        />
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        {!hideButtons && (
          <Link to="/">
            <Button className="nav-button nav-button--purple">Log ud</Button>
          </Link>
        )}
        <span>chatApp gruppe 5 (det her er vorefooter)</span>
      </footer>
    </div>
  );
};

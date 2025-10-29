import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../assets/styles/LayoutStyle.css";
import "../assets/styles/ButtonStyle.css";
import frogGif from "../assets/images/frog-message-me.gif";
import chatLogo from "../assets/images/LogoChatApp.png";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideButtons =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="layout">
      <header className="header">
        <img
          src={frogGif}
          alt="connecting people img"
          className="header__image"
        />

        <div className="header__center">
          <span className="header__title">Connecting people</span>

          {!hideButtons && (
            <div className="header__nav">
              <Link to="/conversations">
                <Button className="custom-nav-button custom-nav-button--red">
                  Samtaler
                </Button>
              </Link>
              <Link to="/home">
                <Button className="custom-nav-button custom-nav-button--blue">
                  Personlig side
                </Button>
              </Link>
              <Link to="/users">
                <Button className="custom-nav-button custom-nav-button--amber">
                  Brugere
                </Button>
              </Link>
            </div>
          )}
        </div>

        <img src={chatLogo} alt="Logo" className="header__image" />
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        {!hideButtons && (
          <Link to="/">
            <Button className="custom-nav-button custom-nav-button--purple">
              Log ud
            </Button>
          </Link>
        )}
        <span>chatApp gruppe 5 (det her er vorefooter)</span>
      </footer>
    </div>
  );
};

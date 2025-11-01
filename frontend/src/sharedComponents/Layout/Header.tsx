import logo from "../../assets/Images/logo.png";
import frog from "../../assets/Images/frog.gif";
import { NavButtons } from "./NavButtons";

export const Header = ({ hideButtons }: { hideButtons: boolean }) => (
  <header className="flex items-center justify-between p-[0.2rem] bg-[rgba(191,222,231,0.699)]">
    <img
      src={frog}
      alt="connecting people img"
      className="w-[clamp(40px,8vw,120px)] h-auto object-contain"
    />
    <div className="flex flex-1 relative justify-center">
      {!hideButtons && <NavButtons />}
    </div>
    <img
      src={logo}
      alt="Logo"
      className="w-[clamp(40px,8vw,120px)] h-auto object-contain"
    />
  </header>
);

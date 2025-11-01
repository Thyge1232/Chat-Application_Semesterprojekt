import { Link } from "react-router-dom";
import { Button } from "../Button";

export const Footer = ({ hideButtons }: { hideButtons: boolean }) => (
  <footer className="flex items-center justify-between p-[0.1rem] bg-gray-100 text-sm text-[#647997]">
    {!hideButtons && (
      <Link to="/">
        <Button className="text-[1.5rem] font-semibold rounded-md shadow px-4 py-2 bg-purple-400 text-white cursor-pointer hover:bg-purple-500 transition">
          Log ud
        </Button>
      </Link>
    )}
    <span>semesterprojekt gruppe 5 SWT</span>
  </footer>
);

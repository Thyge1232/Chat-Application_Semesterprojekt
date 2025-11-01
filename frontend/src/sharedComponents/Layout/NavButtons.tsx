import { Link } from "react-router-dom";
import { Button } from "../Button";

export const NavButtons = () => (
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
);

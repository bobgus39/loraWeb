import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import logo from "../../public/logo.png";

export default function Navbar() {
  return (
    <div className="w-full bg-black border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      
      <Link to="/" className="font-bold text-lg">
        <img className="w-20 h-20" src={logo} alt="Logo" />
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/downloads" className="text-gray-400 hover:text-white">
          Descargas
        </Link>

        <Link to="/order">
          <Button className="bg-blue-600 text-white">
            Encargar LoRA
          </Button>
        </Link>
      </div>
    </div>
  );
}
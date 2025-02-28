// src/components/Header/Header.tsx

import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Image
          src="/logo - grande.svg"
          alt="Logo DOE+"
          width={48}
          height={48}
          className="h-auto"
          priority
        />
        <nav className="flex items-center space-x-6 flex-grow justify-center">
          <Link href="/home" className="text-gray-700 hover:text-purple-500">
            Home
          </Link>
          <a href="#sobre" className="text-gray-700 hover:text-purple-500">
            Sobre
          </a>
          <a href="#instituicoes" className="text-gray-700 hover:text-purple-500">
            Instituições
          </a>
          <a href="#contato" className="text-gray-700 hover:text-purple-500">
            Contato
          </a>
          <Link href="/doacao-financeira" className="text-gray-700 hover:text-purple-500">
            Doação Financeira
          </Link>
        </nav>
        <div className="flex space-x-4 ml-auto">
          <Link href="/cadastro/etapa1">
            <Button
              color="secondary"
              className="bg-purple-500 text-white rounded-3g h-8 w-40"
            >
              Seja doador
            </Button>
          </Link>
          <Link href="/login">
            <Button color="secondary" className="rounded-3g h-8 w-40">
              Faça Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
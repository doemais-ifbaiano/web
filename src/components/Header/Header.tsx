import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Image
          src="/logo - grande.svg" // Caminho do arquivo SVG na pasta public
          alt="Logo DOE+"
          width={48} // Largura ajustada (48 * 4 = 192px)
          height={48} // Altura ajustada
          className="h-auto"
          priority // Carregar imagem prioritariamente
        />
        <nav className="flex items-center space-x-6 flex-grow justify-center">
          <a href="#home" className="text-gray-700 hover:text-purple-500">
            Home
          </a>
          <a href="#sobre" className="text-gray-700 hover:text-purple-500">
            Sobre
          </a>
          <a
            href="#instituicoes"
            className="text-gray-700 hover:text-purple-500"
          >
            Instituições
          </a>
          <a href="#contato" className="text-gray-700 hover:text-purple-500">
            Contato
          </a>
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

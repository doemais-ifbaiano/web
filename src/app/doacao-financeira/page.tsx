// app/doacao-financeira/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DoacaoFinanceira = () => {
  const [valor, setValor] = useState("");

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove qualquer caractere que não seja número
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setValor(numericValue);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-white py-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Image
            src="/logo - grande.svg"
            alt="Logo DOE+"
            width={80}
            height={80}
            className="h-auto"
            priority
          />

          {/* Links "Instituições" e "Perfil" no centro */}
          <nav className="flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#instituicoes" className="text-lg font-bold text-gray-700 hover:text-purple-500">
              Instituições
            </a>
            <a href="#perfil" className="text-lg font-bold text-gray-700 hover:text-purple-500">
              Perfil
            </a>
          </nav>

          {/* Foto de perfil no canto superior direito */}
          <div className="flex items-center">
            <Image
              src="/icon.png"
              alt="Foto de perfil"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Doação Financeira
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Transforme empatia em ação. Doe e veja como a generosidade pode mudar vidas.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              R$ 5,00
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              R$ 20,00
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              R$ 50,00
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              R$ 100,00
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Digite um valor"
              value={valor}
              onChange={handleValorChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-black"
            />
          </div>

          <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            Doar via Mercado Pago
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-purple-500 py-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} DOE+. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default DoacaoFinanceira;
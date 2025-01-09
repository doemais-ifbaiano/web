// app.tsx
"use client";
import Image from "next/image";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import Link from "next/link";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-white flex flex-col items-center justify-center">
        <section className="flex flex-col lg:flex-row items-center justify-center lg:gap-60 text-center lg:text-left">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo - grande.svg" // Caminho do arquivo SVG na pasta public
              alt="Logo DOE+"
              width={240} // Largura ajustada (48 * 4 = 192px)
              height={240} // Altura ajustada
              className="h-auto"
              priority // Carregar imagem prioritariamente
            />
          </div>

          {/* Informações */}
          <div className="mt-8 items-center lg:mt-0">
            <h2 className="text-2xl font-bold text-black dark:text-800">
              Faça a diferença, seja solidário
            </h2>
            <p className="mt-2 text-black dark:text-600">
              Sua contribuição ajuda a transformar vidas
            </p>
            <Link href="/cadastro/etapa1">
              <button className="mt-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                Clique aqui e seja um doador
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;

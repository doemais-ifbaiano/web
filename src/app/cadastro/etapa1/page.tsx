"use client";

import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

const Etapa1 = () => {
  const [name, setName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cpfCnpj || !phoneNumber || !birthDate) {
      alert("Preencha todos os campos.");
      return;
    }

    // Salva os dados no localStorage para serem usados na próxima etapa
    localStorage.setItem(
      "cadastroEtapa1",
      JSON.stringify({ name, cpfCnpj, phoneNumber, birthDate })
    );

    // Redireciona para a próxima etapa usando window.location
    window.location.href = "/cadastro/etapa2";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center mr-60">
        <div className="flex items-center justify-center w-240 h-240">
          <Image
            src="/logo - grande.svg" // Caminho do arquivo SVG na pasta public
            alt="Logo DOE+"
            width={240} // Largura ajustada (48 * 4 = 192px)
            height={240} // Altura ajustada
            className="h-auto"
            priority // Carregar imagem prioritariamente
          />
        </div>
      </div>

      {/* Container do formulário */}
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Cadastrar usuário
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Informe seus dados pessoais
        </p>
        <form onSubmit={handleNext}>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="ex. Maria Pereira Santos"
              label="Nome completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="ex. 123.456.789-10"
              label="CPF/CNPJ"
              required
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              type="date"
              label="Data de Nascimento"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              type="tel"
              placeholder="ex. (77) 9 1234-5678"
              label="Telefone"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            className="w-full mt-4 bg-purple-500 text-white hover:bg-purple-600"
            type="submit"
          >
            Próximo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa1;

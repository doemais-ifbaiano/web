"use client";

import Image from "next/image";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const Etapa2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [etapa1Data, setEtapa1Data] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("cadastroEtapa1");
    if (!savedData) {
      window.location.href = "/cadastro/etapa1";
    } else {
      setEtapa1Data(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: etapa1Data.name });

      // Salva os dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        username: etapa1Data.name,
        giver: {
          name: etapa1Data.name,
          cpfCnpj: etapa1Data.cpfCnpj,
          phoneNumber: etapa1Data.phoneNumber,
          birthDate: new Date(etapa1Data.birthDate),
        },
        createdAt: new Date(),
      });

      window.location.href = "/cadastro/sucesso";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Logo à esquerda */}
      <div className="flex flex-col items-center justify-center mr-40">
        {/* Espaçamento aumentado */}
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
          Cadastro - Etapa 2
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Crie sua conta com segurança
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              type="email"
              placeholder="ex. usuario@email.com"
              label="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              type="password"
              placeholder="Digite sua senha"
              label="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              type="password"
              placeholder="Confirme sua senha"
              label="Confirmar Senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6 flex items-center">
            <Checkbox isRequired>
              Aceito os{" "}
              <a href="/termos" className="text-purple-600 underline">
                termos de uso
              </a>
            </Checkbox>
          </div>

          <Button
            className="w-full mt-4 bg-purple-500 text-white hover:bg-purple-600"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa2;

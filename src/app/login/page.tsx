/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário autenticado:", user);
      router.push("/"); // Redirecione após login
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
      alert("Erro ao autenticar com o Google. Verifique as configurações.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Logo à esquerda */}
      <div className="flex flex-col items-center justify-center mr-40">
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Seu e-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Sua senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between mb-6 text-black">
            <Checkbox className="text-black-600">Mantenha-me conectado</Checkbox>
            <a
              href="/recuperar-senha"
              className="text-sm text-black-600 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>

          <Button
            className="w-full mt-4 bg-purple-500 text-white hover:bg-purple-600"
            type="submit"
          >
            Entrar
          </Button>

          <Button
            className="w-full mt-4 bg-gray-200 text-black hover:bg-gray-300"
            type="button"
            onPress={handleGoogleLogin}
          >
            <Image src="/flat-color-icons_google.svg" alt="Google" width={24} height={24} /> Entrar com Google
          </Button>

          <div className="mt-6 border-t pt-4 text-center">
            <a
              href="/cadastro/etapa1"
              className="block w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
            >
              Cadastrar-me
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

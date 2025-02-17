/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Input, Button } from "@nextui-org/react"; // Removido Checkbox
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

const senhaSeguraRegex = {
  tamanho: /.{8,}/,
  maiuscula: /[A-Z]/,
  minuscula: /[a-z]/,
  numero: /[0-9]/,
  especial: /[\W_]/,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const traduzirErroFirebase = (codigo: string) => {
  const erros: Record<string, string> = {
    "auth/email-already-in-use": "Este e-mail já está em uso.",
    "auth/invalid-email": "Formato de e-mail inválido.",
    "auth/weak-password": "A senha deve conter pelo menos 6 caracteres.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/internal-error": "Erro interno. Tente novamente mais tarde.",
  };

  return erros[codigo] || "Erro ao criar conta. Tente novamente.";
};

const Etapa2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Mantido para verificação de senha
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState("");

  const [etapa1Data, setEtapa1Data] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("cadastroEtapa1");
    if (!savedData) {
      window.location.href = "/cadastro/etapa1";
    } else {
      setEtapa1Data(JSON.parse(savedData));
    }
  }, []);

  const validarEmail = (email: string) => {
    setEmailError(emailRegex.test(email) ? null : "Formato de e-mail inválido. (BA009)");
  };

  const validarSenha = (senha: string) => {
    if (!senhaSeguraRegex.tamanho.test(senha)) setPasswordError("A senha deve ter no mínimo 8 caracteres. (BA004)");
    else if (!senhaSeguraRegex.maiuscula.test(senha)) setPasswordError("A senha deve conter pelo menos uma letra maiúscula. (BA005)");
    else if (!senhaSeguraRegex.minuscula.test(senha)) setPasswordError("A senha deve conter pelo menos uma letra minúscula. (BA006)");
    else if (!senhaSeguraRegex.numero.test(senha)) setPasswordError("A senha deve conter pelo menos um número. (BA007)");
    else if (!senhaSeguraRegex.especial.test(senha)) setPasswordError("A senha deve conter pelo menos um caractere especial. (BA008)");
    else setPasswordError(null);

    const strengthLevels = ["Fraca", "Média", "Forte"];
    let strength = 0;
    if (senhaSeguraRegex.tamanho.test(senha)) strength++;
    if (senhaSeguraRegex.maiuscula.test(senha)) strength++;
    if (senhaSeguraRegex.minuscula.test(senha)) strength++;
    if (senhaSeguraRegex.numero.test(senha)) strength++;
    if (senhaSeguraRegex.especial.test(senha)) strength++;

    setPasswordStrength(strengthLevels[Math.min(strength - 2, 2)] || "Muito Fraca");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || passwordError) {
      setError("Corrija os erros antes de continuar.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: etapa1Data.name });

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
    } catch (err: any) {
      setError(traduzirErroFirebase(err.code));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center mr-40">
        <div className="flex items-center justify-center w-240 h-240">
          <Image src="/logo - grande.svg" alt="Logo DOE+" width={240} height={240} className="h-auto" priority />
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Cadastro - Etapa 2</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Crie sua conta com segurança</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input type="email" placeholder="ex. usuario@email.com" label="E-mail" required value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validarEmail(e.target.value);
              }} className="w-full" />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-6">
            <Input type="password" placeholder="Digite sua senha" label="Senha" required value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validarSenha(e.target.value);
              }} className="w-full" />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            <p className="text-gray-600 text-sm">Força da senha: {passwordStrength}</p>
          </div>

          <div className="mb-6">
            <Input type="password" placeholder="Confirme sua senha" label="Confirmar Senha" required value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} className="w-full" />
          </div>

          <Button className="w-full mt-4 bg-purple-500 text-white hover:bg-purple-600" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa2;

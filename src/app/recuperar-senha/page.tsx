/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import Image from 'next/image';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const actionCodeSettings = {
      url: `${window.location.origin}/nova-senha`, // Certifique-se de que "/nova-senha" é a página certa
      handleCodeInApp: true, // Garante que o app lida com o fluxo
    };
    

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage('Um link para redefinir sua senha foi enviado para o seu e-mail.');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('E-mail não encontrado. Verifique e tente novamente.');
      } else {
        setError('Erro ao enviar o e-mail. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center mr-40">
        <div className="flex items-center justify-center w-240 h-240">
          <Image
            src="/logo - grande.svg"
            alt="Logo DOE+"
            width={240}
            height={240}
            className="h-auto"
            priority
          />
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Esqueci minha senha
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Insira seu e-mail cadastrado para iniciar o processo de recuperação de conta.
        </p>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="">
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

          <Button
            className="w-full mt-4 mb-40 bg-purple-500 text-white rounded-6g hover:bg-purple-600"
            type="submit"
          >
            Enviar link de recuperação
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;

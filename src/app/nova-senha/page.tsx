/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { auth } from '@/firebase/firebaseConfig';
import { confirmPasswordReset } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CadastrarNovaSenha = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Tente novamente.');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode'); // Código enviado por e-mail para resetar a senha

    if (!oobCode) {
      setError('Link de redefinição inválido ou expirado.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccessMessage('Senha redefinida com sucesso! Você será redirecionado para o login.');
      setTimeout(() => router.push('/login'), 3000); // Redireciona após 3 segundos
    } catch (err) {
      setError('Erro ao redefinir senha. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center mr-40">
        <div className="flex items-center justify-center w-240 h-240">
          <div className="flex flex-col items-center">
            <Image
            src="/logo - grande.svg" // Caminho do arquivo SVG na pasta public
            alt="Logo DOE+"
            width={240}
            height={240}
            className="h-auto"
            priority // Carregar imagem prioritariamente
          />
          </div>
        </div>
      </div>

      {/* Container do formulário */}
      <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">
          Cadastrar nova senha
        </h1>
        <p className="text-gray-600 text-center mb-6">Digite sua nova senha</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Sua nova senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirmar senha
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirmar sua nova senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button
            className="w-full bg-purple-500 text-white font-semibold py-3 rounded-full hover:bg-purple-600"
            type="submit"
          >
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarNovaSenha;

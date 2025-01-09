'use client';

import { Input, Button, Checkbox } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

const Etapa2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [etapa1Data, setEtapa1Data] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('cadastroEtapa1');
    if (!savedData) {
      window.location.href = '/cadastro/etapa1';
    } else {
      setEtapa1Data(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: etapa1Data.name });

      // Salva os dados no Firestore
      await setDoc(doc(db, 'users', user.uid), {
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

      window.location.href = '/cadastro/sucesso';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Cadastro - Etapa 2
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              label="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <Checkbox isRequired>
              Aceito os <a href="/termos" className="text-purple-600">termos de uso</a>
            </Checkbox>
          </div>

          <Button className="w-full mt-4" color="secondary" type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa2;

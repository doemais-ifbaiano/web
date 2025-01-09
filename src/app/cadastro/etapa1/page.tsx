'use client';

import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';

const Etapa1 = () => {
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cpfCnpj || !phoneNumber || !birthDate) {
      alert('Preencha todos os campos.');
      return;
    }

    // Salva os dados no localStorage para serem usados na próxima etapa
    localStorage.setItem(
      'cadastroEtapa1',
      JSON.stringify({ name, cpfCnpj, phoneNumber, birthDate })
    );

    // Redireciona para a próxima etapa usando window.location
    window.location.href = '/cadastro/etapa2';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Cadastro
        </h1>
        <form onSubmit={handleNext}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Digite seu nome completo"
              label="Nome Completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="Digite seu CPF ou CNPJ"
              label="CPF/CNPJ"
              required
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Input
              type="date"
              label="Data de Nascimento"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Input
              type="tel"
              placeholder="Digite seu telefone"
              label="Telefone"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />
          </div>

          <Button className="w-full mt-4" color="secondary" type="submit">
            Próximo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa1;

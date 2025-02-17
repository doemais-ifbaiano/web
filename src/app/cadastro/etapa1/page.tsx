/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
};

const validarCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const validarDigito = (cnpj: string, peso: number[]) => {
    let soma = 0;
    for (let i = 0; i < peso.length; i++) soma += parseInt(cnpj[i]) * peso[i];
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = validarDigito(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (primeiroDigito !== parseInt(cnpj[12])) return false;

  const segundoDigito = validarDigito(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return segundoDigito === parseInt(cnpj[13]);
};

const calcularIdade = (dataNascimento: string) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

const Etapa1 = () => {
  const [name, setName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCpfCnpj(value);
  };

  const validarDataNascimento = (data: string) => {
    if (!data) {
      setBirthDateError("Informe uma data válida.");
      return false;
    }

    const hoje = new Date();
    const nascimento = new Date(data);

    if (nascimento > hoje) {
      setBirthDateError("A data de nascimento não pode estar no futuro.");
      return false;
    }

    if (calcularIdade(data) < 1) {
      setBirthDateError("A idade mínima para cadastro é de 1 ano.");
      return false;
    }

    setBirthDateError(null);
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !cpfCnpj || !phoneNumber || !birthDate) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!validarDataNascimento(birthDate)) {
      return;
    }

    if (cpfCnpj.length === 11 && !validarCPF(cpfCnpj)) {
      alert("CPF inválido!");
      return;
    }

    if (cpfCnpj.length === 14 && !validarCNPJ(cpfCnpj)) {
      alert("CNPJ inválido!");
      return;
    }

    if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
      alert("O CPF deve ter 11 dígitos e o CNPJ deve ter 14.");
      return;
    }

    const cadastrosExistentes = JSON.parse(localStorage.getItem("cadastros") || "[]");

    const jaCadastrado = cadastrosExistentes.some((cadastro: any) => cadastro.cpfCnpj === cpfCnpj);

    if (jaCadastrado) {
      alert("O CPF/CNPJ já está cadastrado!");
      return;
    }

    const novoCadastro = { name, cpfCnpj, phoneNumber, birthDate };
    localStorage.setItem("cadastros", JSON.stringify([...cadastrosExistentes, novoCadastro]));

    window.location.href = "/cadastro/etapa2";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center mr-60">
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
              placeholder="Digite seu CPF ou CNPJ (apenas numeros)"
              label="CPF/CNPJ"
              required
              value={cpfCnpj}
              onChange={handleCpfCnpjChange}
              className="w-full"
              maxLength={14}
            />
          </div>

          <div className="mb-6">
            <Input
              type="date"
              label="Data de Nascimento"
              required
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                validarDataNascimento(e.target.value);
              }}
              className="w-full"
            />
            {birthDateError && <p className="text-red-500 text-sm mt-1">{birthDateError}</p>}
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

          <Button className="w-full mt-4 bg-purple-500 text-white hover:bg-purple-600" type="submit">
            Próximo
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Etapa1;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Importe o CSS da paginação
import { Navigation, Pagination } from "swiper/modules"; // Adicione Pagination
import { useState } from "react";

const Home = () => {
    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header */}
            <header className="w-full bg-white py-2 shadow-md"> {/* Header mais compacto */}
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Logo */}
                    <Image
                        src="/logo - grande.svg" // Caminho do arquivo SVG na pasta public
                        alt="Logo DOE+"
                        width={80} // Logo um pouco menor
                        height={80} // Logo um pouco menor
                        className="h-auto"
                        priority
                    />

                    {/* Links "Instituições" e "Perfil" no centro */}
                    <nav className="flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
                        <a href="#instituicoes" className="text-lg font-bold text-gray-700 hover:text-purple-500">
                            Instituições
                        </a>
                        <a href="#perfil" className="text-lg font-bold text-gray-700 hover:text-purple-500">
                            Perfil
                        </a>
                    </nav>

                    {/* Foto de perfil no canto superior direito */}
                    <div className="flex items-center">
                        <Image
                            src="/icon.png"
                            alt="Foto de perfil"
                            width={40} // Tamanho da foto de perfil
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Instituições Parceiras
                </h1>

                {/* Barra de pesquisa e Filtro */}
                <div className="flex justify-end space-x-4 mb-6">
                    {/* Barra de pesquisa */}
                    <div className="relative w-64"> {/* Barra de pesquisa menor */}
                        <input
                            type="text"
                            placeholder="Pesquisar instituição..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                        <button className="absolute right-2 top-2 text-gray-500">
                            🔍
                        </button>
                    </div>

                    {/* Filtro no estilo "hambúrguer" */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Filtrar
                        </button>
                        {/* Dropdown de filtros */}
                        {showFilters && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Todas
                                </button>
                                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Educação
                                </button>
                                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Saúde
                                </button>
                                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Animais
                                </button>
                                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Direitos Humanos
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Carrossel de Instituições */}
                <div className="mb-8">
                    <Swiper
                        navigation={true} // Habilita as setas de navegação
                        modules={[Navigation, Pagination]} // Módulos necessários
                        pagination={{ clickable: true }} // Bolinhas de paginação
                        loop={true} // Habilita o loop infinito
                        className="mySwiper"
                        breakpoints={{
                            640: {
                                slidesPerView: 1, // 1 slide em telas pequenas
                            },
                            768: {
                                slidesPerView: 2, // 2 slides em telas médias
                            },
                            1024: {
                                slidesPerView: 3, // 3 slides em telas grandes
                            },
                        }}
                    >
                        {/* APAE */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/apae_logo.png" // Substitua pelo caminho da logo da APAE
                                    alt="APAE Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    APAE - Associação de Pais e Amigos dos Excepcionais
                                </h2>
                                <Link href="/apae">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* SOS Animais de Rua */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/sos.jpg" // Substitua pelo caminho da logo da SOS Animais de Rua
                                    alt="SOS Animais de Rua Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    SOS Animais de Rua
                                </h2>
                                <Link href="/sos-animais">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* Fundação Cantos das Artes */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/fundação.jpg" // Substitua pelo caminho da logo da Fundação Cantos das Artes
                                    alt="Fundação Cantos das Artes Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Fundação Cantos das Artes
                                </h2>
                                <Link href="/cantos-das-artes">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* Santa Casa da Misericórdia */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/jose-oliveira.png" // Substitua pelo caminho da logo da Santa Casa da Misericórdia
                                    alt="Santa Casa da Misericórdia Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Santa Casa da Misericórdia
                                </h2>
                                <Link href="/santa-casa">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* AACF */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/aapc.jpg" // Substitua pelo caminho da logo da AACF
                                    alt="AACF Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    AACF - Associação de Amparo à Criança e Família Carente
                                </h2>
                                <Link href="/aacf">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* Philantropia Inteligente */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/philantropia.png" // Substitua pelo caminho da logo
                                    alt="Philantropia Inteligente Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Philantropia Inteligente
                                </h2>
                                <Link href="/philantropia">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* VOTELGBT+ */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/votelgbt.png" // Substitua pelo caminho da logo
                                    alt="VOTELGBT+ Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    VOTELGBT+
                                </h2>
                                <Link href="/votelgbt">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* Apoia.se */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/apoia-se.png" // Substitua pelo caminho da logo
                                    alt="Apoia.se Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Apoia.se
                                </h2>
                                <Link href="/apoia-se">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>

                        {/* Ação Cidadania */}
                        <SwiperSlide>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <Image
                                    src="/acao-cidadania.png" // Substitua pelo caminho da logo
                                    alt="Ação Cidadania Logo"
                                    width={100}
                                    height={100}
                                    className="mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Ação Cidadania
                                </h2>
                                <Link href="/acao-cidadania">
                                    <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                                        Veja mais
                                    </button>
                                </Link>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-purple-500 py-4 text-center text-white">
                <p>&copy; {new Date().getFullYear()} DOE+. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
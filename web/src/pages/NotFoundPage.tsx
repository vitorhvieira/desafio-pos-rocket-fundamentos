import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-gray-300  min-h-screen flex items-center justify-center px-3">
      <div className="flex flex-col items-center justify-center gap-6 mt-2 rounded-lg bg-white p-6 lg:p-16">
        <img
          src="/404.svg"
          alt="Página não encontrada"
          className="max-w-xs w-full"
        />
        <div className="flex flex-col items-center gap-6 text-center ">
          <h1 className="text-2xl font-bold font-sans">Link não encontrado</h1>
          <p className="text-gray-500 text-sm">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <Link to="/" className="text-blue-dark underline">
              brev.ly
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

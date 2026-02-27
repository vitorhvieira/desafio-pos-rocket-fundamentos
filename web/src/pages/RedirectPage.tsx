import { useQuery } from "@tanstack/react-query";
import { getOriginalUrl } from "../services/get-original-url";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["link", shortUrl],
    queryFn: () => getOriginalUrl(shortUrl!),
  });

  useEffect(() => {
    if (data?.originalUrl) {
      window.location.href = data.originalUrl;
    }
  }, [data]);

  if (isError) return <Navigate to="/404" />;

  return (
    <div className="bg-gray-400 min-h-screen px-3 flex items-center justify-center">
      <div className="flex flex-col rounded-lg items-center text-center gap-6 bg-white p-12 lg:p-16">
        <img src="/Logo_Icon.svg" alt="" />
        <h2 className="text-lg font-bold">Redirecionando...</h2>
        <div className="flex flex-col">
          <span>O link será aberto automaticamente em alguns instantes.</span>
          <span>
            Não foi redirecionado?
            <a
              target="_blank"
              href={data?.originalUrl}
              className="underline text-blue-base"
            >
              Acesse aqui
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

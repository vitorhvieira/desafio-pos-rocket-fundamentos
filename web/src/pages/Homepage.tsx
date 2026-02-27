import { useMutation } from "@tanstack/react-query";
import { LinkForm } from "../components/LinkForm";
import { LinkList } from "../components/LinkList";
import { exportCsv } from "../services/export-csv";
import { Loader } from "../components/Loader";
import DownloadSimplesIcon from "/public/icons/downloadSimples-svg.svg?react";

export default function Homepage() {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: exportCsv,
    onSuccess: (data) => window.open(data.url),
  });
  return (
    <div className=" bg-gray-300">
      <div className="flex flex-col gap-3 px-3 mx-auto min-h-screen lg:max-w-5xl">
        <img
          src={"/Logo.png"}
          width={147}
          height={32}
          className="self-center mt-8 lg:self-start "
        />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-10 lg:items-start">
          <div className="flex flex-col mt-2 rounded-lg bg-white p-6 lg:col-span-4">
            <div className="flex flex-col items-start gap-5 font-sans">
              <h2 className="text-xl font-bold">Novo link</h2>
              <LinkForm />
            </div>
          </div>

          <div className="flex flex-col mt-2 rounded-lg bg-white p-6 lg:col-span-6">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-xl font-bold font-sans">Meus Links</h2>
              <button
                onClick={() => mutate()}
                className="flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader />
                    <p>Gerando...</p>
                  </>
                ) : isError ? (
                  <p>Aconteceu algum erro</p>
                ) : (
                  <div className="rounded-md p-2 bg-gray-200 flex text-center justify-center gap-2">
                    <DownloadSimplesIcon className=" w-4 h-4 " />
                    <p className="text-sm text-gray-500 font-semibold">
                      Baixar CSV
                    </p>
                  </div>
                )}
              </button>
            </div>
            <div className="flex flex-col justify-center gap-3 border-t border-gray-200">
              <LinkList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

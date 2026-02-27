import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLinks } from "../services/get-links";
import { deleteLink } from "../services/delete-link";
import { Loader } from "./Loader";
import CopyIcon from "/public/icons/copy-svg.svg?react";
import TrashIcon from "/public/icons/trash-svg.svg?react";
import LinkIcon from "/public/icons/link-svg.svg?react";

export function LinkList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Aconteceu algum erro</p>;
  if (!data || data?.length === 0) {
    return (
      <div className="flex flex-col items-center pt-4 gap-3">
        <LinkIcon className="w-5 h-5" />
        <span className="text-[10px] text-gray-500">
          AINDA NÃO EXISTE LINKS CADASTRADOS
        </span>
      </div>
    );
  }

  async function handleCopyText(url: string) {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/${url}`,
    );
  }

  return (
    <div>
      {data?.map((link) => (
        <div key={link.id} className="pt-3 flex justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0 flex-1 sm:flex-none sm:max-w-full">
            <a
              href={`${import.meta.env.VITE_FRONTEND_URL}/${link.shortUrl}`}
              className="text-blue-dark truncate "
              dir="rtl"
            >
              {import.meta.env.VITE_FRONTEND_URL}/{link.shortUrl}
            </a>
            <span className="text-[10px] text-gray-500 truncate" dir="rtl">
              {link.originalUrl}
            </span>
          </div>

          <div className="flex items-center justify-center gap-8 ">
            <div>
              <span className="text-sm font-semibold text-gray-500 ">
                {link.accessCount} acessos
              </span>
            </div>
            <div className="flex gap-1">
              <button
                className="rounded-md p-2 bg-gray-200"
                onClick={() => handleCopyText(link.shortUrl)}
              >
                <CopyIcon className="fill-black w-4 h-4 " />
              </button>
              <button
                className="rounded-md p-2 bg-gray-200"
                onClick={() => mutate(link.id)}
              >
                <TrashIcon className="fill-black w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

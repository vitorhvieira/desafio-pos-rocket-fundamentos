import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createLink } from "../services/create-link";
import { isAxiosError } from "axios";
import WarningIcon from "/public/icons/warning-svg.svg?react";

const schema = z.object({
  originalUrl: z.string().url("Precisa ser uma URL válida com 'https'"),
  shortUrl: z
    .string()
    .min(4, "Mínimo de 4 caracteres")
    .max(20, "Máximo de 20 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "Apenas letras, números, - e _"),
});

type LinkFormProps = z.infer<typeof schema>;

export function LinkForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormProps>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["links"] }),
  });

  const onSubmit = async (data: LinkFormProps) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (e) {
      if (isAxiosError(e)) {
        setError("shortUrl", { message: e.response?.data?.message });
      }
    }
  };

  const shortUrlRegister = register("shortUrl");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full"
    >
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-xs font-sans">LINK ORIGINAL</label>
        <input
          className="border border-gray-300 rounded-lg p-3.5"
          {...register("originalUrl")}
          placeholder="www.exemplo.com.br"
        />
        {errors.originalUrl && (
          <div className="flex text-center gap-1">
            <WarningIcon className="w-4 h-4 fill-red-600" />
            <span className="text-danger text-xs">
              {errors.originalUrl.message}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-xs font-sans">
          LINK ENCURTADO
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3.5">
          <span className="text-gray-400 py-3.5 whitespace-nowrap">
            brev.ly/
          </span>
          <input
            className="flex-1 py-3.5 outline-none bg-transparent"
            {...shortUrlRegister}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
              shortUrlRegister.onChange(e);
            }}
          />
        </div>
        {errors.shortUrl && (
          <div className="flex gap-1">
            <WarningIcon className="w-4 h-4 fill-red-600" />
            <span className="text-danger text-xs">
              {errors.shortUrl.message}
            </span>
          </div>
        )}
      </div>
      <input
        className="py-4 w-full font-sans text-sm text-white bg-blue-base rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        value="Salvar Link"
        disabled={isSubmitting || isPending}
      />
    </form>
  );
}

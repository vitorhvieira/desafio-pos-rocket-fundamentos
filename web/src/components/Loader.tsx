export function Loader() {
  const blades = Array.from({ length: 12 });

  return (
    <div className=" inset-0 flex flex-col items-center  justify-center py-10 gap-4">
      <div className="relative w-7 h-7">
        {blades.map((_, index) => {
          const rotate = index * 30;
          const delay = index * 0.083;

          return (
            <div
              key={index}
              className="absolute  bottom-0 w-[2px] h-[8px] rounded-sm origin-[center_-8px] animate-spinner"
              style={{
                transform: `rotate(${rotate}deg) translateX(-50%)`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
      <span className="text-sm text-gray-500">CARREGANDO LINKS...</span>
    </div>
  );
}

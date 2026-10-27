interface HeaderProps {
  onHowToPlay?: () => void;
}

export function Header({ onHowToPlay }: HeaderProps) {
  return (
    <header className="flex h-[69px] items-center justify-between bg-[#FFE7C2] px-6 text-[#381313] sm:px-12 md:px-[15%]">
      <h1 className="text-3xl font-extrabold sm:text-4xl">
        Marco.
      </h1>

      <button
        type="button"
        onClick={onHowToPlay}
        className="text-base font-bold transition-opacity hover:opacity-70 sm:text-xl"
      >
        Como jogar?
      </button>
    </header>
  );
}
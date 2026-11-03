import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface HomePageProps {
  onStart: () => void;
  onHowToPlay?: () => void;
}

export function HomePage({
  onStart,
  onHowToPlay,
}: HomePageProps) {
  return (
    <>
      <main className="min-h-screen bg-[#381313] text-[#FFE7C2]">
        {/* Cabeçalho bege */}
        <Header onHowToPlay={onHowToPlay} />

        <section className="flex min-h-[calc(100vh-69px)] flex-col items-center px-5 pt-28 sm:px-10 sm:pt-32">
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="text-xl font-extrabold leading-[1.4] sm:text-2xl md:text-[28px]">
              O Marco foi desenvolvido para desenvolvido para apoiar 
              alunos do ensino médio na relação de datas e eventos 
              históricos.
              Organize os cards em ordem cronológica e construa a
              sua linha do tempo!
            </p>

            <button
              type="button"
              onClick={onStart}
              className="mt-7 min-w-40 rounded-full bg-[#FFE7C2] px-10 py-2
                text-xl font-medium text-[#381313]
                transition-transform hover:scale-105
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#FFE7C2]"
            >
              Iniciar
            </button>
          </div>

          <div
            className="mt-14 w-full max-w-[1100px] px-2 sm:mt-16" 
            aria-hidden="true"
          >
            
          <div className="relative flex h-[18px] items-center">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-[#FFE7C2]" />
              <div className="relative mx-auto flex w-[82%] items-center justify-between">
                      {Array.from({ length: 7 }, (_, index) => (
                      <span
                          key={index}
                          className="relative z-10 h-[18px] w-[18px] shrink-0 rounded-full bg-[#FFE7C2]"
                      />
                      ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>  
  );
}

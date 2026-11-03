
import React from "react";

interface TimelineProps {
  currentPhase: number;
  children: React.ReactNode;
  years?: (number | string)[];
}

const PHASE_TITLES: Record<number, string> = {
  1: "Mundos Antigos e Medievais",
  2: "Transformações da Modernidade",
  3: "Mundo Contemporâneo",
};

export const Timeline: React.FC<TimelineProps> = ({
  currentPhase,
  children,
  years = [],
}) => {
  const phaseTitle =
    PHASE_TITLES[currentPhase] ?? `Fase ${currentPhase}`;

  const positions = React.Children.toArray(children);

  return (
    <section
      className="w-full shrink-0 rounded-2xl bg-[#381313] p-3 text-[#FFE7C2] sm:p-4"
      aria-label="Linha do tempo dos eventos históricos"
    >
      <header className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-75">
            Fase {currentPhase} de 3
          </p>

          <h2 className="mt-1 text-lg font-extrabold sm:text-xl">
            {phaseTitle}
          </h2>
        </div>

        <span className="text-sm font-medium opacity-80">
          Organize os eventos cronologicamente na linha do tempo
        </span>
      </header>

      <div className="relative">
        {/* Régua temporal */}
        <div
          aria-hidden="true"
          className="absolute left-[-16px] right-[-16px] top-[34px] hidden h-1 bg-[#FFE7C2] md:block lg:left-[-24px] lg:right-[-24px]"
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {positions.map((position, index) => (
            <div
              key={index}
              className="relative flex min-w-0 flex-col"
            >
              <div className="relative mb-2 flex flex-col items-center gap-1">
                <span className="text-sm font-medium">
                  {years[index] ?? `Posição ${index + 1}`}
                </span>

                <span
                  aria-hidden="true"
                  className="
                    z-10 h-[18px] w-[18px] shrink-0
                    rounded-full bg-[#FFE7C2]
                    md:absolute md:left-1/2 md:top-[30px]
                    md:-translate-x-1/2
                  "
                />
              </div>

              <div className="mt-2 md:mt-5">
                {position}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const integrantes = [
  {
    nome: "Leticia Silva",
    linkedin: "https://www.linkedin.com/in/leticia-silva-6a732a262",
  },
  {
    nome: "João Victor",
    linkedin: "https://www.linkedin.com/in/jvqfernandes/",
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#FFE7C2] px-6 py-6 text-[#381313] sm:px-12">
      <div className="mx-auto grid w-full max-w-5xl gap-5 text-center sm:grid-cols-2 sm:items-center sm:text-left">
        <div className="space-y-1">
          <p className="text-sm font-bold">
            Projeto acadêmico • UNIFEI
          </p>

          <p className="text-sm">
            Sistemas de Informação
          </p>

          <p className="text-sm">
            Computação Aplicada à Educação
          </p>
        </div>

        <div className="space-y-3 sm:text-right">
          <p className="text-sm italic">
            Compreender o passado para interpretar o presente.
          </p>

          <div>
            <p className="mb-2 text-sm font-bold">
              Desenvolvido por
            </p>

            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end">
              {integrantes.map((integrante) => (
                <li key={integrante.nome}>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline decoration-[#381313]/40 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    {integrante.nome}
                    <span className="sr-only">
                      {" "}— abrir perfil no LinkedIn em nova aba
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

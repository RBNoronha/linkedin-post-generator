import Link from "next/link";

interface PropsBotaoCustomizado {
  currentTab: string | number;
}

const BotaoCustomizado = ({ currentTab }: PropsBotaoCustomizado) => {
  const botoes = [
    {
      link: "/",
      texto: "Estilos💃",
      tooltip: "Gerar postagens usando estilos dos principais criadores do LinkedIn.",
      nomeTab: "vibe",
    },
    {
      link: "/custom",
      texto: "Personalizado 🏗️",
      tooltip: "Use seu próprio texto personalizado para gerar uma postagem",
      nomeTab: "custom",
    },
    {
      link: "/template",
      texto: "Modelo 📋",
      tooltip: "Gerar postagem com base em um exemplo",
      nomeTab: "template",
    },
    {
      link: "/enhancer",
      texto: "Aprimorador 💫",
      tooltip: "Aprimore sua postagem, torne-a mais curta, mais longa, corrija a gramática",
      nomeTab: "enhancer",
    },
    {
      link: "/ideas",
      texto: "Ideias💡",
      tooltip: "Gere ideias para sua postagem",
      nomeTab: "ideas",
    },
  ];

  return (
    <>
      {botoes.map((botao, index) => (
        <Link href={botao.link} key={index}>
          <div className="relative group">
            <button
              className={`px-3 py-2 rounded-md text-xs font-medium ${
                currentTab === botao.nomeTab
                  ? "bg-gray-300 text-black"
                  : "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
            >
              {botao.texto}
            </button>
            <span
              className="tooltip-text text-sm bg-gray-100 text-gray-700 p-1 rounded-md absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300"
              style={{ width: "150px" }}
            >
              {botao.tooltip}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default BotaoCustomizado;

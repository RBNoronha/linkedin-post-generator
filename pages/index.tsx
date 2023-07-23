import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CustomButton from "@/components/CustomButton"; // ajuste o caminho de importação de acordo com sua estrutura de arquivos
import { useSession } from "next-auth/react";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import Popup from "@/components/Popup";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaDev,
  FaFacebook,
  FaReddit,
} from "react-icons/fa";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Historia");
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tab, setTab] = useState("vibe"); // Padrão para a aba "vibe"
  const { data: session, status } = useSession();
  const clickCount = useRef(0);

  const handleButtonClick = () => {
    clickCount.current += 1; // Incrementa clickCount a cada clique
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  // const [hasVideo, setHasVideo] = useState<boolean>(false);
  // const [hasCarousel, setHasCarousel] = useState<boolean>(false);

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // prompt para otimizar a postagem

  // adicione mais vibes conforme necessário
  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Historia":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tenha mais chances de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém impulsionamentos e demissões baseados no que você está escrevendo. Impulsionamentos positivos são:

- Em cada postagem, adicione emojis.
- Máximo de 200 caracteres por sentença.
- Inicie cada sentença em uma nova linha e adicione números nas primeiras 2 linhas.
- Adicione 3 hashtags, sendo 2 genéricas e uma bem específica (no final). As tags devem estar relacionadas ao tema da postagem.
- Adicione uma pergunta ao final da postagem para iniciar uma discussão. Antes das hashtags.
- As duas primeiras linhas devem ser cativantes.
- Não adicione links, pois links não são recomendados.
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.

Dê ideias sobre que imagem ou visual pode ser adicionado no final da postagem (esse texto não conta como parte da postagem)
${post}
---
O comprimento da postagem gerada deve ser de mais de 800 a 1200 caracteres
---
Deve haver um espaço entre cada linha
---
Mantenha todas as menções de pessoas intactas
---
Inicie a primeira linha com algo como: "Eu fiz algo", "Em 2023, eu fiz", "Cansado de", "Às vezes é apenas", "Um caminho em direção a", "Porque isso não é", "Tenho lutado", (altere o início dependendo do contexto)
---
Adicione emojis, se adequado.
---
Deve ser uma história`;
        break;
      case "Nitida":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tenha mais chances de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém impulsionamentos e demissões baseados no que você está escrevendo. Se a pessoa selecionar esta ${vibe}, certifique-se de que a postagem gerada a partir de ${post} siga estas condições e seja curta, concisa e inspiradora:

- O comprimento da postagem deve ser de no máximo 500 caracteres.
- Cada sentença deve ter menos de 50 caracteres.
- As primeiras sentenças devem começar com algo como: "Passei 5 meses", "Plano de 10 etapas", "Faturei 10.000 em", "Em janeiro passado, este janeiro", "Estive em...", "Criei 1000 de...", "Como obter 1000 seguidores", "Como fazer 1000 de...", "10 lições que me levaram", "15 razões", "Há 5 dias", "3 passos chocantes", "Minha estratégia para 2023", "Nos últimos 10 anos" (altere os números, gere sempre novos números, gere sempre novos começos). As próximas sentenças não devem conter números e essas formulações.
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.
- As próximas sentenças devem ser geradas e não devem conter números.
---
Cada sentença em uma nova linha
---
Adicione espaço entre cada abstração.
---
Mostre apenas a postagem gerada`;

        break;
      case "Lista":
        prompt = `Gere uma postagem que provavelmente será curtida e compartilhada no LinkedIn, com base em ${post}. Sua postagem deve seguir estas condições:

- O comprimento da postagem deve ser de no máximo cem caracteres.
- Cada sentença deve ter no máximo duas palavras.
- A postagem é uma lista de coisas.
- A primeira sentença deve começar com uma das seguintes opções: "Existem 2 tipos de", "1 grande erro a evitar", "Quando você...", "Evite...", "5 dicas rápidas...", "A maioria das empresas...", "Se você não planeja..." (substitua os pontos suspensos por um número).
- Se a postagem copiada no campo contiver números, mantenha-os iguais.
- As próximas sentenças devem ser geradas e não devem conter números.`;

        break;
      case "Opinião impopular":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tenha mais chances de ser curtida e compartilhada do que a postagem original.
Se a pessoa selecionar esta ${vibe}, certifique-se de que a postagem gerada siga estas condições e crie uma opinião impopular sobre o tópico:
- O comprimento da postagem deve ser menor que 200 caracteres.
- A postagem deve conter no máximo 3 sentenças.
- A primeira sentença deve começar com: "Opinião impopular:"
---
Adicione espaço entre cada abstração.`;
        break;
      case "Estudo de caso":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tenha mais chances de ser curtida e compartilhada do que a postagem original.
Se a pessoa selecionar esta ${vibe}, certifique-se de que a postagem gerada siga estas condições e seja completa, rigorosa e relacionada ao post digitado:
- A postagem deve ser relacionada ao que foi inicialmente inserido.
- O comprimento da postagem deve ser de no máximo 1000 caracteres.
- Cada sentença deve ter menos de 200 caracteres.
- A primeira sentença deve começar com algo como: "Dica profissional", "Esses experimentos simples", "Aqui está uma das minhas maiores aprendizados deste ano", "Dentro, ser ... não significa", "No início deste ano", "Isto pode ser o mais quente" (use palavras similares).
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.
- As próximas sentenças devem ser geradas e conter uma lista, lista rigorosa, em que cada ponto da lista começa com um emoji.
---
Forneça ideias para gráficos, imagens ou esquemas que complementem esta postagem de estudo de caso entre parênteses.
---
Adicione espaço entre cada abstração.`;
        break;
      default:
        prompt = `Prompt padrão para otimização de postagem`;
        break;
    }
    return prompt;
  };

  // função para enviar a postagem para o OpenAI e obter a resposta
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Mostrar o popup antes da chamada à API
    handleButtonClick();

    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Esses dados são um ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Gerador de Postagens para LinkedIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta property="og:site_name" content="#1 Gerador de Postagens 🚀" />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta property="og:title" content="Gerador de Postagens para LinkedIn com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Gerador de Postagens para LinkedIn" />
        <meta
          name="linkedin:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta
          property="og:image"
          content="https://postgenerator.app/cover.png"
        />
        <meta
          name="linked:image"
          content="https://postgenerator.app/cover.png"
        />
      </Head>

      <main>
        <Nav />

        <section className="py-10 lg:py-20 ">
          {/* bg-[url('/image1.svg')] */}
          <div className="px-4 ">
            <div className="max-w-5xl mx-auto text-center">
              <div className="w-full mx-auto mb-6 ">
                <a
                  // href="https://vercel.fyi/roomGPT"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-8 transition duration-300 ease-in-out"
                >
                  40.000 postagens incríveis geradas 💫
                  {/* {" "}
                  <span className="text-blue-600">Vercel</span> */}
                </a>
              </div>

              <h1 className="text-6xl text-center font-bold pb-1 text-slate-900  ">
                Gerador de Postagens para LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Veja como sua postagem se sai e gere uma melhor com a IA.
                Hora de se tornar viral. <br />
              </p>

              <div className="flex flex-col md:flex-row w-full md:space-x-20">
                <div className="flex md:w-1/2 flex-col">
                  <div className="flex space-x-1">
                    <CustomButton currentTab={tab} />
                    <style jsx>{`
                      button:hover .tooltip-text {
                        display: block;
                      }
                    `}</style>
                  </div>

                  {/* // Este é o componente de postagem */}

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={2000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Digite ou copie sua postagem ou ideia aqui "
                        className="text-black w-full h-56 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                      />
                    </div>
                  </div>

                  <div className="flex mb-3 items-center space-x-3"></div>
                  <div className="block">
                    <DropDown vibe={vibe} setVibe={setVibe} />
                  </div>

                  <div className="my-4">
                    <button
                      disabled={loading}
                      onClick={(e) => {
                        optimizePost(e);
                        handleButtonClick();
                      }}
                      className="bg-blue-700 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                    >
                      {loading && <LoadingDots color="white" style="large" />}
                      {!loading && `Gerar nova postagem`}
                    </button>

                    <Popup show={showPopup} setShowPopup={setShowPopup} />
                  </div>
                </div>
                <div className="flex md:w-1/2 md:flex-col">
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                  />
                  {optimizedPost && (
                    <div className="my-1">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h2 className="text-xl font-bold">
                          Sua Postagem Gerada
                        </h2>
                      </div>
                      <div className="max-w-2xl my-4 mx-auto">
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          onClick={() => {
                            navigator.clipboard.write([
                              new ClipboardItem({
                                "text/html": new Blob([optimizedPost], {
                                  type: "text/html",
                                }),
                              }),
                            ]);
                            toast("Postagem copiada para a área de transferência", {
                              icon: "📋",
                            });
                          }}
                          key={optimizedPost}
                        >
                          <p
                            className="text-black-700 text-left"
                            dangerouslySetInnerHTML={{
                              __html: optimizedPost,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}

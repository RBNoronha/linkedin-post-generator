import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CustomButton from "@/components/CustomButton"; // ajuste o caminho de importação de acordo com a estrutura de arquivos do seu projeto

import { Ranking } from "@/components/Ranking";
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

  const handleButtonClick = () => {
    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  };

  // const [hasVideo, setHasVideo] = useState<boolean>(false);
  // const [hasCarousel, setHasCarousel] = useState<boolean>(false);

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // Função para gerar o prompt para otimizar a postagem

  // Adicione mais "vibes" conforme necessário
  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Historia":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem maior probabilidade de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém impulsionadores e penalizações com base no que você está escrevendo. Impulsionadores positivos incluem:

- Em cada postagem, adicione emojis.
- Máximo de 200 caracteres em uma frase.
- Comece cada frase em uma nova linha e adicione números nas duas primeiras linhas.
- Adicione 3 hashtags, sendo 2 genéricas e uma muito específica (no final). As hashtags devem estar relacionadas ao tema da postagem.
- Adicione uma pergunta no final da postagem para iniciar uma discussão, antes das hashtags.
- As duas primeiras linhas devem ser cativantes.
- Não adicione links - links não são recomendados.
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.
- Adicione uma ideia sobre que imagem ou visual pode ser adicionado ao final da postagem (este texto não é contado como parte da postagem)
${post}
---
O comprimento da postagem gerada deve ser entre 800 e 1200 caracteres.
---
Deve haver um espaço entre cada linha.
---
Mantenha todas as menções de pessoas na postagem.
---
Comece a primeira linha com algo como: Eu fiz algo, Em 2023, Eu faço, Cansado de, Às vezes é apenas, Um caminho para, Porque isso não é, Eu tenho lutado, (altere o começo dependendo do contexto)
---
Adicione emojis, se possível.
---
A postagem deve contar uma história`;
        break;
      case "Nitida":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem maior probabilidade de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém impulsionadores e penalizações com base no que você está escrevendo. Se a pessoa selecionar essa ${vibe}, certifique-se de que a postagem gerada para ${post} siga essas condições e seja curta, direta e inspiradora:
- O comprimento da postagem não deve exceder 500 caracteres.
- O comprimento de cada frase deve ser inferior a 50 caracteres.
- As primeiras frases devem começar com algo como: Passei 5 meses, Plano de 10 passos, Faturei 10000 em, Em janeiro passado, Em janeiro deste ano, Estava em..., Criei 1000 de..., Como conseguir 1000 seguidores, Como fazer 1000 de..., 10 lições que levei, 15 motivos, 5 dias atrás, 3 etapas surpreendentes, minha estratégia para 2023, nos últimos 10 anos. (altere os números, gere sempre números novos, gere sempre começos novos). As frases seguintes não devem conter números nem essas formulações.
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.
- As frases seguintes devem ser geradas e não devem conter números.
---
Cada frase em uma nova linha
---
Adicione um espaço entre cada parágrafo.
---
Mostre apenas a postagem gerada`;

        break;
      case "Lista":
        prompt = `Gere uma postagem que provavelmente será curtida e compartilhada no LinkedIn, com base em ${post}. Sua postagem deve seguir essas condições:

O comprimento da postagem não deve exceder cem caracteres.
O comprimento de cada frase não deve exceder duas palavras.
A postagem é uma lista de coisas.
A primeira frase deve começar com uma das seguintes opções: Existem 2 tipos de, 1 grande erro a evitar, Quando você..., evite..., 5 dicas rápidas..., A maioria das empresas..., Se você não planeja..., (substitua os pontos de reticências por um número).
Se a postagem copiada no campo contiver números, mantenha-os iguais.
As frases seguintes devem ser geradas e não devem conter números.`;

        break;
      case "Opinião impopular":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem maior probabilidade de ser curtida e compartilhada do que a postagem original.
        O algoritmo do LinkedIn contém impulsionadores e penalizações com base no que você está escrevendo. Se a pessoa selecionar essa ${vibe}, certifique-se de que a postagem gerada siga essas condições e crie uma opinião impopular sobre o tópico:
        - O comprimento da postagem deve ser inferior a 200 caracteres.
        - A postagem deve conter no máximo 3 frases.
        - A primeira frase deve começar com: Opinião impopular:
        ---
        Adicione um espaço entre cada parágrafo.`;
        break;
      case "Estudo de caso":
        prompt = `Gere uma postagem usando este prompt, com base em ${post}. Selecione a opção ${vibe}, certifique-se de que a postagem gerada siga essas condições e seja completa, rigorosa e relacionada ao tópico digitado:
- A postagem deve estar relacionada ao que foi inserido inicialmente.
- O comprimento da postagem não deve exceder 1000 caracteres.
- O comprimento de cada frase deve ser inferior a 200 caracteres.
- A primeira frase da postagem deve começar com algo como: Dica profissional, Esses experimentos simples, Aqui está uma das minhas maiores aprendizados deste ano, Dentro, Ser ... não significa, Mais cedo este ano, Isso pode ser o mais quente (use palavras semelhantes) 
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.
- As frases seguintes devem ser geradas e devem conter uma lista, uma lista rigorosa, e cada item da lista deve começar com um emoji
---
Forneça a ideia para gráficos, imagem ou esquema que vai ilustrar este estudo de caso (coloque dentro de colchetes)
---
Adicione um espaço entre cada parágrafo.`;
        break;
      default:
        prompt = `Prompt padrão para otimizar a postagem`;
        break;
    }
    return prompt;
  };

  // Função para enviar a postagem para a OpenAI e obter a resposta
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Mostrar o popup logo antes da chamada para a API
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

    // Os dados são um ReadableStream
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
        <title>Gerador de Postagens para o LinkedIn</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta
          property="og:site_name"
          content="#1 Gerador de Postagens 🚀"
        />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta
          property="og:title"
          content="Gerador de Postagens para o LinkedIn com IA"
        />
        <meta
          name="linkedin:card"
          content="summary_large_image"
        />
        <meta name="linkedin:title" content="Gerador de Postagens para o LinkedIn" />
        <meta
          name="linkedin:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
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
                Gerador de Postagens para o LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Veja como sua postagem se sai e gere uma melhor com IA.
                É hora de viralizar. <br />
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

                  {/* Este é o componente de postagem */}

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={2000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Digite ou copie sua postagem ou ideia aqui"
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
                      {!loading && `Gerar nova postagem `}
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

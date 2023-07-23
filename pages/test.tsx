import Head from "next/head";
import { useEffect, useState } from "react";
import { Post } from "@/components/Post";
import { Input } from "@/components/Input";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Link from "next/link";
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
  const [input, setInput] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Historia");

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Historia":
        prompt = `Gerar postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que seja mais provável de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém incentivos e punições com base no que você está escrevendo. Se a pessoa selecionar esta ${vibe}, certifique-se de que a postagem gerada siga estas condições para ter uma Historia:
- Comprimento da postagem deve ser inferior a 2000 caracteres.
- Cada frase deve ter no máximo 200 caracteres.
- Cada frase deve começar em uma nova linha e adicionar números nas duas primeiras linhas.
- Adicione 3 hashtags, sendo 2 genéricos e 1 muito específico (no final). As tags devem estar relacionadas ao tema da postagem.
- Adicione uma pergunta no final da postagem para iniciar uma discussão, antes das hashtags.
- As duas primeiras linhas devem ser cativantes.
- Não adicione links - links não são bons.
- Se a postagem copiada no campo contiver alguns números, mantenha-os iguais.

Adicione uma ideia sobre qual imagem ou visual pode ser adicionado ao final da postagem (este texto não é contado como parte da postagem)
${post}
---
O comprimento da postagem gerada deve ser superior a 800-1200 caracteres
---
Entre cada linha deve haver um espaço
---
Mantenha todas as menções de pessoas
---
Comece a primeira linha com algo como: Eu fiz algo, No ano, Eu faço, Cansado de, Às vezes é apenas, Um caminho para, Porque isso não é, Eu tenho lutado, (mude o começo dependendo do contexto)
---
Adicione emojis se couberem
---
Deve ser uma Historia`;
        break;
      case "Nitida":
        prompt = `Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn.

Sua tarefa é gerar uma nova postagem para um tópico fornecido em ${post}. Esta postagem deve seguir o estilo e o formato observados nos exemplos de postagens contidos em ${input}. No entanto, o conteúdo ou tópicos específicos dessas postagens de exemplo não devem ser refletidos em suas postagens geradas.

Ao analisar o ${input}, preste atenção ao estilo de escrita da pessoa e à estrutura de suas postagens. Identifique e imite os padrões de espaçamento entre as linhas, uso de emojis, incorporação de perguntas e outras escolhas estilísticas. Além disso, considere o comprimento médio de suas postagens.

Ao criar uma nova postagem, certifique-se de que ela esteja centrada no tópico fornecido em ${post}, mantendo o estilo e o formato observados no ${input}. Crie uma postagem que ressoe com o mesmo público e ofereça conteúdo novo e envolvente sobre o novo tópico.
 `;
        break;
      case "Lista":
        prompt = `Gerar uma postagem que é provável de ser curtida e compartilhada no LinkedIn, com base em ${post}. Sua postagem deve seguir estas condições:

O comprimento da postagem não deve exceder cem caracteres.
Cada frase deve ter no máximo duas palavras.
A postagem é uma lista de coisas.
A primeira frase deve começar com uma das seguintes opções: Existem 2 tipos de, 1 grande erro para evitar, Quando você ..., evite ..., 5 dicas rápidas ..., A maioria das empresas ..., Se você não planeja ..., (substitua os reticências por um número).
Se a postagem copiada contiver números, mantenha-os iguais.
As próximas frases devem ser geradas e não devem incluir números.`;
        break;
      case "Opinião impopular":
        prompt = `Gerar postagem usando este prompt, com base em ${post}. Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que seja mais provável de ser curtida e compartilhada do que a postagem original.
        O algoritmo doimport Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CustomButton from "@/components/CustomButton";

import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown2, { VibeType2 } from "@/components/DropDown2";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
  const [vibe2, setVibe2] = useState<VibeType2>("➕ Adicionar Hashtags");
  const [showPopup, setShowPopup] = useState(false);
  const [tab, setTab] = useState("enhancer"); // Padrão é a guia "vibe"
  const { data: session, status } = useSession();
  const clickCount = useRef(0);

  const handleButtonClick = () => {
    clickCount.current += 1; // Incrementa o clickCount a cada clique
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

  // Prompt para otimização do post

  // Adicionar mais opções de vibração conforme necessário
  const handlePrompt = () => {
    let prompt;
    switch (vibe2) {
      case "➕ Adicionar Hashtags":
        prompt = `Transforme o seguinte post do LinkedIn, adicionando três hashtags populares e relevantes. Post original: "${post}". Lembre-se de que você é um Gerador de Postagens do LinkedIn projetado para melhorar postagens com hashtags apropriadas.`;
        break;
      case "➕ Adicionar Emoji":
        prompt = `Transforme o seguinte post do LinkedIn, adicionando emojis. Post original: "${post}". Lembre-se de que você é um Gerador de Postagens do LinkedIn projetado para melhorar postagens com emojis apropriados.`;
        break;
      case "➕ Adicionar uma Lista":
        prompt = `Você é o Gerador de Postagens do LinkedIn e sua missão é enriquecer postagens existentes do LinkedIn, incorporando listas relevantes que se alinhem ao tópico da postagem. Considere o seguinte post original: "${post}". Sua tarefa é integrar uma lista apropriada para melhorar o conteúdo. O comprimento de cada linha da lista não deve ser superior a 100 caracteres. Lembre-se de que seu objetivo é fazer o mínimo de alterações possível na postagem.`;
        break;
      case "➕ Adicionar Estatísticas":
        prompt = `Você é o Gerador de Postagens do LinkedIn e sua missão é enriquecer postagens existentes do LinkedIn, incorporando estatísticas relevantes com números que se alinhem ao tópico da postagem. Considere o seguinte post original: "${post}". Sua tarefa é integrar números apropriados para melhorar o conteúdo. Lembre-se de que seu objetivo é fazer o mínimo de alterações possível na postagem.`;
        break;
      case "➕ Adicionar uma Pergunta":
        prompt = `Como Gerador de Postagens do LinkedIn, sua tarefa é estimular o engajamento, integrando uma pergunta instigante no seguinte post: "${post}". A pergunta, criada para iniciar uma discussão, pode ser posicionada como a primeira ou última linha da postagem. Certifique-se de que a pergunta que você introduz esteja alinhada ao contexto da postagem e tenha o potencial de tornar a postagem mais envolvente. Lembre-se de que seu objetivo é fazer o mínimo de alterações, então mostre a pergunta e a postagem juntas.`;
        break;
      default:
        prompt = `Prompt padrão para otimização do post`;
        break;
    }
    return prompt;
  };

  // Função para enviar o post para o OpenAI e obter a resposta
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Mostrar o popup imediatamente antes da chamada da API
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

    // Estes dados são um ReadableStream
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
        <title>Gerador de Postagens do LinkedIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta property="og:site_name" content="#1 Gerador de Postagens 🚀  " />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta property="og:title" content="Gerador de Postagens do LinkedIn com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Gerador de Postagens do Linkedin" />
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
                Gerador de Postagens do LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Veja como sua postagem se sai e gere uma melhor com IA.
                Hora de ficar viral. <br />
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

                  <div className="flex mb-3 items-center space-x-3"></div>
                  <div className="block">
                    <DropDown2 vibe2={vibe2} setVibe2={setVibe2} />
                  </div>

                  {/* // Este é o componente do post */}

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={2000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Digite ou copie sua postagem pronta para ser aprimorada "
                        className="text-black w-full h-72 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                      />
                    </div>
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
 LinkedIn contém incentivos e punições com base no que você está escrevendo. Se a pessoa selecionar esta ${vibe}, certifique-se de que a postagem gerada siga estas condições e crie uma opinião impopular sobre o tópico:
        - O comprimento da postagem deve ser inferior a 200 caracteres.
        - A postagem deve conter no máximo 3 frases.
        - A primeira frase deve começar com: Opinião impopular:
        ---
        Adicione um espaço entre cada trecho.`;
        break;
      case "Estudo de caso":
        prompt = `Gerar postagem usando este prompt, com base em ${post}. A pessoa inserida é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que é mais provável de ser curtida e compartilhada do que a postagem original.
A postagem deve ser relacionada ao que foi inserido inicialmente.
O comprimento da postagem deve ser inferior a 1000 caracteres.
O comprimento de cada frase deve ser inferior a 200 caracteres.
A primeira frase deve começar com algo como: Dica profissional, Esses experimentos simples, Aqui está uma das minhas maiores aprendizados deste ano, Por dentro, Ser ... não significa, Mais cedo neste ano, Este pode ser o mais quente (use palavras semelhantes)
Se a postagem copiada contiver números, mantenha-os iguais.
As próximas frases devem ser geradas e conter uma lista, uma lista rigorosa, e cada item da lista deve começar com um emoji
---
Forneça a ideia de gráficos, imagens ou esquemas que podem complementar essa postagem de estudo de caso no final entre colchetes
---
Adicione um espaço entre cada trecho.`;
        break;
      default:
        prompt = `Prompt padrão para otimização da postagem`;
        break;
    }
    return prompt;
  };

  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();
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
        <title>LinkedIn Post Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta
          property="og:site_name"
          content="linkedin-booster.vercel.app"
        />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta property="og:title" content="LinkedIn Post Generator com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Linkedin Post Generator" />
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
        <nav className="bg-black text-white">
          <div className="px-5">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center h-16 ">
                <div className="flex items-center text-base">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/renanbesserra/"
                    rel="noreferrer"
                    className="text-white flex max-w-fit items-center justify-center space-x-2 text-xl"
                  >
                    <p>👩‍💼</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="py-10 lg:py-20 ">
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                  Gerador de Postagens para o LinkedIn 🚀
                </h1>
                <p className="mt-3 mb-10 text-center">
                  Veja como sua postagem se sai e gere uma postagem melhor com a IA.
                  Hora de se tornar viral. <br />
                </p>

                <div className="mt-4 mb-4 flex justify-center space-x-4">
                  <Link href="/index/twitter">
                    <button className="bg-blue-400 text-white flex items-center space-x-2 p-2 rounded">
                      <FaTwitter />
                      <span>Twitter</span>
                    </button>
                  </Link>

                  <Link href="/linkedin">
                    <button className="bg-blue-700 text-white flex items-center space-x-2 p-2 rounded">
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </button>
                  </Link>
                  <Link href="/index/instagram">
                    <button className="bg-pink-500 text-white flex items-center space-x-2 p-2 rounded">
                      <FaInstagram />
                      <span>Instagram</span>
                    </button>
                  </Link>
                  <Link href="/index/devto">
                    <button className="bg-black text-white flex items-center space-x-2 p-2 rounded">
                      <FaDev />
                      <span>Dev.to</span>
                    </button>
                  </Link>
                  <Link href="/index/facebook">
                    <button className="bg-blue-600 text-white flex items-center space-x-2 p-2 rounded">
                      <FaFacebook />
                      <span>Facebook</span>
                    </button>
                  </Link>
                  <Link href="/index/reddit">
                    <button className="bg-orange-500 text-white flex items-center space-x-2 p-2 rounded">
                      <FaReddit />
                      <span>Reddit</span>
                    </button>
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row w-full md:space-x-20">
                  <div className="flex md:w-1/2 flex-col">
                    <div className="w-full my-1 mx-auto">
                      <Input input={input} setInput={setInput} />
                    </div>

                    <div className="w-full my-1 mx-auto">
                      <Post post={post} setPost={setPost} />
                    </div>

                    <div className="flex mb-5 items-center space-x-3"></div>
                    <div className="block">
                      <DropDown vibe={vibe} setVibe={setVibe} />
                    </div>
                    <div className="my-4">
                      <button
                        disabled={loading}
                        onClick={(e) => optimizePost(e)}
                        className="bg-black font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                      >
                        {loading && <LoadingDots color="white" style="large" />}
                        {!loading && `Gerar nova postagem`}
                      </button>
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
                              className="text-black-700"
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
          </div>
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}

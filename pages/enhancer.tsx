import Head from "next/head";
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
